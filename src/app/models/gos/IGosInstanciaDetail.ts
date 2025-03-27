import { TypeState } from 'src/app/common/enums/general/TypeState';

export interface IGosInstanciaDetail {
  id_archivo_instancia_detalle: number;
  id_archivo_instancia: number;
  numero_fila: number;
  estado: TypeState.ERROR;
  observaciones: string;
}
