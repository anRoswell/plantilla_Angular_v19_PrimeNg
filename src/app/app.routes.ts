import { Routes } from '@angular/router';
import { DynamicCrudComponent } from './dynamic-crud/dynamic-crud.component';
import { ConsultarAlertaComponent } from './consultar-alerta/consultar-alerta/consultar-alerta.component';
import { TailCssComponent } from './tail-css/tail-css.component';

export const routes: Routes = [
  { path: 'crudForm', component: DynamicCrudComponent },
  { path: 'consultarAlerta', component: ConsultarAlertaComponent },
  { path: 'css', component: TailCssComponent },
];
