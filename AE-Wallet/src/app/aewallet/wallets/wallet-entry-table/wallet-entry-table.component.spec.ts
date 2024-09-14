import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletEntryTableComponent } from './wallet-entry-table.component';

describe('WalletEntryTableComponent', () => {
  let component: WalletEntryTableComponent;
  let fixture: ComponentFixture<WalletEntryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletEntryTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletEntryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
