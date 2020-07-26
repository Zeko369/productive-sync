import { google } from 'googleapis';

const listEvents = async (auth: any, cid: string, date?: Date) => {
  const calendar = google.calendar({ version: 'v3', auth });

  const dateMin = date || new Date();
  dateMin.setUTCHours(0, 0, 0, 0);
  const timeMin = dateMin.toISOString();
  const dateMax = date || new Date();
  dateMax.setUTCHours(23, 59, 60, 0);
  const timeMax = dateMax.toISOString();

  const res = await calendar.events.list({
    calendarId: cid,
    timeMin,
    timeMax,
    maxResults: 100,
    singleEvents: true,
    orderBy: 'startTime'
  });

  const events = res.data.items;

  return events;
};

export default listEvents;
