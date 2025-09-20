import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsSummary } from './analytics-summary';

describe('AnalyticsSummary', () => {
  let component: AnalyticsSummary;
  let fixture: ComponentFixture<AnalyticsSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsSummary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticsSummary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
