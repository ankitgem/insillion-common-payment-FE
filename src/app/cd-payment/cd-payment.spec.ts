import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdPayment } from './cd-payment';

describe('CdPayment', () => {
  let component: CdPayment;
  let fixture: ComponentFixture<CdPayment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CdPayment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CdPayment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
