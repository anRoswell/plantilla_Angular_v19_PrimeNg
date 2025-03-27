import { TypeGosAnexosGestion } from "src/app/common/enums/gos/TypeGosAnexosGestion";
import { IOrderGos } from "./IOrderGos";
import { ICambiosEstado } from "./ICambiosEstado";
import { IComentario } from "./IComentario";

export  type estadoAdjunto = "CREACION" |"ACTUALIZACION" |"ELIMINACION"

export interface IDatosGestion {
    datos_programacion: IDatosProgramacion;
    datos_desarrollo: IDatosDesarrollo;
}

export interface IOrdenDetail {
    datos_basicos: IOrderGos,
    cambios_estado: ICambiosEstado[],
    datos_gestion: IDatosGestion,
    adjuntos: IAdjunto[],
    comentarios: IComentario[]
}

export interface IOrderUpdate {
    datos_basicos: IOrderGos,
    datos_gestion: IDatosGestion
}

export interface IDatosDesarrollo {
    nombre_proyecto: string;
    nombre_contacto: string;
    nombre_barrio: string;
    cantidad_asistentes: number | null;
    id_tema: number | null;
    desc_tema: string;
    id_subtema: number | null;
    desc_subtema: string;
    observaciones:string;
    adjuntos: IAnexos;
    adjuntos_actualizacion: IAdjunto[];
}

export interface IDatosProgramacion {
    id_tema:number | null;
    id_subtema:number | null;
    id_actividad: number | null;
    desc_actividad: string;
    id_gestion: number | null;
    desc_gestion: string;
    id_accion: number | null;
    desc_accion: string;
    id_departamento: number | null;
    desc_departamento: string;
    id_municipio: number | null;
    desc_municipio: string;
    id_barrio: number | null;
    desc_barrio: string;
    id_publico_tipo: number | null;
    desc_publico_tipo: string;
    id_actor_tipo: number | null;
    desc_actor_tipo: string;
    id_mercado_tipo: number | null;
    desc_mercado_tipo: string;
    cuenta: string;
    cliente: string;
    otro_barrio: string;
    desc_otro_barrio: string;
    id_corregimiento: number;
    direccion: string;
    id_causal: number;
    id_anomalia: number;
    id_cliente: number;
}

export interface IAdjunto {
    id_adjunto?: number;
    fecha_registra?: string;
    formato?: string;
    id_soporte: number;
    id_tipo_soporte?: number;
    desc_tipo_soporte?: string;
    id_usuario_registra?: number;
    ind_url_externo?: string;
    nombre?: string;
    peso?: string;
    url?: string;
    base64?:string;
    estado?:estadoAdjunto;
    codigo_tipo_soporte?: string;
    accion?: string;
    tipo_soporte?: TypeGosAnexosGestion,
}

export interface IAnexos {
    evidencia: IAdjunto[];
    acta: IAdjunto[];
    asistencia: IAdjunto[];
    anomalia: IAdjunto[];
    causal: IAdjunto[];
    //pdf: IAdjunto[];
}

export type ITratamientoAnexos = {
    [key in TypeGosAnexosGestion]: IAnexos
}

export interface IAnexoGestion{
    eliminados?: IAdjunto[];
    insertados?: IAdjunto[];
    traidos?: IAdjunto[];
}
