import { google } from 'googleapis';
import { toBegin, toEnd } from '../helpers/date';

const listEvents = async (auth: any, cid: string, date = new Date()) => {
  const calendar = google.calendar({ version: 'v3', auth });

  const res = await calendar.events.list({
    calendarId: cid,
    timeMin: toBegin(date).toISOString(),
    timeMax: toEnd(date).toISOString(),
    maxResults: 100,
    singleEvents: true,
    orderBy: 'startTime'
  });

  const events = res.data.items;

  return events;
};

export default listEvents;
