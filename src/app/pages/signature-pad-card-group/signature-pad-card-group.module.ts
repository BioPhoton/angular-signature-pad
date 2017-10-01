import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';

import {SignaturePadCardGroupRoutingModule} from './signature-pad-card-group-routing.module';
import {SignaturePadCardGroupComponent} from './signature-pad-card-group.component';
import {AngularSignaturePadModule} from 'angular-signature-pad';

@NgModule({
  imports: [
    CommonModule,
    SignaturePadCardGroupRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AngularSignaturePadModule.forRoot()
  ],
  declarations: [SignaturePadCardGroupComponent]
})
export class SignaturePadCardGroupModule { }
