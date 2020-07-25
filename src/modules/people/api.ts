import { get } from '../../lib/http';
import { IPeople } from './types';

export const list = async (): Promise<IPeople> => {
  const res = await get('/people?page[size]=10000');
  return res.data as IPeople;
};
