export interface IMasivoCargueFinanciero{
  ind_actividad?: string,
  fileBase64?: string;
}

export interface IMasivoCargueFinancieroPending {
  antiguedad: string;
  fecha_registro: string;
  origen: string;
  id_orden: number;
  numero_orden: number;
  nic: number;
  tarifa: string;
  codigo_tipo_orden: string;
  tipo_orden: string;
  deuda: string;
  ultima_factura: string;
  id_contratista_persona: string;
  nombre_contratista_persona: string;
  contratista: string;
  territorial: string;
  zona: string;
  departamento: string;
  municipio: string;
  barrio: string;
  direcion: string;
  estado_orden: string;
  fecha_asigna_tecnico: string;
  tipo_brigada: string;
  tipo_suspencion: string;
  comanterio_OS: string;
  fecha_Consulta: string;
}

 export interface IArchivosMasivoCargueFinanciero {
  id_archivo_instancia: number;
  id_archivo: number;
  numero_registros_archivo: number;
  numero_registros_procesados: number;
  numero_errores: number;
  fecha_inicio_cargue: string;
  fecha_fin_cargue: string;
  duracion: string;
  id_usuario_registro: number;
  nombre_usuario_registro: string;
  fecha_registro: string;
  id_estado_intancia: number;
  observaciones: string;
  nombre_archivo: string;
  pathwebdescarga: string;
  id_soporte: number;
}

export interface IArchivosMasivoCargueFinanciero {
  id_soporte: number;
  id_soporte_tipo: number;
  id_actividad: number;
  nombre:  string;
  url: string;
  fecha_registra: string
}

export interface IErroresCargueFinanciero {
  codigo: string
  proceso: string
  registro: string
  validacion: string
  codigo_tipo: string
  id_soporte: number
}
