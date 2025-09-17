import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentStatusPage } from './payment-status-page';

describe('PaymentStatusPage', () => {
  let component: PaymentStatusPage;
  let fixture: ComponentFixture<PaymentStatusPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentStatusPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
