import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsTrend } from './analytics-trend';

describe('AnalyticsTrend', () => {
  let component: AnalyticsTrend;
  let fixture: ComponentFixture<AnalyticsTrend>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsTrend]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticsTrend);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
