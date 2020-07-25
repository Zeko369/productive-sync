import a, { AxiosRequestConfig } from 'axios';
import { URLSearchParams } from 'url';

const headers = {
  'Content-Type': 'application/vnd.api+json',
  'X-Auth-Token': process.env.TOKEN,
  'X-Organization-Id': process.env.ORG_ID
};

const conf: AxiosRequestConfig = { headers };
type Obj = Record<string, unknown>;

type Url = { url: string; params?: URLSearchParams } | string;

export const urlHelper = (args: Url): string => {
  if (typeof args !== 'string') {
    const { url, params } = args;

    return `https://api.productive.io/api/v2${url}${params ? `?${params}` : ''}`;
  }

  return `https://api.productive.io/api/v2${args}`;
};

export const get = (url: Url) => a.get(urlHelper(url), conf);
export const post = (url: Url, data?: Obj) => a.post(urlHelper(url), data, conf);
export const patch = (url: Url, data?: Obj) => a.patch(urlHelper(url), data, conf);
export const remove = (url: Url) => a.delete(urlHelper(url), conf);
