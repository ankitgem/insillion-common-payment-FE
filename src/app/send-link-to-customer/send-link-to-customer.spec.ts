import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendLinkToCustomer } from './send-link-to-customer';

describe('SendLinkToCustomer', () => {
  let component: SendLinkToCustomer;
  let fixture: ComponentFixture<SendLinkToCustomer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendLinkToCustomer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendLinkToCustomer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
