import { TypeResponse } from "../../common/enums/general/TypeResponse";

export interface IResponseApi {
  data?: any;
  mensaje: string;
  error_interno: string;
  status: TypeResponse;
  meta?: null;
  totalRecords?: number;
}

export interface IListResponse {
  numero_orden: number;
  mensaje: string;
}