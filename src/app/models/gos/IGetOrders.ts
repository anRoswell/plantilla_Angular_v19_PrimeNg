export interface IGetOrders<T> {
  filtros?: T;
  pagina?: number;
  registros?: number;
  format?: string;
  serverSide?: string;
}
