export interface Header {
  name: string;
  key: string;
}

export type CellType = 'email' | 'phone'

export interface Cell {
  key: string;
  type?: CellType; 
}

export interface TableConfig {
  headers: Header[];
  body: Cell[]
}
