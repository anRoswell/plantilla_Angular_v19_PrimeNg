export interface IFilterOrderGos {
    orden?: string,
    gestor?: string | null,
    fecha?: string[],
    estado?: number,
    pagina?: number,
    registros?: number
    total_registros?: number
}

export interface IOptionModalButton {
    assign: boolean,
    unassign: boolean
}