export interface IService {
  id: string;
  type: 'service';
  attributes: {
    name: string;
  };
}

export interface IServices {
  data: IService[];
}
