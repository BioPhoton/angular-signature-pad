import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignaturePadControlValidationRoutingModule } from './signature-pad-control-validation-routing.module';
import { SignaturePadControlValidationComponent } from './signature-pad-control-validation.component';
import {SharedModule} from '../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularSignaturePadModule} from 'angular-signature-pad';

@NgModule({
  imports: [
    CommonModule,
    SignaturePadControlValidationRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AngularSignaturePadModule.forRoot(),
  ],
  declarations: [SignaturePadControlValidationComponent]
})
export class SignaturePadControlValidationModule { }
