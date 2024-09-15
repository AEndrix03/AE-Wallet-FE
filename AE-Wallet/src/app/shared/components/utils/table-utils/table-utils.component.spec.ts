import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableUtilsComponent } from './table-utils.component';

describe('TableUtilsComponent', () => {
  let component: TableUtilsComponent;
  let fixture: ComponentFixture<TableUtilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableUtilsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableUtilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
