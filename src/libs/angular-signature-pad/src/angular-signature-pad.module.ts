import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {SignaturePadCardGroupComponent} from './components/signature-pad-card-group/signature-pad-card-group.component';
import {SignaturePadCardComponent} from './components/signature-pad-card/signature-pad-card.component';
import {SignaturePadControlComponent} from './components/signature-pad-control/signature-pad-control.component';
import {SignaturePadComponent} from './components/signature-pad/signature-pad.component';
import {ObjToArrayPipe} from './pipes/obj-to-array.pipe';
import {GLOBAL_SIGNATURE_PAD_CONFIG} from './signature-pad-global-config';
import {GlobalSignaturePadConfig} from './tokens/default-config.token';

export {GlobalSignaturePadConfig} from './tokens/default-config.token';
export {GLOBAL_SIGNATURE_PAD_CONFIG} from './signature-pad-global-config';

export {isArray} from './validators/is-array.validation';
export {consistOfArrays} from './validators/consists-of-arrays.validation';
export {consistOfObjects} from './validators/constists-of-object.validation';
export {minLines} from './validators/min-lines.validation';
export {minPointsInEachNLines} from './validators/min-points-in-each-n-lines.validator';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [SignaturePadComponent, SignaturePadControlComponent, SignaturePadCardComponent, SignaturePadCardGroupComponent, ObjToArrayPipe],
  exports: [SignaturePadComponent, SignaturePadControlComponent, SignaturePadCardComponent, SignaturePadCardGroupComponent]
})
export class AngularSignaturePadModule {
  static forRoot(): ModuleWithProviders {
    return {
      providers: [
        ObjToArrayPipe,
        {
          provide: GlobalSignaturePadConfig,
          useValue: GLOBAL_SIGNATURE_PAD_CONFIG
        }
      ],
      ngModule: AngularSignaturePadModule
    };
  }
}
