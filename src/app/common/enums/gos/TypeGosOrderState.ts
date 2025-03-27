export enum TypeGosOrderState{
    PENDIENTE_ASIGNACION = 'GPEN',
    CERRADA = 'GCER',
    COMPROMETIDA = 'GINT',
    ASIGNADA_GESTOR = 'GASG',
    PENDIENTE_CONFIRMACION = 'GPCO',
}

export const TypeGosOrderStateName: { [key in TypeGosOrderState]: string } = {
    [TypeGosOrderState.PENDIENTE_ASIGNACION]: 'PENDIENTE ASIGNACIÓN',
    [TypeGosOrderState.CERRADA]: "CERRADA",
    [TypeGosOrderState.COMPROMETIDA]: "COMPROMETIDA",
    [TypeGosOrderState.ASIGNADA_GESTOR]: "ASIGNADA A GESTOR",
    [TypeGosOrderState.PENDIENTE_CONFIRMACION]: "PENDIENTE DE CONFIRMACION"
};