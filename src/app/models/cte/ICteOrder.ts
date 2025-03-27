export interface ICteOrderPending {
    id_orden: number,
    fecha: string;
    orden: number;
    nic: number;
    tipo: string;
    deuda: string;
    aliado: string;
    tecnico: string;
    dpto: string;
    municipio: string;
    localidad: string;
    via: string;
    calle: string;
    duplicador: string;
    puerta: string;
    estado_Servicio: string;
    fecha_Programacion: string;
    estado: string;
    acta: string
}

export interface ICteOrderRequest{     
    fileBase64?: string;
    ind_areacentral?: string;
    guardarArchivo: string;
    cargueDataTemporal: string;
    procesamiento: string;
    tiempoTotal: string;
    id_soporte: number;
}

export interface ICteOrderAuditWindow{
    id_orden: number;  
    numero: number;
    codigo_orden_tipo: string;
    numero_orden: string;
    nic: number;
    descripcion_trabajo_tipo: string;
    fecha_ejecucion: string;
}

export interface ICteOrderAdminOsfAbnormal{   
    id_orden: number;  
    numero: number;
    contratista: number;
    tipo_trabajo: number;
    numero_orden: string;
    nic: number;
    tipo_orden: string;
    fecha_ejecucion: string;
    acta: string;
}

export interface ICteOrderAdminOsfFailed{   
    id_orden: number;  
    item: number;
    contratista: number;
    numero_orden: string;
    nic: number;
    plan: string;
    descripcion_trabajo_tipo: string;
    fecha_ejecucion: string;
    acta: string;
}

export interface ICteOrderAdminOsfRejected{   
    id_orden: number;  
    numero_orden: string;
    response: string;
    motivo_rechazo: string;
}

export interface ICteInspection{   
    id_inspeccion: number;
    item: number;
    nic: number;
    departamento: string;
    municipio: string;
    barrio: string;
    direccion: string;
    inspector: string;
}

export interface ICteInspectionReport{   
    item: number;
    nic: number;
    tipo: number;
    departamento: string;
    municipio: string;
    barrio: string;
    direccion: string;
    cliente: string;
    inspector: string;
    fecha_ejecucion: string;
    fecha_procesada: string;
    id_inspeccion: number;
}

export interface ICteInspectionRescheduled{   
    item: number;
    nic: number;
    anomalia: string;
    longitud: string;
    latitud: string;
    observaciones: string;
    fecha_creacion: string;
    tecnico: string;
}