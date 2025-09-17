import { ChangeDetectorRef, Component } from '@angular/core';
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
}

@Component({
  selector: 'app-bank-guarantee',
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule,FormsModule,BsDatepickerModule],
  templateUrl: './bank-guarantee.html',
  styleUrl: './bank-guarantee.css'
})
export class BankGuarantee {
selectedCityId: number | null = null;
  form!: FormGroup;

  // Adapted to your new JSON structure
  customerLink: Field[] = formConfig.bankGuaranteePayment || [];

  showPaymentDetails = true;
  showCustomerLink = true;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

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
ngAfterViewInit() {
  setTimeout(() => {
    this.cdr.detectChanges();
  });
}



  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form Values:', this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
