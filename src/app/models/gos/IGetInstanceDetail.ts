export interface IGetInstanceDetail<T> {
  filtros?: T;
  pagina?: number;
  registros?: number;
  format?: string;
  serverSide?: string;
  id_archivo_instancia?: number;
}
