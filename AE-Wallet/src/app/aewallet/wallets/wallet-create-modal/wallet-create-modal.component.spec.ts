import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletCreateModalComponent } from './wallet-create-modal.component';

describe('WalletCreateModalComponent', () => {
  let component: WalletCreateModalComponent;
  let fixture: ComponentFixture<WalletCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletCreateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
