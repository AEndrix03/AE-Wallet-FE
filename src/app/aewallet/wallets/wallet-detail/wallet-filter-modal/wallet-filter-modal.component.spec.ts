import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletFilterModalComponent } from './wallet-filter-modal.component';

describe('WalletFilterModalComponent', () => {
  let component: WalletFilterModalComponent;
  let fixture: ComponentFixture<WalletFilterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletFilterModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletFilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
