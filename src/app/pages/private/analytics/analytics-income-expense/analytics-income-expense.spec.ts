import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsIncomeExpense } from './analytics-income-expense';

describe('AnalyticsIncomeExpense', () => {
  let component: AnalyticsIncomeExpense;
  let fixture: ComponentFixture<AnalyticsIncomeExpense>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsIncomeExpense]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticsIncomeExpense);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
