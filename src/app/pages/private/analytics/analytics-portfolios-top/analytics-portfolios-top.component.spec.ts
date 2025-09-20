import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsPortfoliosTopComponent } from './analytics-portfolios-top.component';

describe('AnalyticsPortfoliosTop', () => {
  let component: AnalyticsPortfoliosTopComponent;
  let fixture: ComponentFixture<AnalyticsPortfoliosTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsPortfoliosTopComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalyticsPortfoliosTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
