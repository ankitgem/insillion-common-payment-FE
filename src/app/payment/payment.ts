import { Component, OnInit, ChangeDetectorRef, inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { CdPayment } from '../cd-payment/cd-payment';
import { SendLinkToCustomer } from '../send-link-to-customer/send-link-to-customer';
import { PaymentStatusPage } from '../payment-status-page/payment-status-page';
import formConfig from '../../assets/form.config.json';
import Swal from 'sweetalert2';
import { ToastrModule, provideToastr, ToastrService } from 'ngx-toastr';
import { CashPayment } from '../cash-payment/cash-payment';
import { ChequePayment } from '../cheque-payment/cheque-payment';
import { BankDebt } from '../bank-debt/bank-debt';
import { Existing } from '../existing/existing';
import { BankGuarantee } from '../bank-guarantee/bank-guarantee';
import { InsillionReceipt } from '../insillion-receipt/insillion-receipt';
import { ApiService } from '../services/api.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


interface FormField {
  type: string;
  name?: string;
  label?: string;
  text?: string;
  value?: any;
  items?: string[];
  options?: { key: string; value: string; icon: string; }[];
  link?: { text: string; href: string };
  validators?: { requiredTrue?: boolean };
  errors?: { [key: string]: string };
  breakupLink?: { text: string; href: string };
}

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  templateUrl: './payment.html',
  imports: [CommonModule, ReactiveFormsModule, CdPayment, SendLinkToCustomer, PaymentStatusPage,ToastrModule,CashPayment,ChequePayment,BankDebt,Existing,BankGuarantee,InsillionReceipt,BsDatepickerModule],
  styleUrls: ['./payment.css'],
})
export class DynamicFormComponent implements OnInit {
  readonly apiService = inject(ApiService);
  formConfig: { fields: FormField[] } = formConfig.dynamicPaymentForm;
  filteredButtons: FormField[] = [];

  form!: FormGroup;
  selectedPayment = '';

  breadcrumbField: FormField | null = null;
  titleField: FormField | null = null;
  selectField: FormField | null = null;
  summaryField: FormField | null = null;
  buttonField: FormField | null = null;
  showPaymentStatus = false;
  buttonFields = [
  { type: 'button', name: 'makePayment', label: 'Make Payment', showForPayment: ['cdPayment'] },
  { type: 'button', name: 'verifyPayment', label: 'Verify Payment' , showForPayment: ['sendLink'] },
  { type: 'button', name: 'generatePaymentLink', label: 'Generate Payment Link' , showForPayment: ['sendLink'] }
];
@ViewChild(CdPayment) cdPaymentComponent?: CdPayment;
  @ViewChild(SendLinkToCustomer) sendLinkComponent?: SendLinkToCustomer;
  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
  const val = this.getSelectField()?.value;
  // Only assign if you want a default, else empty string
  this.selectedPayment = '';
    this.updateFilteredButtons();


  this.breadcrumbField = this.formConfig.fields.find(f => f.type === 'breadcrumb') ?? null;
  this.titleField = this.formConfig.fields.find(f => f.type === 'title') ?? null;
  this.selectField = this.formConfig.fields.find(f => f.type === 'select') ?? null;
  this.summaryField = this.formConfig.fields.find(f => f.type === 'summary') ?? null;
  this.buttonField = this.formConfig.fields.find(f => f.type === 'button') ?? null;

  this.initForm();
}


  initForm() {
    const groupConfig: { [key: string]: any } = {};
    this.formConfig.fields.forEach((field: FormField) => {
      if (field.name) {
        const validators = field.validators?.requiredTrue ? [Validators.requiredTrue] : [];
        groupConfig[field.name] = [field.value ?? (field.type === 'checkbox' ? false : ''), validators];
      }
    });
    this.form = this.fb.group(groupConfig);
  }

  get termsField(): FormField | null {
    return this.formConfig.fields.find(f => f.name === 'terms') || null;
  }

  get checkboxFields(): FormField[] {
    return this.formConfig.fields.filter(f => f.type === 'checkbox' && typeof f.name === 'string');
  }
  updateFilteredButtons() {
    console.log("ankit",this.selectedPayment)
  if (this.selectedPayment === 'sendLink') {
    console.log("ank",this.selectedPayment)
    this.filteredButtons = this.buttonFields.filter(btn =>
      btn.name === 'verifyPayment' || btn.name === 'generatePaymentLink'
    );
  } else {
    this.filteredButtons = this.buttonFields.filter(btn => btn.name === 'makePayment');
  }
  console.log("filterbuttons",this.filteredButtons)
}


  getSelectField(): FormField | null {
    return this.formConfig.fields.find(f => f.type === 'select') || null;
  }

  getSummaryField(): FormField | null {
    return this.formConfig.fields.find(f => f.type === 'summary') || null;
  }

  getButtonField(): FormField | null {
    return this.formConfig.fields.find(f => f.type === 'button') || null;
  }

  selectPayment(key: string): void {
    this.selectedPayment = key;
    this.updateFilteredButtons();
    this.cd.detectChanges();
  }
  handleButtonClick(buttonName:any) {
  if (buttonName === 'makePayment') {
    console.log("make");
    this.makePayment();
  } else if (buttonName === 'verifyPayment') {
    console.log("veri");
    this.verifyPayment();
  } else if (buttonName === 'generatePaymentLink') {
    console.log("gen");
    this.generatePaymentLink();
  }
}

  // makePayment(): void {
  //   if (this.form.valid) {
  //     console.log('Selected Payment:', this.selectedPayment);
  //     console.log('Form values:', this.form.value);

  //     // Show Payment Status and hide form UI
  //     this.showPaymentStatus = true;

  //     // Trigger change detection to update UI immediately
  //     this.cd.detectChanges();

  //   } else {
  //     this.form.markAllAsTouched();
  //   }
  // }
  makePayment() {
    this.form.markAllAsTouched();
    let valid = this.form.valid;

    if (this.selectedPayment === 'cdPayment' && this.cdPaymentComponent) {
      this.cdPaymentComponent.markAllAsTouched();
      valid = valid && this.cdPaymentComponent.isValid();
    } else if (this.selectedPayment === 'sendLink' && this.sendLinkComponent) {
      this.sendLinkComponent.markAllAsTouched();
      valid = valid && this.sendLinkComponent.isValid();
    }
    // handle other payments similarly...

    if (valid) {
      const parentData = this.form.value;
      let paymentData = {};
      if (this.selectedPayment === 'cdPayment' && this.cdPaymentComponent)
        paymentData = this.cdPaymentComponent.getValue();
      else if (this.selectedPayment === 'sendLink' && this.sendLinkComponent)
        paymentData = this.sendLinkComponent.getValue();
      // other payment data...

      const fullData = { ...parentData, ...paymentData };
      console.log('Collected Payment Data:', fullData);

      this.showPaymentStatus = true;
      this.cd.detectChanges();
    }
  }

  verifyPayment(): void {
    if (this.form.valid) {
      console.log('Selected Payment:', this.selectedPayment);
      console.log('Form values:', this.form.value);

      // Show Payment Status and hide form UI
      this.showPaymentStatus = true;

      // Trigger change detection to update UI immediately
      this.cd.detectChanges();

    } else {
      this.form.markAllAsTouched();
    }
  }
  generatePaymentLink(): void {
    console.log("aman")
  const email = 'vishal.taneja@gmail.com';
  const phone = '9876532145';

  Swal.fire({
    icon: 'success',
    title: 'Success',
    html: `Email/SMS sent to <b>${email}</b> ${phone}`,
    confirmButtonText: 'OK',
  });
}

}
