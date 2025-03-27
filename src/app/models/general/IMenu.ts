export interface IMenu {
    clicked?: boolean;
    disabled?: boolean;
    expanded?: boolean;
    icon?: string;
    id?: number;
    items?: IMenu[];
    label?: string;
    order?: number;
    perfiles?: number[];
    permisos?: string[];
    routerLink?: string;
}