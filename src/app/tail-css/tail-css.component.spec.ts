import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TailCssComponent } from './tail-css.component';

describe('TailCssComponent', () => {
  let component: TailCssComponent;
  let fixture: ComponentFixture<TailCssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TailCssComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TailCssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
