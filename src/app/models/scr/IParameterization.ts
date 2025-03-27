export interface IParameterization {
    id_filtro: number;
    id_columna_filtro: number;
    id_operador: number;
    id_contratista:number| null;
    valor: string;
}

export interface IColumn {
    id_columna: number;
    descripcion: string;
    tipo_dato: string;
    tipo_elemento: string;
    ind_requerido: string;
    operadores: IOperator[];
    lista?: IItemList[];
}

export interface IOperator {
    id_operador: number;
    descripcion: string;
    operador: string;
}

export interface IItemList {
    id: number;
    descripcion: string;
}

export interface IContainerParameter {
    column: IColumn;
    operador: IOperator;
}