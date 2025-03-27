/**
 * calcula la diferencia, en días, entre dos fechas
 * @returns
 */
 export default function CalcularDiferenciaFecha(fechaIni: any, fechaFin: any): number {
    const diff: number = fechaFin - fechaIni;
    const cantDias = diff/(1000*60*60*24)
    return cantDias;
}
