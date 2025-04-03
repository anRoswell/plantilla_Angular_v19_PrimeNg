// Angular
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//PrimeNG
import { MultiSelect, MultiSelectModule } from 'primeng/multiselect';
import {
  Table,
  TableModule,
  TableRowSelectEvent,
  TableRowUnSelectEvent,
} from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';

//General
import { format } from 'date-fns';
import { TypeFormatDate } from '../../../../common/enums/general/TypeFormatDate';
import { FunctionArray } from '../../../../util/functionsArray';
import {
  IColumn,
  ITable,
  TypeColumn,
  TypeFormat,
} from '../../../../models/general/ITable';
@Component({
  selector: 'app-table-generic',
  templateUrl: './table-generic.component.html',
  styleUrls: ['./table-generic.component.scss'],
  standalone: true,
  imports: [
    TableModule,
    MultiSelectModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    CardModule,
    TooltipModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TableGenericComponent<T> implements AfterViewInit, OnChanges {
  @Input({ required: true }) data: T[] = [];
  @Input({ required: true }) table!: ITable;
  @Input() dataSelected: T[] = [];
  @Input() message: string = '0 registros';
  @Input() width!: number;
  @Input() height!: number | null;
  @Input() fixHeight = 0;
  @Input() totalRecords = 0;
  @Input() first = 0;
  @Input() showButtonCleanFilters: boolean = true;
  @Input() showFilters: boolean | null | undefined;
  @Output() onLazyLoad = new EventEmitter<any>();
  @Output() onSelected = new EventEmitter<any>();

  @ViewChild('dtTableGeneric') dataTable!: Table;
  @ViewChild('multiselectColumns') multiSelectColumns!: MultiSelect;

  topHtmlTableForHeight = 247;
  adjustHeight = 109; // header + nav + tab)
  matchModeOptions = [{ label: 'Contiene', value: 'contains' }, { label: 'Igual', value: 'equals' }];
  typesColumns = TypeColumn;
  typesFormat = TypeFormat;
  typesFormatDate = TypeFormatDate;
  lazyLoad: boolean | undefined;
  // select columns table
  isSelectAll = true;
  selectColumns!: IColumn[];

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setOrderColumns();
      this.updateSelectColumn(true, this.table.columns);
    }, 50);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // detecta si se está mostrando o no la zona de filtros o algún elemento encima de la tabla para el cálculo dela altura

    if (changes['showFilters']) {
      setTimeout(() => {
        this.calcScrollHeight();
      }, 150);
    }
    // detecta cuando se hace una nueva consulta para hacer reset de la tabla: filtros y paginación
    // se detecta cambios en data y lazyLoad en false para determinar que el usuario hizo una consulta
    if (changes['data']) {
      if (this.lazyLoad === false) {
        this.resetTable();
      } else {
        this.lazyLoad = false;
      }
    }
  }

  onLazyLoadRecords(event?: any | undefined) {
    this.lazyLoad = true;
    this.onLazyLoad.emit(event);
  }

  onSelectedRecords(event?: any | undefined) {
    if (event instanceof Array) {
      this.onSelected.emit(event);
      console.log('[onSelectedRecords] Registros seleccionados:', event);
    } else {
      this.onSelected.emit([event]);
      console.log('[onSelectedRecords] Registro seleccionado:', event);
    }
  }

  resetTable() {
    if (this.dataTable) {
      this.dataTable.clearFilterValues();
      this.dataTable.rows = this.table.rowsPerPageOptions ? this.table.rowsPerPageOptions[0] : 10;
    }
  }

  onResetFilters() {
    if (this.dataTable && !this.lazyLoad) {
      this.dataTable.reset();
    }
  }

  formatDate(date: string, typeFormat: TypeFormatDate) {
    try {
      if (date) {
        const normalizeDate = date.replace(/[^0-9:\-/.]/g, ' ').trim();
        return format(normalizeDate, typeFormat);
      }
      return date;
    } catch (error) {
      return date;
    }
  }

  calcScrollHeight() {
    if (this.table.paginator) {
      const rec = this.dataTable.containerViewChild?.nativeElement.getBoundingClientRect();
      const topHtmlTableForHeight = window.innerHeight - ((Math.round(rec.top ?? this.topHtmlTableForHeight)) + this.fixHeight + this.adjustHeight);
      this.dataTable.scrollHeight = `${this.height ?? topHtmlTableForHeight}px`;

      this.changeDetectorRef.markForCheck();
    }
  }

  trackByFunction(item: any) {
    return item[this.table?.fieldId];
  }
  //#region select columns
  onSelectMulti(event: any) {
    this.updateSelectColumn(false, event.value);
  }

  onSelectAllChange(event: any) {
    this.isSelectAll = event.checked;
    this.updateSelectColumn(event.checked, event.checked ? this.table.columns : []);
  }

  onClear() {
    this.isSelectAll = false;
  }

  updateSelectColumn(checked: boolean, columns: IColumn[]) {
    this.isSelectAll = checked;
    // ordenas lista
    const selectColumns = [...FunctionArray.order(columns, 'order')];
    // asigna la lista
    this.multiSelectColumns?.updateModel(selectColumns);
    this.selectColumns = selectColumns;
    console.log(this.selectColumns);
  }

  setOrderColumns() {
    // setea orden
    // se establece orden, este paso es requerido porque primeng al usar la opcion de ocultar
    // columnas, estas al volverlas a mostrar por defecto el control las pone de ultimo, se requiere
    // hacer un post ordenamiento
    this.table.columns.forEach((item, index) => {
      item.order = index;
    });
  }
  //#endregion
}
