import {  Filtro_Ordenes } from "./filtro.contratista.orden.model";

export interface FiltroContratistaResumenModel {
    codigo: number;
    identificacion: string;
    nombres: string;
    apellidos: string;
    filtros: Filtro_Ordenes[] | null;
}