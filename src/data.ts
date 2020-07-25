const mapJson = require('./data/map');
export const map: Record<string, { name: string; id: string }> = mapJson;

interface PersonJson {
  personId: string;
}

const personJson = require('./data/person.json') as PersonJson;
export const personId = personJson.personId;
