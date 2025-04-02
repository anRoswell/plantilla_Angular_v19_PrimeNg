import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  output,
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
import { ViewChild } from '@angular/core';
import { ModalTablaComponent } from "../../shared/components/general/modal-tabla/modal-tabla.component";

@Component({
  selector: 'app-consultar-alerta',
  templateUrl: './consultar-alerta.component.html',
  styleUrls: ['./consultar-alerta.component.scss'],
  standalone: true,
  imports: [InboxComponent, ButtonModule, AsyncPipe, ModalTablaComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultarAlertaComponent implements AfterViewInit {
  textButtonExportSelectedExcel = 'Exportar a excel';

  currentPagination!: IPagination;
  tableSubject$ = new Subject<ITable>();
  dataSubject$ = new Subject<IDataPagination<AlertaModel[]>>();
  data!: IDataPagination<AlertaModel[]>;
  @ViewChild(ModalTablaComponent) modalTabla!: ModalTablaComponent;
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
          type: TypeColumn.MULTI_SELECT,
        },
        {
          field: 'cod',
          label: 'Cod',
          type: TypeColumn.NUMBER,
          filter: false,
          sort: false,
        },
        {
          field: 'emp',
          label: 'Emp',
          type: TypeColumn.NUMBER,
          filter: true,
          sort: false,
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
          filter: false,
          sort: false,
        },
        {
          field: 'flujo',
          label: 'Flujo',
          type: TypeColumn.NUMBER,
          filter: false,
          sort: false,
        },
        {
          field: 'ruta',
          label: 'Ruta',
          type: TypeColumn.NUMBER,
          filter: false,
          sort: false,
        },
        {
          field: 'tipdoc',
          label: 'TipDoc',
          type: TypeColumn.TRUNCATE_TEXT,
          filter: true,
          sort: true,
        },
        {
          field: 'estado',
          label: 'Estado',
          type: TypeColumn.STRING,
          filter: true,
          sort: false,
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
          sort: false,
          format: TypeFormat.DATETIME,
        },
        {
          field: 'observacion',
          label: 'Observación',
          type: TypeColumn.TRUNCATE_TEXT,
          filter: false,
          sort: false,
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
          sort: false,
        },
        {
          field: 'codigo',
          label: 'Código Ref',
          type: TypeColumn.STRING,
          filter: true,
          sort: false,
          format: TypeFormat.CAPITALIZE,
        },
        {
          field: 'fact',
          label: 'Fact',
          type: TypeColumn.STRING,
          filter: true,
          sort: false,
        },
        {
          field: 'acciones',
          label: 'Acciones',
          type: TypeColumn.ACTION,
          action: (rowData: any, btn: any) => this.handleAction(rowData, btn),
        },
      ],
    };

    this.tableSubject$.next(table);
  }

  // funciones
  async onLoadRecords(event?: any) {
    this.currentPagination = event;

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

  //#region Actions
  handleAction(record: any, btn: any) {
    console.log('Ejecutando acción:', btn.exec);
    console.log('Registro:', record);

    switch (btn.exec) {
      case 'openPDF':
        console.log('Abriendo PDF para:', record);
        // this.downloadPdf(record);
        break;

      case 'check':
        if (event) {
          record.isCheckedAction = (event.target as HTMLInputElement).checked;
          console.log('Se ha seleccionado el check de la tabla acciones en ConsultarAlertaComponent:', record.isCheckedAction);
        }
        break;

      case 'otroModal':
        console.log('Abriendo otroModal:', record);
        // this.openModal(record);
        break;

      case 'modalTable':
        console.log('Mostrando Modal Table para:', record);
        if (this.modalTabla) {
          this.modalTabla.openModal(record); // ASII SI ME Muestra el modal correctamente
        } else {
          console.warn('modalTabla no está inicializado aún.');
        }
        break;

      default:
        console.warn('Acción desconocida:', btn.exec);
    }
  }

  // toggleActionCheck(record: any, event: any) {
  //   record.isCheckedAction = event.target.checked;
  //   console.log("AAAAA", record);
  // }

  // downloadPdf(record: any) {
  //   console.log('Descargando Acta PDF para:', record);
  //   // Implementación real de descarga
  // }

  // openModal(record: any) {
  //   console.log('Abriendo modal para:', record);
  //   // Implementación real de abrir modal
  // }

  //#endregion
}
