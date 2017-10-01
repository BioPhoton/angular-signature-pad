import {
  AfterViewInit,
  Component,
  forwardRef,
  Host,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Renderer2,
  SkipSelf
} from '@angular/core';
import {ControlContainer, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ISignaturePadConfig} from '../../interfaces/signature-pad-config.interface';
import {GlobalSignaturePadConfig} from '../../tokens/default-config.token';
import {SignaturePadControlComponent} from '../signature-pad-control/signature-pad-control.component';

@Component({
  selector: 'signature-pad-card',
  templateUrl: './signature-pad-card.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SignaturePadCardComponent),
      multi: true
    }
  ]
})
export class SignaturePadCardComponent extends SignaturePadControlComponent implements OnChanges, OnInit, AfterViewInit {

  @Input()
  theme: string = 'raised';

  @Input()
  formControlName: string;

  control: FormControl;

  constructor(
    renderer: Renderer2,
    @Optional() @Host() @SkipSelf() parentFormContainer: ControlContainer,
    @Optional() @Inject(GlobalSignaturePadConfig) defaultConfig?: ISignaturePadConfig
  ) {
    super(renderer, parentFormContainer, defaultConfig);
  }

  clear() {
    this.signaturePad.clear();
    this.control.reset('');
  }

}
