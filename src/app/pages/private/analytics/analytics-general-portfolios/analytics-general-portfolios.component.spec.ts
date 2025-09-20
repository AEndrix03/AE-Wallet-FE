import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsGeneralPortfoliosComponent } from './analytics-general-portfolios.component';

describe('AnalyticsGeneralPortfolios', () => {
  let component: AnalyticsGeneralPortfoliosComponent;
  let fixture: ComponentFixture<AnalyticsGeneralPortfoliosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsGeneralPortfoliosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalyticsGeneralPortfoliosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
