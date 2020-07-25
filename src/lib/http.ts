import a, { AxiosRequestConfig } from 'axios';

const headers = {
  'Content-Type': 'application/vnd.api+json',
  'X-Auth-Token': process.env.TOKEN,
  'X-Organization-Id': process.env.ORG_ID
};

const conf: AxiosRequestConfig = { headers };
type Obj = Record<string, string>;

export const url = (path: string): string => `https://api.productive.io/api/v2${path}`;

export const get = (url: string) => a.get(url, conf);
export const post = (url: string, data: Obj) => a.post(url, data, conf);
export const patch = (url: string, data: Obj) => a.patch(url, data, conf);
export const remove = (url: string) => a.delete(url, conf);
