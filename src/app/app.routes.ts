import { Routes } from '@angular/router';
import { DynamicFormComponent } from './payment/payment';
 
export const routes: Routes = [
  { path: '', redirectTo: '/new', pathMatch: 'full' },
  //{ path: 'new', component: DynamicFormComponent }, // your new component route
   {
    path: 'new',
    loadComponent: () =>
      import('./payment/payment').then(
        (m) => m.DynamicFormComponent
      ),
  },
  // other routes...
];