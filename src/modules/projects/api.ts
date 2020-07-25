import { get } from '../../lib/http';
import { IProjects } from './types';

export const list = async (): Promise<IProjects> => {
  const res = await get('/projects');
  return res.data as IProjects;
};
