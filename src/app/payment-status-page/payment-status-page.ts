import { Component } from '@angular/core';
import formConfig from '../../assets/form.config.json';
import { CommonModule } from '@angular/common';

type StatusType = 'failed' | 'success';
@Component({
  selector: 'app-payment-status-page',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './payment-status-page.html',
  styleUrl: './payment-status-page.css'
})
export class PaymentStatusPage {
paymentStatusData = formConfig?.paymentStatus || [];
 // If you want, you can @Input() statusData and supply it from parent.
 statusData = this.paymentStatusData;
 get buttonsForStatus() {
    const status = this.statusData?.status as StatusType;
    if (status && this.statusData?.buttons) {
      return this.statusData.buttons[status] || [];
    }
    return [];
  }
 repay() {
   // Emit event or call parent handler to retry payment etc.
   window.location.reload(); // or any logic to go back to payment or refresh
 }
 
 handleButtonClick(action: string) {
  switch (action) {
    case 'repay':
      this.repay();
      break;
    case 'download':
      //this.download();
      break;
    case 'backToPolicy':
      //this.backToPolicy();
      break;
    case 'share':
      //this.share();
      break;
  }
}

}
