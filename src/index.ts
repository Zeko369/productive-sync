import { config } from 'dotenv';
config();

import * as projects from './modules/projects';
import * as services from './modules/services';

(async () => {
  try {
    const res = await projects.list();
    const serList = await Promise.all(res.data.map((project) => services.list(project.id)));

    console.log(
      serList.map((s, index) => ({
        project: res.data[index].attributes.name,
        name: s.data.map((a) => a.attributes.name)
      }))
    );
  } catch (err) {
    console.log(err);
  }
})();
