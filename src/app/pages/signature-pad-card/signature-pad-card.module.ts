import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignaturePadCardRoutingModule } from './signature-pad-card-routing.module';
import { SignaturePadCardComponent } from './signature-pad-card.component';
import {AngularSignaturePadModule} from 'angular-signature-pad';
import {SharedModule} from '../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SignaturePadCardRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AngularSignaturePadModule.forRoot()
  ],
  declarations: [SignaturePadCardComponent]
})
export class SignaturePadCardModule { }
