export interface IFormGetClient {
  nic: string;
  nis: string;
}

export interface IFormGenerateOrder {
  tipo_orden: IEstadosOrden;
  tipo_suspencion: ITiposSuspencion;
  estado_servicio: IEstadosServicio;
}

export interface ICliente {
  id_territorial: number;
  id_zona: number;
  id_departamento: number;
  id_municipio: number;
  nic: string;
  nis: string;
  nombre_cliente: string;
  cantidad_facturas: string;
  circuito: string;
  codigo_utl_susp: string;
  deuda: string;
  direccion: string;
  estado_servicio: string;
  id_cliente: string;
  nombre_barrio: string;
  nombre_departamento: string;
  nombre_finca: string;
  nombre_municipio: string;
  nombre_territorial: string;
  nombre_zona: string;
  tarifa: string;
  telefono_cliente: string;
  tipo_cliente: string;
  tipo_conexion: string;
  tipo_servicio: string;
  tipo_tension: string;
  trafo: string;
  unicon: string;
}

export interface IGetClienteByNisNicResponse {
  status: number;
  mensaje: string;
  data: { clientes: ICliente[] };
  meta: null;
  totalRecords: number;
}

interface formdataIOrderRequest extends Partial<IOrder> {
  num_camp?: string,
  comentario1?: string,
  comentario2?: string,
}

export interface IOrderRequest {
  formdata?: formdataIOrderRequest;
  fileBase64?: string;
  ind_areacentral?: string;
}

export interface ITipoOrden {
  id_tipo_orden: number;
  descripcion: string;
  codigo_tipo_orden: string;
}

export interface IEstadosOrden {
  id_estado_orden?: number;
  descripcion?: string;
  codigo_estado?: string;
}

export interface IContratistas {
  id_contratista?: number;
  id_persona?: number;
  identificacion?: string;
  nombre_completo?: string;
  email?: string;
  ind_activo?: string;
  descripcion_ind_activo?: string;
  zonas?: number[];
}

export interface ITerritoriales {
  id_territorial: number;
  id_departamento: number;
  codigo: number;
  nombre: string;
}
export interface IZonas {
  id_zona?: number;
  id_territorial?: number;
  codigo?: number;
  nombre?: string;
}

export interface ITiposSuspencion {
  id_tipo_suspencion: number;
  codigo_suspencion?: string;
  descripcion?: string;
  id_actividad?: number;
}

export interface IEstadosServicio {
  id_estado_servicio: number;
  codigo: string;
  descripcion: string;
}

export interface IInitialParamt {
  tipos_orden: ITipoOrden[];
  estados_orden: IEstadosOrden[];
  contratistas: IContratistas[];
  territoriales: ITerritoriales[];
  zonas: IZonas[];
  tipos_suspencion: ITiposSuspencion[];
  estados_servicio: IEstadosServicio[];
  url_plantilla_Generacion_Ordenes: string;
  url_plantilla_Legalizacion_Orden: string;
  url_plantilla_Asignacion_Tecnico: string;
  url_plantilla_DesAsignacion_Tecnico: string;
  url_plantilla_Reasignacion_Contratista: string;
  url_plantilla_Reasignacion_Contratista2: string;
}

export interface IOrder {
  nic: number;
  nis: number;
  id_tipo_orden: number;
  id_tipo_suspencion: number;
  id_estado_servicio: number;
  tecnico: string;
  id_orden: number;
  tipo_orden: string;
  numero_orden: string;
  id_estado_orden: number;
  estado_orden: string;
  id_contratista: number;
  contratista: string;
  id_cliente: number;
  cliente: string;
  id_territorial: number;
  territorial: string;
  id_zona: number;
  zona: string;
  direcion: string;
  fecha_creacion: string;
  fecha_cierre: Date;
  id_usuario_cierre: string;
  usuario_cierre: string;
  id_actividad?: number;
  actividad?: string;
  id_contratista_persona?: number;
  nombre_contratista_persona?: string;
  id_tipo_trabajo?: number;
  tipo_trabajo?: string;
  tipo_suspencion?: string;
  georeferencia_cliente: IGeorreferencia;
  fecha_ejecucion?: string;
  id_anomalia?: number;
  descripcion_anomalia?: string;
  origen?: string;
  georeferencia_ejecucion: IGeorreferencia;
}

export interface IGeorreferencia {
  longitud: number;
  latitud: number;
}

export interface IArchivosInstancia {
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

export interface IArchivosInstanciaDetalle {
  id_archivo_instancia_detalle: number;
  id_archivo_instancia: number;
  numero_fila: number;
  estado: string;
  observaciones: string;
}

export interface IBrigadas {
  id_contratista_persona?: number;
  identificacion_contratista_persona?: string;
  nombre_contratista_persona?: string;
  codigo_tipo_brigada?: string;
  id_contratista_brigada?: number;
  id_contratista_vehiculo?: number; 
  id_tipo_brigada?: number;
  placa?: string;
  tipo_brigada?: string;
  zonas_brigada?: string;
}

export interface ITrazabilidadOrdenes {
  fecha: string;
  icono_Esado: string;
  id: number;
  id_contratista: number;
  id_contratista_persona?: number;
  id_estado_orden: number;
  nombre_contratista: string;
  nombre_contratista_persona?: string;
  nombre_estado_orden: string;
  observacion: string;
}

export interface IExportarExcel {
  id_Soporte: number;
  nombreArchivo: string;
  extension: string;
  typeMime: string;
  size: number;
  archivoBase64: string;
}

export interface IOrderPending {
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
  urlDescargaActa: string;
}

export interface IOrderExecuted {
  acta: string;
  barrio: string;
  ciudad: string;
  deuda_act: string;
  deuda_ejec: string;
  direccion: string;
  fecha_Sincronizacion: string;
  fechaejecucion: string;
  fechafinal: string;
  fechainicial: string;
  hora_Sincronizacion: string;
  id_orden: string;
  nic: string;
  nombre_contratista_persona: string;
  num_factura: string;
  numero_orden: string;
  subaccion: string;
  tarifa: string;
  territorial: string;
  tipo_actividad: string;
  tipo_orden: string;
  tipo_proceso: string;
  urlDescargaActa: string;
  zona: string;
}

export interface IOrderLogLegalization {
  id_orden: string;
  numero_orden: string;
  error: string;
  fecha_movimiento: string;
  urlDescargaActa: string;
}