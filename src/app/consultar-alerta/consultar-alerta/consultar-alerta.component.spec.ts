import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarAlertaComponent } from './consultar-alerta.component';

describe('ConsultarAlertaComponent', () => {
  let component: ConsultarAlertaComponent;
  let fixture: ComponentFixture<ConsultarAlertaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultarAlertaComponent]
    });
    fixture = TestBed.createComponent(ConsultarAlertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
