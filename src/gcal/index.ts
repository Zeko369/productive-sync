import { join } from 'path';
import { config } from 'dotenv';
import { getEvents } from './lib';

config({ path: join(__dirname, '../../.env') });

getEvents(process.env.GCAL_ID || '').then((data) => {
  if (data) {
    data.forEach((event) => {
      console.log(event.summary);
    });
  }
});
