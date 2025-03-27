export interface  IFilterObra{
    id_actividad: number,
    id_territorial?: number,
    id_zona?: number,
    codigo:string | null,
    nombre:string | null,
    id_centro_costo:number | null,
    id_centro_responsable: number | null ,
    fecha_inicio:string | null,
    fecha_fin: string | null,
    id_contratista: number | null,
    objetivo?:string | null
}