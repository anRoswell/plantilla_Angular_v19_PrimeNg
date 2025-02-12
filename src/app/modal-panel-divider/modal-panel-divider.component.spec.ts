import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPanelDividerComponent } from './modal-panel-divider.component';

describe('ModalPanelDividerComponent', () => {
  let component: ModalPanelDividerComponent;
  let fixture: ComponentFixture<ModalPanelDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalPanelDividerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPanelDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
