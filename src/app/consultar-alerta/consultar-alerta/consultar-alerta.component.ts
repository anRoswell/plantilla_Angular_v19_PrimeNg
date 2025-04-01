import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { lastValueFrom, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Export } from './../../util/exportExcel';
import { IDataPagination, IPagination } from '../../models/general/IPagination';
import { TypeSeverity } from '../../models/general/IModal';
import { ITable, TypeColumn, TypeFormat } from '../../models/general/ITable';
import { InboxComponent } from '../../shared/components/general/inbox/inbox.component';
import { ButtonModule } from 'primeng/button';
import { AlertaModel } from '../../models/class/alerta.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-consultar-alerta',
  templateUrl: './consultar-alerta.component.html',
  styleUrls: ['./consultar-alerta.component.scss'],
  standalone: true,
  imports: [InboxComponent, ButtonModule, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultarAlertaComponent implements AfterViewInit {
  textButtonExportSelectedExcel = 'Exportar a excel';

  currentPagination!: IPagination;
  tableSubject$ = new Subject<ITable>();
  dataSubject$ = new Subject<IDataPagination<AlertaModel[]>>();
  data!: IDataPagination<AlertaModel[]>;

  // types
  typesSeverity = TypeSeverity;

  constructor(private http: HttpClient) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setTable();
    }, 50);
  }

  //#region table
  // config
  setTable() {
    const table: ITable = {
      fieldId: 'cod', // aqui se define el id de los datos
      paginator: true,
      //rowsPerPageOptions: PAGINATION_NUMBERS, // this.gosModuleOrdenesService.rowsPerPageOptions,
      rowsPerPageOptions: [5, 10, 15, 20], // this.gosModuleOrdenesService.rowsPerPageOptions,
      lazyLoadOnInit: true,
      columns: [
        {
          field: 'cod',
          label: '',
          type: TypeColumn.MULTI_SELECT
        },
        {
          field: 'cod',
          label: 'Código',
          type: TypeColumn.NUMBER,
          filter: true,
          sort: true,
        },
        {
          field: 'emp',
          label: 'Emp',
          type: TypeColumn.NUMBER,
          filter: true,
          sort: true,
        },
        {
          field: 'proceso',
          label: 'Proceso',
          type: TypeColumn.TRUNCATE_TEXT,
          filter: true,
          sort: true,
          format: TypeFormat.UPPERCASE,
        },
        {
          field: 'paso',
          label: 'Paso',
          type: TypeColumn.TRUNCATE_TEXT,
          filter: true,
          sort: true,
        },
        {
          field: 'perfil',
          label: 'Perfil',
          type: TypeColumn.NUMBER,
          filter: true,
          sort: true,
        },
        {
          field: 'flujo',
          label: 'Flujo',
          type: TypeColumn.NUMBER,
          filter: true,
          sort: true,
        },
        {
          field: 'ruta',
          label: 'Ruta',
          type: TypeColumn.NUMBER,
          filter: true,
          sort: true,
        },
        {
          field: 'tipdoc',
          label: 'Tipo Documento',
          type: TypeColumn.TRUNCATE_TEXT,
          filter: true,
          sort: true,
        },
        {
          field: 'estado',
          label: 'Estado',
          type: TypeColumn.STRING,
          filter: true,
          sort: true,
          format: TypeFormat.UPPERCASE,
        },
        {
          field: 'fecha_cargue',
          label: 'Fecha Cargue',
          type: TypeColumn.DATE,
          filter: true,
          sort: true,
          format: TypeFormat.DATETIME,
        },
        {
          field: 'fecha_doc',
          label: 'Fecha Doc',
          type: TypeColumn.DATE,
          filter: true,
          sort: true,
          format: TypeFormat.DATETIME,
        },
        {
          field: 'observacion',
          label: 'Observación',
          type: TypeColumn.TRUNCATE_TEXT,
          filter: true,
          sort: true,
          format: TypeFormat.TRUNCATE_TEXT,
        },
        {
          field: 'valor',
          label: 'Valor',
          type: TypeColumn.NUMBER,
          filter: true,
          sort: true,
        },
        {
          field: 'proveedor',
          label: 'Proveedor',
          type: TypeColumn.STRING,
          filter: true,
          sort: true,
        },
        {
          field: 'codigo',
          label: 'Codigo',
          type: TypeColumn.STRING,
          filter: true,
          sort: true,
          format: TypeFormat.CAPITALIZE,
        },
        {
          field: 'fact',
          label: 'Fact',
          type: TypeColumn.STRING,
          filter: true,
          sort: true,
        },
        {
          field: 'acciones',
          label: 'Acciones',
          type: TypeColumn.ACTION,
          icon: 'pi-cog',
        }
      ],
    };

    this.tableSubject$.next(table);
  }

  // funciones
  async onLoadRecords(event?: any) {
    this.currentPagination = event;
    console.log(event);
    switch (event.rows) {
      case 5:
        this.data = await lastValueFrom(this.http.get<any>('data.json'));
        break;
      case 10:
        this.data = await lastValueFrom(this.http.get<any>('data02.json'));
        break;
      case 15:
        this.data = await lastValueFrom(this.http.get<any>('data03.json'));
        break;
      case 20:
        this.data = await lastValueFrom(this.http.get<any>('data04.json'));
        break;
    }
    // this.data = await lastValueFrom(this.http.get<any>('data.json'));
    this.dataSubject$.next(this.data);
    console.log('Pagination Object:', this.currentPagination);

  }

  onConsult(event: any) {
    this.onLoadRecords();
  }

  //#endregion

  //#region buttons
  onExportSelectedExcel() {
    Export.Excel(this.data.data as any, 'Reporte_Alertas.xlsx');
  }

  //#endregion


  // funciones record
  onDownloadActaPdf(event: any, btn: any) {
    console.log(event);
    console.log(btn);
  }
}
