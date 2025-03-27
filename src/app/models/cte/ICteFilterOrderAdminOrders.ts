export interface ICteFilterOrderPending {
    id_orden_estado: string[];
    id_medida_tipo: string[];
    id_orden_tipo: string[];
    id_suministro_alarma: string[];
    numero_orden: string;
    nic: string;
    id_tipo_proceso: string[];
    id_contratista: string[];
    id_contratista_persona: string[];
    id_localidad: string[];
    id_municipio: string[];
}

export interface ICteFilterAuditWindow {
    id_orden_tipo: string[];
    id_trabajo_tipo: string[];
    id_contratista: string[];
    id_contratista_persona: string[];
    numero_orden: string;
    fecha: string[];
}

export interface ICteFilterAdministrationOsfOrderAbnormal {
    id_contratista: string[];
    id_orden_tipo: string[];
    numero_orden: string;
    fecha: string[];
}

export interface ICteFilterAdministrationOsfOrderFailed {
    id_trabajo_tipo: string[];
    numero_orden: string;
    fecha: string[];
}

export interface ICteFilterAdministrationOsfOrderRejected {
    numero_orden: string;
}

export interface ICteFilterInspection {
    nic: string;
    id_contratista_persona: string[];
    id_inspeccion_tipos: string[];    
    id_inspeccion_estados: string[];
    id_municipio: string[]; 
    id_localidad: string[];
    direccion: string;
    fecha: string[];   
}

export interface ICteFilterInspectionReport {
    nic: string;
    id_contratista_persona: string[];
    id_inspeccion_tipo: string[];
    id_inspeccion_estado: string[];
    id_municipio: string[];
    fecha: string[];
    id_localidad: string[];
}

export interface ICteFilterRescheduledOrder {
    nic: string;
    id_contratista_persona: string[];
    fecha: string[];    
}