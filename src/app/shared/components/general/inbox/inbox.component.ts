import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Subject } from 'rxjs';

// Interface
import { IInboxFilter } from '../../../../models/general/IInboxFilter';
import { IDataPagination } from '../../../../models/general/IPagination';
import { ITable } from '../../../../models/general/ITable';
import { InboxFilterComponent } from './filter/inbox-filter.component';

// Component
import { TableGenericComponent } from '../table-generic/table-generic.component';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-inbox',
  standalone: true,
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
  imports: [
    CommonModule,
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
  @Input() valuesFilter: F | null = null;
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
  @Input() table: ITable | null = null;
  @Input() data: IDataPagination<T> | null = null;
  @Input() dataSelected: T[] | null = null;
  @Output() onLazyLoad = new EventEmitter<any>();
  @Output() onSelected = new EventEmitter<any>();

  onLazyLoadRecords(event?: any) {
    this.onLazyLoad.emit(event);
  }

  onSelectedRecords(event?: any) {
    this.onSelected.emit(event);
  }

}
