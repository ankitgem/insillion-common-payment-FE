import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankDebt } from './bank-debt';

describe('BankDebt', () => {
  let component: BankDebt;
  let fixture: ComponentFixture<BankDebt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankDebt]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankDebt);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
