export interface TimeEntry {
  id: string;
  type: 'time_entries';
  attributes: {
    date: string;
    time: number;
    note: string;
  };
  relationships: any;
}

export interface TimeEntries {
  data: TimeEntry[];
}
