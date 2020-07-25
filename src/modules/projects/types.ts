export interface IProject {
  id: string;
  type: 'projects';
  attributes: {
    name: string;
    number: number;
  };
  relationships: {
    organization: {
      data: {
        type: 'organizations';
        id: number;
      };
    };
    company: {
      data: {
        type: 'companies';
        id: string;
      };
    };
    project_manager: {
      data: {
        type: 'people';
        id: string;
      };
    };
    last_actor: {
      data: any;
    };
  };
}

export interface IProjects {
  data: IProject[];
  included: any[];
  links: {
    first: string;
    last: string;
  };
  meta: {
    current_page: number;
    total_pages: number;
    total_count: number;
    page_size: number;
    max_page_size: number;
  };
}
