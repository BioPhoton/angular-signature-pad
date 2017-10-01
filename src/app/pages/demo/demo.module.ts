import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoComponent } from './demo.component';
import {DemoRouterModule} from './demo.routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {AngularSignaturePadModule} from 'angular-signature-pad';

@NgModule({
  imports: [
    CommonModule,
    DemoRouterModule,
    AngularSignaturePadModule.forRoot(),
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [DemoComponent]
})
export class DemoModule { }
