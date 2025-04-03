import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { lastValueFrom, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Export } from './../../util/exportExcel';
import { IDataPagination, IPagination } from '../../models/general/IPagination';
import { TypeSeverity } from '../../models/general/IModal';
import { ITable, TypeColumn, TypeFormat } from '../../models/general/ITable';
import { InboxComponent } from '../../shared/components/general/inbox/inbox.component';
import { ButtonModule } from 'primeng/button';
import { AlertaModel } from '../../models/class/alerta.model';
import { ModalTablaComponent } from "../../shared/components/general/modal-tabla/modal-tabla.component";
import { IInboxFilter } from '../../models/general/IInboxFilter';
import { ChangeDetectorRef } from '@angular/core';

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
  filters: IInboxFilter[] = [];
  filtersSubject$ = new BehaviorSubject<IInboxFilter[]>([]);
  valuesFilter: { [key: string]: any } = {};

  @ViewChild(ModalTablaComponent) modalTabla!: ModalTablaComponent;

  typesSeverity = TypeSeverity;

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) {
    this.loadFilters();
    this.filtersSubject$.subscribe((filters: IInboxFilter[]) => {
      console.log("Filtros en filtersSubject$ después de setFilters():", filters);
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setTable();
      this.loadFilters();
    }, 50);

    this.filtersSubject$.subscribe((filters: IInboxFilter[]) => {
      console.log("Filtros en filtersSubject$ después de loadFilters():", filters);
    });
  }

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

  async loadFilters() {
    try {
      const response = await lastValueFrom(this.http.get<any>('jsonFiltros.json'));
      if (response?.status === 200) {
        this.filters = response.data ?? [];
        this.filtersSubject$.next(this.filters);// Actualiza el observable con los filtros cargados
      } else {
        console.error("Error al cargar filtros, respuesta inesperada:", response);
      }
    } catch (error) {
      console.error("Error cargando filtros desde jsonFiltros.json:", error);
    }
  }

  async onLoadRecords(event?: any) {
    if (!event || !event.rows) {
      console.error("Error: El evento de paginación no tiene datos válidos", event);
      return;
    }

    this.currentPagination = event;

    try {
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
        default:
          console.warn("No se encontró un caso para event.rows:", event.rows);
          this.data = { data: [] }; // Evitar errores si event.rows tiene un valor inesperado
          break;
      }

      this.dataSubject$.next(this.data);
      console.log("Pagination Object:", this.currentPagination);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  }

  onConsult(event: any) {
    console.log("Evento recibido en onConsult:", event);
    this.onLoadRecords(event || { rows: 5 });
  }

  onExportSelectedExcel() {
    Export.Excel(this.data.data as any, 'Reporte_Alertas.xlsx');
  }

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

}
