import { IBotonera } from '../general/IPagination';

export class AlertaModel {
  constructor(
    public tipoAlerta: string = '',
    public idAlerta: number = 0,
    public vehiculo: string = '',
    public imei: string = '',
    public valorAlerta: number = 0,
    public descripcion: string = '',
    public estado: string = '',
    public latVehiculo: number = 0,
    public lonVehiculo: number = 0,
    public fechaRegistro: string = ''
  ) // public acciones: (data: any) => void
  {}
}
