import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsCreate } from './transactions-create';

describe('TransactionsCreate', () => {
  let component: TransactionsCreate;
  let fixture: ComponentFixture<TransactionsCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
