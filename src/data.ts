const mapJson = require('../data/map');
export interface MapItem {
  pid: string;
  pname: string;
  sid: string;
  sname: string;
}
export const map: Map<string, MapItem> = new Map();

type Entry = [string, MapItem];

Object.entries(mapJson)
  .map((a) => a as Entry)
  .forEach(([slug, data]) => map.set(slug, data));

export interface PersonJson {
  personId: string;
}

const personJson = require('../data/person.json') as PersonJson;
export const personId = personJson.personId;
