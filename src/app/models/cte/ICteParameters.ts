export interface ICteInitialParameter {
    estados_orden: ICteEstadoOrden[];
    estados_inspeccion: ICteEstadoInspeccion[];   
    suministros_alarma: ICteSuministrosAlarma[];    
    brigadas: ICteBrigada[];
    contratistas: ICteContratista[];
    localidad: ICteLocalidad[];
    municipio: ICteMunicipio[];
    tipos_procesos: ICteTipoProceso[];
    tipos_trabajo: ICteTipoTrabajo[];
    tipos_medida:ICteTipoMedida[];
    tipos_orden: ICteTipoOrden[];
    tipos_inspeccion: ICteTipoInspeccion[];
    url_plantilla_Asignacion_Contratista: string;
    url_plantilla_Asignacion_Tecnico: string;
    url_plantilla_DesAsignacion_Contratista: string;
    url_plantilla_DesAsignacion_Tecnico: string;
    url_plantilla_Masivo_Inspecciones: string;
}

export interface ICteEstadoOrden {
    id_orden_estado: number;
    codigo: string;
    descripcion: string;
}

export interface ICteTipoMedida {
    id_medida_tipo: number;
    codigo: string;
    descripcion: string;
    id_medida: number;
}

export interface ICteTipoOrden {
    id_orden_tipo: number;
    codigo: string;
    descripcion: string;
    id_medidas: number[];
}

export interface ICteSuministrosAlarma {
    id_suministro_alarma: number;
    descripcion: string;
}

export interface ICteTipoProceso {
    id_proceso_tipo: number;
    codigo: string;
    descripcion: string;
}

export interface ICteBrigada {
    id_contratista_persona: number;
    identificacion_contratista_persona: string;
    nombre_contratista_persona: string;
    id_contratista: number;
}

export interface ICteContratista {
    id_contratista: number;
    id_persona: number;
    identificacion: string;
    nombre_completo: string;
    brigadas: ICteBrigada[]
}

export interface ICteTipoTrabajo {
    id_trabajo_tipo: number;
    codigo: string;
    id_orden_tipo: number;
    descripcion: string;
}

export interface ICteLocalidad {
    id_localidad: number;
    codigo: number;
    id_zona: number;
    nombre: string;
}

export interface ICteMunicipio {
    id_municipio: number;
    id_departamento: number;
    codigo_dane: string;
    nombre: string;
}

export interface ICteEstadoInspeccion {
    codigo: string;
    descripcion: string;
    id_inspeccion_estado: number;
}

export interface ICteTipoInspeccion {
    id_inspeccion_tipo: number;
    nombre_inspeccion_tipo: string;
}