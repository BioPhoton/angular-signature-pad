import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignaturePadControlComponent} from './signature-pad-control.component';

const routes: Routes = [
  {
    path: '',
    component: SignaturePadControlComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignaturePadControlRoutingModule { }
