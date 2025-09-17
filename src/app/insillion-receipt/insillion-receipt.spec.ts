import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsillionReceipt } from './insillion-receipt';

describe('InsillionReceipt', () => {
  let component: InsillionReceipt;
  let fixture: ComponentFixture<InsillionReceipt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsillionReceipt]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsillionReceipt);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
