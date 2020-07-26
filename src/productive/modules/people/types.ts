export interface IPerson {
  id: string;
  type: 'people';
  attributes: {
    first_name: string;
    last_name: string;
  };
  relationships: any;
}

export interface IPeople {
  data: IPerson[];
  included: any[];
}
