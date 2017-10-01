import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignaturePadControlValidationComponent} from './signature-pad-control-validation.component';

const routes: Routes = [
  {
    path: '',
    component: SignaturePadControlValidationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignaturePadControlValidationRoutingModule { }
