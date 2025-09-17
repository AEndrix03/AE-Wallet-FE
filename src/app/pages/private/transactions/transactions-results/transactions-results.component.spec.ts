import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsResultsComponent } from './transactions-results.component';

describe('TransactionsResults', () => {
  let component: TransactionsResultsComponent;
  let fixture: ComponentFixture<TransactionsResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsResultsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionsResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
