import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignaturePadRoutingModule } from './signature-pad-routing.module';
import { SignaturePadComponent } from './signature-pad.component';
import {SharedModule} from '../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularSignaturePadModule} from 'angular-signature-pad';

@NgModule({
  imports: [
    CommonModule,
    SignaturePadRoutingModule,
    AngularSignaturePadModule.forRoot(),
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [SignaturePadComponent]
})
export class SignaturePadModule { }
