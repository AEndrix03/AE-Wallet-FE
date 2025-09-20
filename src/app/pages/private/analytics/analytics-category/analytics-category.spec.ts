import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsCategory } from './analytics-category';

describe('AnalyticsCategory', () => {
  let component: AnalyticsCategory;
  let fixture: ComponentFixture<AnalyticsCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsCategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticsCategory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
