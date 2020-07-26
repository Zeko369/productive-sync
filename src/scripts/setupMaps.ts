import { promises as fs } from 'fs';
import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(__dirname, '../../.env') });

import api from '../productive';
import { MapItem } from '../data';

const projectIds = process.env.PROJECT_IDS?.split('|') || [];
const projectSlugs = process.env.PROJECT_SLUGS?.split('|') || [];

if (projectIds.length === 0 || projectSlugs.length !== projectIds.length) {
  console.error('Missing projectIds or slugs || mismatch in length');
  process.exit(1);
}

(async () => {
  const allProjects = await api.projects.list();
  const projects = allProjects.data.filter((project) => projectIds.includes(project.id));

  const services = (
    await Promise.all(projects.map((project) => api.services.list(project.id)))
  ).map((services) => (services.data.length > 0 ? services.data[0] : null));

  const tmp = projects.map((p, index) => ({
    slug: projectSlugs[index],
    pid: p.id,
    pname: p.attributes.name,
    sid: services[index]?.id || '',
    sname: services[index]?.attributes.name || ''
  }));

  const out = tmp.reduce((prev, curr) => {
    const tmp = { ...curr, slug: undefined };
    prev[curr.slug] = tmp;
    return prev;
  }, {} as Record<string, MapItem>);

  await fs.writeFile(join(__dirname, '../data/map.json'), JSON.stringify(out, null, 2));
})();
