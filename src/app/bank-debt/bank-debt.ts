import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators,FormsModule } from '@angular/forms';
import formConfig from '../../assets/form.config.json';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

interface Field {
  label: string;
  key: string;
  type: string;
  options?: string[];
  required: boolean;
  placeholder?: string;
  showRupeeIcon?: boolean;
}

@Component({
  selector: 'app-bank-debt',
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule,FormsModule,BsDatepickerModule],
  templateUrl: './bank-debt.html',
  styleUrl: './bank-debt.css'
})
export class BankDebt {
  selectedCityId: number | null = null;
  form!: FormGroup;

  // Adapted to your new JSON structure
  customerLink: Field[] = formConfig.bankDebtPayment || [];

  showPaymentDetails = true;
  showCustomerLink = true;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const group: { [key: string]: any } = {};
    // Initialize form controls from customerLink array
    this.customerLink.forEach((field: Field) => {
      group[field.key] = [null, field.required ? Validators.required : []];
    });

    this.form = this.fb.group(group);
  }
  get config() {
    console.log("amnkk",this.customerLink)
  return {
    customerLink: this.customerLink
  };
}


  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form Values:', this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
