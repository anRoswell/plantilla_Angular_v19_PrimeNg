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
      fieldId: 'idAlerta', // aqui se define el id de los datos
      paginator: true,
      //rowsPerPageOptions: PAGINATION_NUMBERS, // this.gosModuleOrdenesService.rowsPerPageOptions,
      rowsPerPageOptions: [5, 10, 15, 20], // this.gosModuleOrdenesService.rowsPerPageOptions,
      lazyLoadOnInit: true,
      columns: [
        {
          field: 'idAlerta',
          label: '',
          type: TypeColumn.MULTI_SELECT
        },
        {
          field: 'idAlerta',
          label: 'Id Alerta',
          type: TypeColumn.NUMBER,
          filter: true,
          sort: true,
        },
        {
          field: 'tipoAlerta',
          label: 'Tipo Alerta',
          type: TypeColumn.STRING,
          filter: true,
          sort: true,
          format: TypeFormat.UPPERCASE,
        },
        {
          field: 'vehiculo',
          label: 'Vehiculo',
          type: TypeColumn.STRING,
          filter: true,
          sort: true,
          format: TypeFormat.UPPERCASE,
        },
        {
          field: 'imei',
          label: 'IMEI',
          type: TypeColumn.STRING,
          filter: true,
          sort: true,
          format: TypeFormat.UPPERCASE,
        },
        {
          field: 'valorAlerta',
          label: 'Velocidad',
          type: TypeColumn.NUMBER,
          filter: true,
          sort: true,
        },
        {
          field: 'imei_Supervisor',
          label: 'IMEI Supervisor',
          type: TypeColumn.STRING,
          filter: true,
          sort: true,
          format: TypeFormat.UPPERCASE,
        },
        {
          field: 'distanciaCalculada',
          label: 'Distancia',
          type: TypeColumn.NUMBER,
          filter: false,
          sort: true,
        },
        {
          field: 'descripcion',
          label: 'Descripción',
          type: TypeColumn.STRING,
          filter: true,
          sort: true,
          format: TypeFormat.UPPERCASE,
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
          field: 'fechaRegistro',
          label: 'Fecha Registro',
          type: TypeColumn.DATE,
          filter: true,
          sort: true,
          format: TypeFormat.DATETIME,
        },
        {
          field: 'ciudad',
          label: 'Ciudad',
          type: TypeColumn.STRING,
          filter: true,
          sort: true,
          format: TypeFormat.CAPITALIZE,
        },
        {
          field: 'acciones',
          label: 'Acciones',
          type: TypeColumn.ACTION,
          icon: 'pi-eye',

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
}
