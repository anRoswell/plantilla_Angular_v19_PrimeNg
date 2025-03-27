import { IContratista } from "../scr/IContratista";

export interface IDashboard {
    statesSummary: IStatesSummary;
    contractorsSummary: IContratista;
}

export interface IStatesSummary {
    datasets: [{ data : number[] }];
    labels: string[]
}