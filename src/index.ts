import { config } from 'dotenv';
config();

import * as projects from './modules/projects';

(async () => {
  try {
    const res = await projects.list();
    console.log(res.data.map((project) => ({ id: project.id, name: project.attributes.name })));
  } catch (err) {
    console.log(err);
  }
})();
