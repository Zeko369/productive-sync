import a, { AxiosRequestConfig } from 'axios';

const headers = {
  'Content-Type': 'application/vnd.api+json',
  'X-Auth-Token': process.env.TOKEN,
  'X-Organization-Id': process.env.ORG_ID
};

const conf: AxiosRequestConfig = { headers };
type Obj = Record<string, string>;

const http = {
  get: (url: string) => a.get(url, conf),
  post: (url: string, data: Obj) => a.post(url, data, conf),
  patch: (url: string, data: Obj) => a.patch(url, data, conf),
  delete: (url: string) => a.delete(url, conf)
};

export default http;
