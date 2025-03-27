import { Type } from "@angular/core";

export interface IModalConfig<T> {
    title: string;
    message?: string;
    icon?: string;
    iconClassColor?: string;
    component?: Type<any>,
    data?: T,
    width?: number,
    buttons?: IButton[];
    showClose?: boolean;
}

export interface IButton {
    disable?: boolean,
    label: string,
    icon?: string;
    severity?: TypeSeverity;
    action: (data?: any) => void
}

export enum TypeSeverity {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    SUCCESS = 'success',
    WARNING = 'warning',
    HELP = 'help',
    DANGER = 'danger',
}