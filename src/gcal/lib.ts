import listEvents from './listEvents';
import { authenticatedWrapper } from './gcal';

export const getEvents = (cid: string, date?: Date) => {
  return authenticatedWrapper((auth) => listEvents(auth, cid, date))();
};
