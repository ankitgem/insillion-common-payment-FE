import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import formConfig from '../../assets/form.config.json';

import { ToastrModule, provideToastr, ToastrService } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';



interface Field {
  label: string;
  key: string;
  type: string;
  options?: string[];
  required: boolean;
};

@Component({
  selector: 'app-send-link-to-customer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,ToastrModule],
  templateUrl: './send-link-to-customer.html',
  styleUrls: ['./send-link-to-customer.css']
})
export class SendLinkToCustomer implements OnInit {
  form!: FormGroup;
  //nfig = MASTER_FORM_CONFIG;
  paymentDetails: Field[] = formConfig.linkPaymentDetails?.fields || [];
  customerLink: Field[] = formConfig.customerSendLink || [];

  // Add these flags for toggling sections open/closed
  showPaymentDetails = true;
  showCustomerLink = true;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const group: { [key: string]: any } = {};

    this.paymentDetails.forEach(field => {
      group[field.key] = ['', field.required ? Validators.required : []];
    });

    this.customerLink.forEach(field => {
      group[field.key] = ['', field.required ? Validators.required : []];
    });

    this.form = this.fb.group(group);
  }
  get config() {
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

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}

