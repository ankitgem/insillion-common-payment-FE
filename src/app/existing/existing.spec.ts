import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Existing } from './existing';

describe('Existing', () => {
  let component: Existing;
  let fixture: ComponentFixture<Existing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Existing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Existing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
