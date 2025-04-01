import { TypeSort } from '../../common/enums/general/TypeSort';

export interface IDataPagination<T, U = any> {
  data?: T[];
  dataSelected?: T[];
  filters?: U;
  pagination?: IPagination;
  totalRecords?: number;
}
export interface IPagination {
  first: number;
  rows: number;
  sortField?: string | null;
  sortOrder?: TypeSort | null;
  filters?: IFilters | null;
  globalFilter?: string[] | null;
}

export interface IFilter {
  value: string;
  matchMode: string;
  operator: string;
}

export interface IFilters {
  nameField: IFilter[];
}

export interface IBotonera {
  action: (data: any) => void;
}

export interface IAcciones {
  icon: string;
  action: string;
  botonera: IBotonera;
}
