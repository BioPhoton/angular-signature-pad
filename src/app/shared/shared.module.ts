import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ControlStateComponent} from './components/control-state/control-state.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ControlStateComponent],
  exports: [ControlStateComponent]
})
export class SharedModule { }
