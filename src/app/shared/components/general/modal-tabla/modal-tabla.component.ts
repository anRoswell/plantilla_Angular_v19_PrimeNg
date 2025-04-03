import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BehaviorSubject, lastValueFrom } from 'rxjs';

import { AlertaModel } from '../../../../models/class/alerta.model';
import { IDataPagination, IPagination } from '../../../../models/general/IPagination';
import { ITable, TypeColumn, TypeFormat } from '../../../../models/general/ITable';
import { Export } from '../../../../util/exportExcel';
import { InboxComponent } from '../inbox/inbox.component';

@Component({
  selector: 'app-modal-tabla',
  standalone: true,
  imports: [CommonModule, DialogModule, TableModule, ButtonModule, InboxComponent],
  templateUrl: './modal-tabla.component.html',
  styleUrls: ['./modal-tabla.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalTablaComponent {
  @Output() close = new EventEmitter<void>();
  @Input() record: any;

  currentPagination!: IPagination;
  tableSubject$ = new BehaviorSubject<ITable | null>(null);
  dataSubject$ = new BehaviorSubject<IDataPagination<AlertaModel[]> | null>(null);
  data!: IDataPagination<AlertaModel[]>;

  isVisible = false;
  textButtonExportSelectedExcel = 'Exportar a Excel';

  constructor(private http: HttpClient, private changeDetectorRef: ChangeDetectorRef) {
    this.setTable();
  }

  //#region Modal
  openModal(record: any) {
    this.record = record;
    this.isVisible = true;
    this.setTable();
  }

  closeModal() {
    this.isVisible = false;
    this.close.emit();
  }
  //#endregion

  //#region Exportar
  onExportSelectedExcel() {
    if (this.data?.data) {
      Export.Excel(this.data.data as any, 'Reporte_Alertas.xlsx');
    }
  }
  //#endregion

  //#region Tabla
  setTable() {
    const table: ITable = {
      fieldId: 'cod',
      paginator: true,
      rowsPerPageOptions: [5, 10, 15, 20],
      lazyLoadOnInit: true,
      columns: [
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
          sort: true,
        },
        {
          field: 'proceso',
          label: 'Proceso',
          type: TypeColumn.TRUNCATE_TEXT,
          filter: true,
          sort: false,
          format: TypeFormat.UPPERCASE,
        },
        {
          field: 'paso',
          label: 'Paso',
          type: TypeColumn.TRUNCATE_TEXT,
          filter: false,
          sort: true,
        },
      ],
    };

    this.tableSubject$.next(table);
  }

  //#region Cargar registros
  async onLoadRecords(event?: any) {
    this.currentPagination = event;

    let url = '';
    switch (event.rows) {
      case 5:
        url = 'dataTable.json';
        break;
      case 10:
        url = 'data02.json';
        break;
      case 15:
        url = 'data03.json';
        break;
      case 20:
        url = 'data04.json';
        break;
    }

    if (url) {
      this.data = await lastValueFrom(this.http.get<any>(url));
      this.dataSubject$.next(this.data);
      console.log('Pagination Object:', this.currentPagination);
    }
  }

  onConsult(event: any) {
    this.onLoadRecords(event);
  }
  //#endregion
}
