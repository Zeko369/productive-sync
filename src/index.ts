import { config } from 'dotenv';
config();

import api from './productive';
import { getEvents } from './gcal/lib';
import { map, personId } from './data';
import template from './template';
import { toBegin, toEnd } from './helpers/date';
import { MIN_DATE } from './config';
import { TimeEntries, TimeEntry } from './productive/modules/timeEntries';

const findTe = (timeEntries: TimeEntries, id: string) => {
  return timeEntries.data.find((te) => {
    const res = te.attributes.note.match(/#[a-z0-9A-Z]*#/);
    if (res) {
      const noteId = res[0].slice(1, -1);
      return noteId === id;
    }
  });
};

const compareEntry = (entry: TimeEntry, data: { minutes: number; time: string }) => {
  console.log(entry.attributes.note);
  if (entry.attributes.time !== data.minutes) {
    return false;
  }

  // TODO: Compare note

  return true;
};

const days = [24, 25, 26, 27, 28, 29];

const genTime = (startTime?: string | null, endTime?: string | null) => {
  const start = new Date(startTime || Date.now());
  const end = new Date(endTime || Date.now());
  const minutes = (end.getTime() - start.getTime()) / 1000 / 60;
  const time = `${start.toTimeString().slice(0, 5)} - ${end.toTimeString().slice(0, 5)}`;

  return { minutes, time, start, end };
};

(async () => {
  try {
    if (!process.env.GCAL_ID) throw new Error('GCAL_ID missing');
    const now = Date.now();

    for (let dayId of days) {
      const day = new Date(2020, 6, dayId + 1);

      if (day < MIN_DATE) {
        throw new Error('Could break, old date');
      }

      const timeEntries = await api.timeEntries.list(personId, toBegin(day), toEnd(day));
      const events = await getEvents(process.env.GCAL_ID, day);

      if (!events) throw new Error('Error loading events');

      for (let event of events) {
        const { id, summary, start: startTime, end: endTime } = event;
        if (!id || !summary) throw new Error('ID missing');

        const { time, minutes, start } = genTime(startTime?.dateTime, endTime?.dateTime);

        if (start.getTime() > Date.now()) {
          console.log("Hasn't happened yet");
          continue;
        }

        if (summary.startsWith('$')) {
          console.log('Skip event');
          continue;
        }

        const titles = summary.split(':');
        if (titles.length < 2) throw new Error(`Cant find slug ${summary}`);
        const slug = titles[0].trim();
        const title = titles.slice(1).join(':');

        const project = map.get(slug);
        if (!project) throw new Error('Cant find project with that slug');

        const note = template({ title, time, id });

        const currentEntry = findTe(timeEntries, id || '');
        if (currentEntry) {
          console.log('Found entry');

          if (!compareEntry(currentEntry, { minutes, time })) {
            console.error('Update entry');
          }

          continue;
        }

        await api.timeEntries.create(note, project.sid, personId, minutes, day);
        console.log(note, project.sid, personId, minutes, day);
      }
    }
  } catch (err) {
    console.log(err);
  }
})();
