export interface IFilterOrderPendingTecnico {
    brigada?: string[];
    zona?: string[] | string;
    estado?: string[];
    suspension?: string[];
}

export interface IFilterOrderExecutedTecnico {
    brigada?: string[];
    zona?: string[];
    fechas?: string[];
}

export interface IFilterOrderTraceTecnico {
    brigada: string[];
    zona?: string[];
    fechas?: string[];
}

export interface IFilterOrderLogLegalizationTecnico {
    fecha?: string[];
}