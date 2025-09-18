import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators,FormsModule } from '@angular/forms';
import formConfig from '../../assets/form.config.json';
import { NgSelectModule } from '@ng-select/ng-select';


interface Field {
  label: string;
  key: string;
  type: string;
  options?: string[];
  required: boolean;
  placeholder?: string;
}

@Component({
  selector: 'app-cd-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule,FormsModule],
  templateUrl: './cd-payment.html',
  styleUrls: ['./cd-payment.css'],
})
export class CdPayment implements OnInit {
  selectedCityId: number | null = null;
  form!: FormGroup;

  // Adapted to your new JSON structure
  paymentDetails: Field[] = formConfig.paymentDetails?.fields || [];
  customerLink: Field[] = formConfig.customerLink || [];

  showPaymentDetails = true;
  showCustomerLink = true;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const group: { [key: string]: any } = {};

    // Initialize form controls from paymentDetails.fields array
    this.paymentDetails.forEach((field: Field) => {
      group[field.key] = [null, field.required ? Validators.required : []];
    });

    // Initialize form controls from customerLink array
    this.customerLink.forEach((field: Field) => {
      group[field.key] = [null, field.required ? Validators.required : []];
    });

    this.form = this.fb.group(group);
  }
  get config() {
    console.log("amnkk",this.customerLink)
  return {
    paymentDetails: this.paymentDetails,
    customerLink: this.customerLink
  };
}

  markAllAsTouched() {
    this.form.markAllAsTouched();
  }

  isValid(): boolean {
    return this.form.valid;
  }

  getValue() {
    return this.form.value;
  }


  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form Values:', this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
