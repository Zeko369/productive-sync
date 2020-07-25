import { config } from 'dotenv';
config();

import http from './http';

const url = (path: string): string => `https://api.productive.io/api/v2${path}`;

(async () => {
  try {
    const res = await http.get(url('/time_entries'));
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
})();
