import { IMenu } from "../general/IMenu";
import { IProfile } from "../general/IProfile";
import { IZone } from "./IZone";

export interface IUser {
    id_usuario: number;
    id_persona: number;
    nombres_apellidos: string;
    identificacion: string;
    tipo_identificacion: string;
    id_contratista?: number;
    ind_cambio_clave?: string;
    id_contratista_persona?: number;    
    ind_cambio_placa?: string;
    email: string;
    zonas: IZone[];
    perfiles: IProfile[];
    menus: IMenu[];
    url?: string;
    url_origen?: string;
    path?: string;
}