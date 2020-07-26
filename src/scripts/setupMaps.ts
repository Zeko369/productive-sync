import {} from 'fs/promises';
import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(__dirname, '../../.env') });

import api from '../productive';

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

  console.log(
    projects.map((p, index) => [
      p.id,
      p.attributes.name,
      services[index]?.attributes.name,
      services[index]?.id
    ])
  );
})();
