import { FiltroContratistaResumenModel } from "./filtro.contratista.resumen.model";

export interface FiltroContratistaOrdenModel {
    columnas_filtro: Columnas_Filtro[];
    operador: Operador[];
    contratistas: FiltroContratistaResumenModel[];
    filtros_globales: Filtro_Ordenes[];
}

export interface Columnas_Filtro {
    codigo: number;
    descripcion: string;
    operadores: string;
    tipo_dato: string;
}

export interface Operador {
    codigo: number;
    descripcion: string;
}

export interface Filtro_Ordenes {
    id_filtro: number;
    id_columna_filtro: number;
    valor: string;
    id_contratista: any;
    id_operador:number;
}