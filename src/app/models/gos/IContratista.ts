export interface IContratista {
  id_contratista: number;
  contratista: string;
  identificacion: string;
  zonas: string[] | string;
  asignadas: number;
  id_contratista_persona?: number;
  descripcion?: string;
}

export interface IGestor extends IContratista {
  id_contratista_persona?: number;
  descripcion?: string;
  codigo_rol?: string;
}
