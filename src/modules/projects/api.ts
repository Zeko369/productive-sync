import { get, url } from '../../lib/http';
import { IProjects } from './types';

export const list = async (): Promise<IProjects> => {
  try {
    const res = await get(url('/projects'));
    return res.data as IProjects;
  } catch (err) {
    throw new Error(err);
  }
};
