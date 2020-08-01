import { URLSearchParams } from 'url';
import { post, get, patch } from '../../../lib/http';
import { TimeEntry, TimeEntries } from './types';
import { pDate } from '../../../helpers/date';
import { Thingy } from '../../..';

export const create = async (
  note: string,
  serviceId: string,
  personId: string,
  time: number,
  date: Date
): Promise<TimeEntry> => {
  const params = new URLSearchParams();
  params.append('date', pDate(date));

  const body = {
    data: {
      type: 'time_entries',
      attributes: { note, date, time },
      relationships: {
        person: { data: { type: 'people', id: personId } },
        service: { data: { type: 'services', id: serviceId } }
      }
    }
  };

  const res = await post({ url: '/time_entries', params }, body);
  return res.data;
};

export const list = async (
  personId: string,
  after: Date,
  before = new Date()
): Promise<TimeEntries> => {
  const params = new URLSearchParams();
  params.append('filter[person_id]', personId);
  params.append('filter[after]', pDate(after));
  params.append('filter[before]', pDate(before));
  params.append('sort', 'date');

  const res = await get({ url: '/time_entries', params });
  return res.data as TimeEntries;
};

export const update = async (id: string, data: Thingy) => {
  const res = await patch(`/time_entries/${id}`, data as any);
  return res.data;
};
