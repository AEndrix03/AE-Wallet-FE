import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortfolioNewCardComponent } from './portfolio-new-card.component';

describe('PortfolioEmptyCard', () => {
  let component: PortfolioNewCardComponent;
  let fixture: ComponentFixture<PortfolioNewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioNewCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioNewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
