import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignaturePadConfigurationComponent} from './signature-pad-configuration.component';

const routes: Routes = [
  {
    path: '',
    component: SignaturePadConfigurationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignaturePadConfigurationRoutingModule { }
