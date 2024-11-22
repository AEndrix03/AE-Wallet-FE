import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColoredCurrencyInputComponent } from './colored-currency-input.component';

describe('ColoredCurrencyInputComponent', () => {
  let component: ColoredCurrencyInputComponent;
  let fixture: ComponentFixture<ColoredCurrencyInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColoredCurrencyInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColoredCurrencyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
