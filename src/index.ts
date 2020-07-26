import { config } from 'dotenv';
config();

import api from './productive';
import { getEvents } from './gcal/lib';
import { map, personId } from './data';
import template from './template';
import { stat } from 'fs';

(async () => {
  try {
    if (!process.env.GCAL_ID) throw new Error('GCAL_ID missing');

    const events = await getEvents(process.env.GCAL_ID);

    const promises = (events || []).map((event) => {
      const { id, summary, start: startTime, end: endTime } = event;

      if (!id || !summary) throw new Error('ID missing');

      const start = new Date(startTime?.dateTime || '');
      const end = new Date(endTime?.dateTime || '');
      const minutes = (end.getTime() - start.getTime()) / 1000 / 60;

      const titles = summary.split(':');
      if (titles.length < 2) throw new Error('Cant find slug');
      const slug = titles[0].trim();
      const title = titles.slice(1).join(':');
      const time = `${start.toTimeString().slice(0, 5)} - ${end.toTimeString().slice(0, 5)}`;

      const project = map.get(slug);
      if (!project) throw new Error('Cant find project with that slug');

      const note = template({ title, time, id });

      return api.timeEntries.create(note, project.sid, personId, minutes);
    });

    await Promise.all(promises);
  } catch (err) {
    console.log(err);
  }
})();
