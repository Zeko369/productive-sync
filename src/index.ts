import { config } from 'dotenv';
config();

import api from './productive/api';
import { map, personId } from './data';

(async () => {
  try {
    const note = `<div style="position: absolute; top: 0; left: 0; background-color: red; height: 200px; width: 200px;"></div>`;
    const res = await api.timeEntries.create(note, '', '', 60);
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
    // /* Space */
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
