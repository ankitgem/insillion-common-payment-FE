import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankGuarantee } from './bank-guarantee';

describe('BankGuarantee', () => {
  let component: BankGuarantee;
  let fixture: ComponentFixture<BankGuarantee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankGuarantee]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankGuarantee);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
