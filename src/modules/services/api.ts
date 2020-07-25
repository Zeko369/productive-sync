import { get } from '../../lib/http';
import { URLSearchParams } from 'url';

interface IService {
  id: number;
  type: 'service';
  attributes: {
    name: string;
  };
}

interface IServices {
  data: IService[];
}

export const list = async (projectId: string): Promise<IServices> => {
  const params = new URLSearchParams();
  params.append('filter[project_id]', projectId);

  const res = await get({ url: '/services', params });
  return res.data as IServices;
};
