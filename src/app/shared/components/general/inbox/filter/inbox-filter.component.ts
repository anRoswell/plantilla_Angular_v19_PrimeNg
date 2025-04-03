import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

// Date FNS
import { addMonths, subMonths } from 'date-fns';

// Interfaces
import { IInboxFilter } from '../../../../../models/general/IInboxFilter';
import { TypeItemList } from '../../../../../common/enums/general/TypeItemList';
import { TypeCalendar } from '../../../../../common/enums/general/TypeCalendar';
import { TypeControl } from '../../../../../common/enums/general/TypeControl';
// angular
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// PrimeNG
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-inbox-filter',
  standalone: true,
  templateUrl: './inbox-filter.component.html',
  styleUrls: ['./inbox-filter.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    InputTextModule,
    CalendarModule,
    ButtonModule,
    SelectModule,
    DatePickerModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          height: '*',
        })
      ),
      state(
        'closed',
        style({
          height: '0',
        })
      ),
      transition('open => closed', [animate('0.1s ease-in-out')]),
      transition('closed => open', [animate('0.1s ease-in-out')]),
    ]),
  ],
})
export class InboxFilterComponent<T> {
  @Input({ required: true }) filters!: IInboxFilter[];
  @Input() values!: T;
  @Output() onConsult = new EventEmitter<T>();
  @Output() closeFilters: EventEmitter<boolean> = new EventEmitter();

  form!: FormGroup;
  typesControl = TypeControl;
  typesCalendar = TypeCalendar;
  isSelectAll = false;
  isCloseFilters = false;

  // calculo por defecto de fechas
  minDate = subMonths(new Date(), 12);
  maxDate = addMonths(new Date(), 3);

  filterHidden: IInboxFilter[] = [];
  filterNotHidden: IInboxFilter[] = [];

  constructor() { }

  ngOnInit() {
    const group: any = {};

    console.log('filters', this.filters);

    // inicializar controles y parametros
    this.filters?.forEach((filter: IInboxFilter) => {
      // inicializa listas de selecciona con la misma lista que llega
      if (!filter.selectedlist) {
        filter.selectedlist = filter.list ?? [];
      }

      this._addAllAndWithoutToList(filter);

      // inicializa controles
      group[filter.name] =
        filter.required ?? false
          ? new FormControl(this._setValue(filter), Validators.required)
          : new FormControl(this._setValue(filter));
    });

    this.filterHidden = this.filters.filter(
      (filter) => filter.typeControl === TypeControl.HIDDEN
    );
    this.filterNotHidden = this.filters.filter(
      (filter) => filter.typeControl !== TypeControl.HIDDEN
    );

    console.log('filterHidden', this.filterHidden);
    console.log('filterNotHidden', this.filterNotHidden);

    // crea filtros
    this.form = new FormGroup(group);

    // setea filtros
    if (this.values) {
      this.form.patchValue(this.values as any);
    }

    // marca todas las validaciones
    this.form.markAllAsTouched();
  }

  onConsultFilter() {
    this.onConsult.emit(this.form.value);
    this.onCloseFilters();
  }

  onSelectUnique(event: any, filter: IInboxFilter) {
    this.isSelectAll = false;
    this._filterValue([event.value], filter);
  }

  onSelectMulti(event: any, filter: IInboxFilter) {
    let idValues: number[] = [];

    // chequea si el item seleccionado es Todos
    // si es seleccionado TODOS descheque los demas y activa selecciona todo
    // si se selcciona otro item deselecciona TODOS y desactiva selecciona todo
    if (event.value[event.value.length - 1] === TypeItemList.Todos) {
      this.isSelectAll = true;
      idValues = [TypeItemList.Todos];
    } else {
      this.isSelectAll = false;
      idValues = event.value?.filter(
        (value: number) => value !== TypeItemList.Todos
      );
    }

    this.form.get(filter.name)?.setValue(idValues);

    this._filterValue(idValues, filter);
  }

  onSelectAllChange(event: any, filter: IInboxFilter) {
    let selectedList: any[] = [];
    let idValues: number[] = [];

    // si el filtro tiene el item todos solo se selecciona este item
    if (filter.addItemAll) {
      selectedList = event.checked
        ? filter.selectedlist
          ? [filter.selectedlist[0]]
          : []
        : [];
    } else {
      selectedList = event.checked ? filter.selectedlist ?? [] : [];
    }

    idValues =
      selectedList?.map((item: any) => item[filter.optionValue!]) ?? [];

    this.isSelectAll = event.checked;

    this.form.get(filter.name)?.setValue(idValues);

    this._filterValue(idValues, filter);
  }

  onClear() {
    this.isSelectAll = false;
  }

  onCloseFilters() {
    this.isCloseFilters = !this.isCloseFilters;
    this.closeFilters.emit(this.isCloseFilters);
  }

