export interface IOrder {
    tecnico: string;
    id_orden : number;
    id_tipo_orden : number;
    tipo_orden : string;
    numero_orden : string;
    id_estado_orden : number;
    estado_orden : string;
    id_contratista : number;
    contratista : string;
    id_cliente : number;
    cliente : string;
    id_territorial : number;
    territorial : string;
    id_zona : number;
    zona : string;
    direcion : string;
    fecha_creacion : string;
    fecha_cierre : Date;
    id_usuario_cierre : string;
    usuario_cierre : string;
    id_actividad?: number;
    actividad?: string;
    id_contratista_persona?: number;
    nombre_contratista_persona?: string;
    id_tipo_trabajo?: number;
    tipo_trabajo?: string;
    id_tipo_suspencion?: number;
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
    