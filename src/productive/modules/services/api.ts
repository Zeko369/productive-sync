import { URLSearchParams } from 'url';
import { get } from '../../../lib/http';
import { IServices } from './types';

export const list = async (projectId: string): Promise<IServices> => {
  const params = new URLSearchParams();
  params.append('filter[project_id]', projectId);

  const res = await get({ url: '/services', params });
  return res.data as IServices;
};
