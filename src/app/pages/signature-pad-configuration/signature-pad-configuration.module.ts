import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignaturePadConfigurationRoutingModule } from './signature-pad-configuration-routing.module';
import { SignaturePadConfigurationComponent } from './signature-pad-configuration.component';
import {SharedModule} from '../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularSignaturePadModule} from 'angular-signature-pad';
import {GlobalSignaturePadConfig} from 'angular-signature-pad';

@NgModule({
  imports: [
    CommonModule,
    SignaturePadConfigurationRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AngularSignaturePadModule.forRoot(),
  ],
  declarations: [SignaturePadConfigurationComponent],
  providers: [
     { provide: GlobalSignaturePadConfig, useValue: { penColor: '#f00'}}
  ]
})
export class SignaturePadConfigurationModule { }
