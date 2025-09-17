import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequePayment } from './cheque-payment';

describe('ChequePayment', () => {
  let component: ChequePayment;
  let fixture: ComponentFixture<ChequePayment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChequePayment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChequePayment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
