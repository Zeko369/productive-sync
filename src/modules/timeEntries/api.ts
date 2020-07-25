import { post } from '../../lib/http';
import { URLSearchParams } from 'url';

export const create = async (
  text: string,
  serviceId: string,
  personId: string,
  time: number
): Promise<any> => {
  const params = new URLSearchParams();
  const date = new Date().toISOString().slice(0, 10);

  params.append('date', date);

  const body = {
    data: {
      type: 'time_entries',
      attributes: {
        note: text,
        date,
        time
      },
      relationships: {
        person: {
          data: {
            type: 'people',
            id: personId
          }
        },
        service: {
          data: {
            type: 'services',
            id: serviceId
          }
        }
        // task: {
        //   data: {
        //     type: 'tasks',
        //     id: '110'
        //   }
        // }
      }
    }
  };

  const res = await post({ url: '/time_entries', params }, body);
  return res.data;
};
