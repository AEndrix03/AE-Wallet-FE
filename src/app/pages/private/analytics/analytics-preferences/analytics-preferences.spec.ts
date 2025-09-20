import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsPreferences } from './analytics-preferences';

describe('AnalyticsPreferences', () => {
  let component: AnalyticsPreferences;
  let fixture: ComponentFixture<AnalyticsPreferences>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsPreferences]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticsPreferences);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
