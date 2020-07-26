import listEvents from './listEvents';
import { authenticatedWrapper } from './gcal';

export const getEvents = (cid: string) => {
  return authenticatedWrapper((auth) => listEvents(auth, cid))();
};
