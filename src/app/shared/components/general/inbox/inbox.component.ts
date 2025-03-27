import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Subject } from 'rxjs';
import { IInboxFilter } from '../../../../models/general/IInboxFilter';
import { IDataPagination } from '../../../../models/general/IPagination';
import { ITable } from '../../../../models/general/ITable';
import { InboxFilterComponent } from './filter/inbox-filter.component';
import { TableGenericComponent } from '../table-generic/table-generic.component';

import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
  standalone: true,
  imports: [
    TableGenericComponent,
    SkeletonModule,
    InboxFilterComponent,
    AsyncPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InboxComponent<T, F = any> {
  // general
  @Input() resetAfterViewInit = true;

  // filter
  @Input() filters: IInboxFilter[] = [];
  @Input() valuesFilter!: F | null;
  @Output() onConsult = new EventEmitter<any>();

  closeFilters = false;
  showFilterstSubject$ = new Subject<boolean>();

  onConsultFilter(event?: any | undefined) {
    this.onConsult.emit(event);
  }

  onCloseFilters(event: any) {
    this.closeFilters = event;
    this.showFilterstSubject$.next(this.closeFilters);
  }

  // table
  @Input() table!: ITable;
  @Input() data!: IDataPagination<T>;
  @Input() dataSelected!: T[] | null;
  @Output() onLazyLoad = new EventEmitter<any>();
  @Output() onSelected = new EventEmitter<any>();

  onLazyLoadRecords(event?: any | undefined) {
    this.onLazyLoad.emit(event);
  }

  onSelectedRecords(event?: any | undefined) {
    this.onSelected.emit(event);
  }
}
