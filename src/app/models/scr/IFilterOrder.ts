export interface IFilterOrderPending {
    contratista?: string[] | string;
    zona?: string[] | string;
    codigo_estado?: string[];
    suspension?: string[];
}

export interface IFilterOrderExecuted {
    contratista?: string[];
    zona?: string[];
    fechas?: string[];
}

export interface IFilterOrderTrace {
    contratista?: string[];
    zona?: string[];
    fechas?: string[];
}

export interface IFilterOrderLogLegalization {
    fecha?: string[];
}