  getColumnClass(count: number): string {
    if (count === 1 || count === 2) {
      return 'col-6'; // Ocupa 6 columnas si hay 1 o 2 elementos
    } else if (count === 3) {
      return 'col-4'; // Ocupa 4 columnas si hay 3 elementos
    } else {
      return 'col-3'; // Ocupa 3 columnas si hay más de 3 elementos
    }
  }

  private _setValue(filter: IInboxFilter) {
    if (filter.selectFirstItem) {
      return filter.selectedlist
        ? filter.typeControl === TypeControl.MULTI_SELECT
          ? [filter.selectedlist[0][filter.optionValue!]]
          : filter.selectedlist[0][filter.optionValue!] ?? null
        : null;
    } else {
      return filter?.value ?? null;
    }
  }

  private _filterValue(values: number[], filter: IInboxFilter) {
    // verificar si el control filtar multiples componentes
    if (filter.actionChangeTo instanceof Array) {
      // check integridad de filtros
      if (
        (filter.actionChangeTo.length ?? 0) ===
        (filter.actionChangeToField?.length ?? 0) &&
        (filter.actionChangeToField?.length ?? 0) ===
        (filter.actionChangeToOptionFilter?.length ?? 0) &&
        filter.actionChangeTo!.length > 0
      ) {
        filter!.actionChangeTo.forEach((value: string, index: number) => {
          const actionChangeTo = filter.actionChangeTo![index];
          const actionChangeToField = filter.actionChangeToField![index];
          const actionChangeToOptionFilter =
            filter.actionChangeToOptionFilter![index];

          this._filter(
            values,
            filter,
            actionChangeTo,
            actionChangeToField,
            actionChangeToOptionFilter
          );
        });
      } else {
        console.error(
          'Error no hay integridad en los filtros del control',
          filter.name
        );
      }
    } else {
      this._filter(
        values,
        filter,
        filter.actionChangeTo as string,
        filter.actionChangeToField as string,
        filter.actionChangeToOptionFilter as string
      );
    }
  }

  private _filter(
    values: number[],
    filter: IInboxFilter,
    actionChangeTo: string,
    actionChangeToField: string,
    actionChangeToOptionFilter: string | null
  ) {
    const filterTo = this.filters?.find(
      (itemFilter) => itemFilter?.name === actionChangeTo
    );

    if (filterTo?.name && actionChangeToField) {
      const selectItems = actionChangeToOptionFilter
        ? filter?.list?.filter((item) =>
          values.find((value) => item[filter.optionValue!] === value)
        ) ?? []
        : [];

      const selectFilter =
        filterTo?.list?.filter((item) => {
          if (actionChangeToOptionFilter) {
            // busqueda por filtro opcional
            return selectItems.find((select: any) =>
              item[actionChangeToField] instanceof Array
                ? item[actionChangeToField]?.includes(
                  select[actionChangeToOptionFilter]
                )
                : item[actionChangeToField] ===
                select[actionChangeToOptionFilter]
            );
          } else {
            // busqueda por valores
            return values.find((value: number) =>
              item[actionChangeToField] instanceof Array
                ? item[actionChangeToField]?.includes(value)
                : item[actionChangeToField] === value
            );
          }
        }) ?? [];

      // si no esta se está seleccionado 'seleccionar el primer item', se obliga aseleccionar en el filtro con dependencia
      if (!filterTo.selectFirstItem) {
        this.form.get(filterTo!.name)?.setValue([]);
      }

      filterTo!.selectedlist = selectFilter;

      this._addAllAndWithoutToList(filterTo);
    }
  }

  private _addAllAndWithoutToList(filter: IInboxFilter) {
    if (filter.addItemAll) {
      const objAll: any = {};
      objAll[filter.optionLabel ?? ''] = TypeItemList[TypeItemList.Todos];
      objAll[filter.optionValue ?? ''] = TypeItemList.Todos;

      const field = filter.optionValue ?? '';
      const checkItemAll = filter.selectedlist?.filter(
        (item) => item[field] === TypeItemList.Todos
      );

      if (checkItemAll?.length === 0) {
        filter.selectedlist!.unshift(objAll);
      }
    }

    if (filter.addItemWithout) {
      const objWithout: any = {};
      objWithout[filter.optionLabel ?? ''] = `Sin ${filter.name}`;
      objWithout[filter.optionValue ?? ''] = TypeItemList['Sin registros'];

      const field = filter.optionValue ?? '';
      const checkItemWithout = filter.selectedlist?.filter(
        (item) => item[field] === TypeItemList['Sin registros']
      );

      if (!checkItemWithout) {
        filter.selectedlist!.unshift(objWithout);
      }
    }
  }
}
