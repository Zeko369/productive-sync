export interface IService {
  id: number;
  type: 'service';
  attributes: {
    name: string;
  };
}

export interface IServices {
  data: IService[];
}
