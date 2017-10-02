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
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import {ISignaturePadConfig} from '../../interfaces/signature-pad-config.interface';
import {GlobalSignaturePadConfig} from '../../tokens/default-config.token';
import {SignaturePadComponent} from '../signature-pad/signature-pad.component';

@Component({
  selector: 'signature-pad-control',
  template: `
    <canvas
      tabindex="0"
      class="signature-pad-canvas"
      width="400"
      height="200"
      #signatureCanvas>
    </canvas>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SignaturePadControlComponent),
      multi: true
    }
  ]
})
export class SignaturePadControlComponent extends SignaturePadComponent implements OnChanges, OnInit, AfterViewInit, ControlValueAccessor {

  @Input()
  formControlName: string;

  control: FormControl;

  onTouch = () => {
  }

  onModelChange = (value: any) => {
  }

  constructor(renderer: Renderer2,
              @Optional() @Host() @SkipSelf() private parentFormContainer: ControlContainer,
              @Optional() @Inject(GlobalSignaturePadConfig) defaultConfig?: ISignaturePadConfig) {
    super(renderer, defaultConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.parentFormContainer) {
      this.control = this.parentFormContainer['form'].controls[this.formControlName];
    }
  }

  writeValue(signatureData: any): void {
   this.renderViewValue(signatureData);
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  // overrides

  /**
   *
   * @param isFocus
   */
  handleFocus(isFocus: boolean): void {
    super.handleFocus(isFocus);
    if (!isFocus) {
      this.onTouch();
    }
  }

  /**
   *
   * @param signatureData
   */
  handleInput(signatureData: any) {
    super.handleInput(signatureData);
    this.onModelChange(signatureData);
  }

  clear() {
    super.clear();
    this.onModelChange([]);
  }

}
