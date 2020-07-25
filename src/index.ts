import { config } from 'dotenv';
config();

import * as projects from './modules/projects';
import * as services from './modules/services';
import * as people from './modules/people';
import * as timeEntries from './modules/timeEntries';

// import { data, map } from './data';

(async () => {
  try {
    // const note = `<div><h1>Title</h1><ul><li>Hello</li><li>World</li></ul></div>`;
    // const res = await timeEntries.create(note, data.pledgeMangerService, data.personId, 60);
    /* Get ids for map*/
    // const res = await projects.list();
    // const proj = res.data.map((p) => ({ id: p.id, name: p.attributes.name }));
    // for (let p of proj) {
    //   const { id, name } = p;
    //   if (
    //     Object.values(map)
    //       .map((a) => a.name)
    //       .includes(name)
    //   ) {
    //     console.log(id, name);
    //   }
    // }
    /* */
    // const serList = await Promise.all(res.data.map((project) => services.list(project.id)));
    // console.log(
    //   serList
    //     .map((s, index) => ({
    //       id: s.data[0]?.id,
    //       project: res.data[index].attributes.name,
    //       projectId: res.data[index].id,
    //       name: s.data[0]?.attributes.name
    //     }))
    //     .filter((d) => Boolean(d.id))
    // );
    // const res = await people.list();
    // console.log(
    //   res.data
    //     .filter((a) => a.attributes.first_name === 'Fran')
    //     .filter((a) => a.attributes.last_name === 'Zekan')
    //     .map((a) => ({ id: a.id, name: `${a.attributes.first_name} ${a.attributes.last_name}` }))
    // );
  } catch (err) {
    console.log(err);
  }
})();
