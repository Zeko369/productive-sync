import { config } from 'dotenv';
config();

import api from './productive';
import { getEvents } from './gcal/lib';
import { map, personId } from './data';
import template from './template';
import { toBegin, toEnd, pDateTime } from './helpers/date';
import { MIN_DATE } from './config';
import { TimeEntries, TimeEntry } from './productive/modules/timeEntries';

const findTe = (timeEntries: TimeEntries, id: string) => {
  return timeEntries.data.find((te) => {
    const res = te.attributes.note.match(/#[a-z0-9A-Z_]*#/);
    if (res) {
      const noteId = res[0].slice(1, -1);
      return noteId === id;
    }
  });
};

const dryRun = Boolean(process.env.DRY) || false;

export interface Thingy {
  type: 'time_entires';
  attributes: {
    note?: string;
    date?: string;
    time?: number;
  };
  relationships: {
    service?: { data: { type: 'services'; id: string } };
  };
}

interface Diff {
  time?: boolean;
  note?: boolean;
  timestamp?: boolean;
  // date?: boolean TODO: IMPLEMENT THIS
  sid?: boolean;
}

interface Data {
  minutes: number;
  time: string;
  text: string;
  sid: string;
}

const compareEntry = (entry: TimeEntry, data: Data): Diff => {
  const diff: Diff = {};

  if (entry.attributes.time !== data.minutes) {
    diff.time = true;
  }

  let splits = [];

  if (entry.attributes.note.includes('<br />')) {
    splits = entry.attributes.note.split('<br />');
  } else {
    splits = entry.attributes.note.split('<br>');
  }

  if (splits.length !== 3) {
    console.log(splits);
    throw new Error('Error parsing note');
  }

  let [time, text] = splits;
  if (!time.includes(data.time)) {
    diff.timestamp = true;
  }

  if (text.trim() !== data.text.trim()) {
    diff.note = true;
  }

  if (data.sid !== entry.relationships.service.data.id) {
    diff.sid = true;
  }

  return diff;
};

const days: Date[] = [];

if (false) {
  for (let i = 20; i < 28; i++) {
    days.push(new Date(2020, 7, i));
  }
} else {
  let date = new Date(MIN_DATE);
  date = new Date(2020, 7, 28);
  const now = Date.now();

  while (date.getTime() < now) {
    date.setTime(date.getTime() + 1000 * 60 * 60 * 24); // +1 day
    days.push(new Date(date));
  }
}

const genTime = (startTime?: string | null, endTime?: string | null) => {
  const start = new Date(startTime || Date.now());
  const end = new Date(endTime || Date.now());
  const minutes = (end.getTime() - start.getTime()) / 1000 / 60;
  const time = `${start.toTimeString().slice(0, 5)} - ${end.toTimeString().slice(0, 5)}`;

  return { minutes, time, start, end };
};

(async () => {
  try {
    if (dryRun) {
      console.log('Starting in dryrun mode');
    }

    if (!process.env.GCAL_ID) throw new Error('GCAL_ID missing');

    for (const day of days) {
      if (day < MIN_DATE) {
        throw new Error('Could break, old date');
      }

      console.log(`Day: ${day.toLocaleString()}`);

      const timeEntries = await api.timeEntries.list(personId, toBegin(day), toEnd(day));
      const events = await getEvents(process.env.GCAL_ID, day);

      if (!events) throw new Error('Error loading events');

      for (let event of events) {
        const { id, summary, start: startTime, end: endTime } = event;
        if (!id || !summary) throw new Error('ID missing');

        const { time, minutes, start, end } = genTime(startTime?.dateTime, endTime?.dateTime);

        if (start.getTime() > Date.now()) {
          console.log("Hasn't starter yet", pDateTime(start));
          continue;
        }

        if (end.getTime() > Date.now()) {
          console.log("Hasn't ended yet", pDateTime(start));
          continue;
        }

        if (start.getDate() !== end.getDate() && start.getDate() !== day.getDate()) {
          console.log('Multi day event (not on beginning day)', summary);
          continue;
        }

        if (['$', '!'].includes(summary.trimLeft()[0])) {
          console.log('Skip event');
          continue;
        }

        const titles = summary.split(':');
        if (titles.length < 2) throw new Error(`Cant find slug [${summary}]`);
        const slug = titles[0].trim();
        const title = titles.slice(1).join(':');

        const project = map.get(slug);
        if (!project) throw new Error(`Cant find project with that slug [${slug}]`);

        const note = template({ title, time, id });

        const currentEntry = findTe(timeEntries, id || '');
        if (currentEntry) {
          const diff = compareEntry(currentEntry, { minutes, time, text: title, sid: project.sid });

          if (Object.keys(diff).length > 0) {
            const data: Thingy = {
              type: 'time_entires',
              attributes: {},
              relationships: {}
            };

            if (diff.note || diff.timestamp) {
              data.attributes.note = note;
            }

            if (diff.time) {
              data.attributes.time = minutes;
            }

            if (diff.sid) {
              data.relationships.service = { data: { type: 'services', id: project.sid } };
            }

            console.log(diff);

            // const res = await api.timeEntries.update(currentEntry.id, data);
            // console.log(res);
          }

          continue;
        }

        if (!dryRun) {
          await api.timeEntries.create(note, project.sid, personId, minutes, day);
        }
        console.log('TE:CREATE', note, project.sid, personId, minutes, day);
      }
    }
  } catch (err) {
    console.log(err);
  }
})().finally(() => console.log('done'));
