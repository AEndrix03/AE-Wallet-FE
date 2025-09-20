import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsPreferencesComponent } from './analytics-preferences.component';

describe('AnalyticsPreferences', () => {
  let component: AnalyticsPreferencesComponent;
  let fixture: ComponentFixture<AnalyticsPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsPreferencesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalyticsPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
