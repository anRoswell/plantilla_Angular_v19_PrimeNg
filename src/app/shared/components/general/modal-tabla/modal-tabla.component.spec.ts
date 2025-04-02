import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTablaComponent } from './modal-tabla.component';

describe('ModalTablaComponent', () => {
  let component: ModalTablaComponent;
  let fixture: ComponentFixture<ModalTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalTablaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
