import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableGenericComponent } from './table-generic.component';

describe('TableGenericComponent', () => {
  let component: TableGenericComponent;
  let fixture: ComponentFixture<TableGenericComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableGenericComponent]
    });
    fixture = TestBed.createComponent(TableGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
