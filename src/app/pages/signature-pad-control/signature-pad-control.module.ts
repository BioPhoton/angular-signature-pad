import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignaturePadControlRoutingModule } from './signature-pad-control-routing.module';
import { SignaturePadControlComponent } from './signature-pad-control.component';
import {SharedModule} from '../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularSignaturePadModule} from 'angular-signature-pad';

@NgModule({
  imports: [
    CommonModule,
    SignaturePadControlRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AngularSignaturePadModule.forRoot()
  ],
  declarations: [SignaturePadControlComponent]
})
export class SignaturePadControlModule { }
