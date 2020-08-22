import { promises as fs } from 'fs';
import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(__dirname, '../../.env') });

import api from '../productive';
import { PersonJson } from '../data';

if (process.env.FIRST_NAME === undefined || process.env.LAST_NAME === undefined) {
  console.error('Missing first or last name');
  process.exit(1);
}

(async () => {
  const res = await api.people.list();

  const people = res.data
    .filter((a) => a.attributes.first_name === process.env.FIRST_NAME)
    .filter((a) => a.attributes.last_name === process.env.LAST_NAME);

  if (people.length !== 1) {
    throw new Error('Something went wrong');
  }

  const me = people[0];

  const out: PersonJson = {
    personId: me.id
  };

  await fs.writeFile(join(__dirname, '../../data/person.json'), JSON.stringify(out, null, 2));
})();
