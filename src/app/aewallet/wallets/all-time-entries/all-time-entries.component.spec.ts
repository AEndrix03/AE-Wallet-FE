import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTimeEntriesComponent } from './all-time-entries.component';

describe('AllTimeEntriesComponent', () => {
  let component: AllTimeEntriesComponent;
  let fixture: ComponentFixture<AllTimeEntriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllTimeEntriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTimeEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
