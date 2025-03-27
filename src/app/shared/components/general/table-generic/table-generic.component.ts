import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { format } from 'date-fns';

//PrimeNG
import { MultiSelect, MultiSelectModule } from 'primeng/multiselect';
import { Table, TableModule } from 'primeng/table';

//
import { TypeFormatDate } from '../../../../common/enums/general/TypeFormatDate';
import { FunctionArray } from '../../../../util/functionsArray';
import {
  IColumn,
  ITable,
  TypeColumn,
  TypeFormat,
} from '../../../../models/general/ITable';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-generic',
  templateUrl: './table-generic.component.html',
  styleUrls: ['./table-generic.component.scss'],
  standalone: true,
  imports: [TableModule, MultiSelectModule, ButtonModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableGenericComponent<T> implements OnInit, AfterViewInit {
  @Input({ required: true }) data: T[] = [];
  @Input({ required: true }) table!: ITable;
  @Input() dataSelected: T[] = [];
  @Input() message: string = '0 registros';
  @Input() width!: number;
  @Input() height!: number | null;
  @Input() fixHeight = 0;
  @Input() totalRecords = 0;
  @Input() first = 0;
  @Input() showButtonCleanFilters = true;
  @Output() onLazyLoad = new EventEmitter<any>();
  @Output() onSelected = new EventEmitter<any>();

  @ViewChild('dtTableGeneric') dataTable!: Table;
  @ViewChild('multiselectColumns') multiSelectColumns!: MultiSelect;

  topHtmlTableForHeight = 247;
  adjustHeight = 130; // header + nav + tab)
  matchModeOptions = [
    { label: 'Contiene', value: 'contains' },
    { label: 'Igual', value: 'equals' },
  ];
  typesColumns = TypeColumn;
  typesFormat = TypeFormat;
  typesFormatDate = TypeFormatDate;
  searchExecuted = false;

  // select columns table
  isSelectAll = true;
  selectColumns!: IColumn[];

  ngOnInit() {
    console.log(this.data);
    console.log(this.table);
    setTimeout(() => {
      this.calcScrollHeight();
      this.setOrderColumns();
      this.updateSelectColumn(true, this.table.columns);
    }, 50);
  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.calcScrollHeight();
    //   this.setOrderColumns();
    //   this.updateSelectColumn(true, this.table.columns);
    // }, 50);
  }

  // ngAfterViewInit(): void {
  //   console.log(this.data);
  //   console.log(this.table);
  //   setTimeout(() => {
  //     this.calcScrollHeight();
  //     this.setOrderColumns();
  //     this.updateSelectColumn(true, this.table.columns);
  //   }, 50);
  // }

  onLazyLoadRecords(event?: any | undefined) {
    this.searchExecuted = true;
    this.onLazyLoad.emit(event);
  }

  onSelectedRecords(event?: any | undefined) {
    if (event instanceof Array) {
      this.onSelected.emit(event);
    } else {
      this.onSelected.emit([event]);
    }
  }

  onResetFilters() {
    if (this.dataTable && this.searchExecuted) {
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
      const rec =
        this.dataTable.containerViewChild?.nativeElement.getBoundingClientRect();
      const topHtmlTableForHeight =
        window.innerHeight -
        (Math.round(rec.top ?? this.topHtmlTableForHeight) +
          this.fixHeight +
          this.adjustHeight);

      this.dataTable.scrollHeight = `${this.height ?? topHtmlTableForHeight}px`;
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
    this.updateSelectColumn(
      event.checked,
      event.checked ? this.table.columns : []
    );
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
