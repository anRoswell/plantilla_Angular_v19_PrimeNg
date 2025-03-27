export class ISelector{
    actividades: Array<ActividadSelector>;
    gestiones: Array<GestionSelector>;
    acciones: Array<AccionSelector>;
    temas: Array<TemaSelector>;
    subtemas: Array<SubTemaSelector>;
    publicos_tipo: Array<PublicoTipoSelector>;
    actores_tipo: Array<ActorTipoSelector>;
    mercados_tipo: Array<MercadoTipoSelector>;
    anomalias: Array<AnomaliaSelector>;
    causales: Array<CausalSelector>;
    estados_orden: Array<EstadoOrdenSelector>;
    contratistas_persona: Array<ContratistaPersona>;
    departamentos: Array<DepartamentoSelector>;
    municipios: Array<MunicipioSelector>;
    corregimientos: Array<CorregimientoSelector>;
    barrios: Array<BarrioSelector>;
}
export class  SelectorComun{
    id:number;
    descripcion:string;
}

export class ActividadSelector extends SelectorComun{
}

export class AnomaliaSelector extends SelectorComun{ 
}
export class CausalSelector extends SelectorComun{ 
}

export class  SelectorDaneComun{
    id:number;
    codigo_dane:string;
    descripcion:string;
}

export class GestionSelector extends SelectorComun{
    id_actividad:number;
   
}
export class AccionSelector extends SelectorComun{
    id_gestion: number;
}

export class TemaSelector extends SelectorComun{
    id_accion: number;
}

export class SubTemaSelector extends SelectorComun{
    id_tema: number;
}

export class PublicoTipoSelector extends SelectorComun{
    id_actividad: number;
}

export class ActorTipoSelector extends SelectorComun{
    id_actividad: number;
}

export class MercadoTipoSelector extends SelectorComun{
    id_actividad: number;
}

export class EstadoOrdenSelector extends SelectorComun{
    id_actividad: number;
    codigo_estado: string;
    estado: string;
    descripcion: string;
}
export class ContratistaPersona{
    id_contratista: number;
    id_contratista_persona: string;
    codigo_rol:string;
    descripcion: string;
    identificacion: string;
}

export class DepartamentoSelector extends SelectorDaneComun{

}
export class MunicipioSelector extends SelectorDaneComun{
    id_departamento:number;
}
export class CorregimientoSelector extends SelectorDaneComun{
    id_municipio:number;
}
export class BarrioSelector extends SelectorDaneComun{
    id_corregimiento:number;
}
