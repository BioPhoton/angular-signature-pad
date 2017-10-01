import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignaturePadCardComponent} from './signature-pad-card.component';

const routes: Routes = [
  {
    path: '',
    component: SignaturePadCardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignaturePadCardRoutingModule { }
