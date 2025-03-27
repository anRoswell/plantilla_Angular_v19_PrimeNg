import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicForm02Component } from './dynamic-form02.component';

describe('DynamicForm02Component', () => {
  let component: DynamicForm02Component;
  let fixture: ComponentFixture<DynamicForm02Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicForm02Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicForm02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
