import { format } from 'date-fns';
import { TypeFormatDate } from '../common/enums/general/TypeFormatDate';

/**
 * Retorna la fecha en formato dd/mm/yyyy
 * @param fecha
 * @returns
 */
export function convertirFecha(fecha?: Date | null | string) {
  if (!fecha) {
    return '';
  }

  if (typeof fecha === 'string') {
    fecha = new Date(fecha);
  }

  let dia: string = fecha.getDate().toString();
  let mes: string = (fecha.getMonth() + 1).toString();
  let año = fecha.getFullYear();

  if (Number(dia) < 10) {
    dia = '0' + dia;
  }

  if (Number(mes) < 10) {
      mes = '0' + mes;
  }

  let fechaFormateada = `${dia}/${mes}/${año}`;
  return fechaFormateada;
}

/**
 * Retorna la fecha en el formato deseado
 * @param date
 * @param typeFormat
 * @returns
 */
export function formatDate(date: string, typeFormat: TypeFormatDate) {
    try {
      if (date) {
        const normalizeDate = date.replace(/[^0-9:\-/.]/g, ' ').trim();
 
        return format(normalizeDate, typeFormat);
      }
 
      return date;
    } catch (error) {
      return date;
    }
  }