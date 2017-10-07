import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import SignaturePad from 'signature_pad';
import {ISignaturePadConfig} from '../../interfaces/signature-pad-config.interface';
import {GlobalSignaturePadConfig} from '../../tokens/global-config.token';

@Component({
  selector: 'signature-pad',
  template: `
    <canvas
      tabindex="0"
      class="signature-pad-canvas"
      width="400"
      height="200"
      #signatureCanvas>
    </canvas>
  `
})
export class SignaturePadComponent implements OnInit, OnChanges, AfterViewInit {

  protected container: HTMLElement;

  @ViewChild('signatureCanvas')
  protected canvasRef: ElementRef;
  protected canvas: HTMLCanvasElement;

  protected signaturePad;

  protected value: any = [];

  @Output()
  protected valueChange: EventEmitter<any> = new EventEmitter<any[]>();

  public disabled: boolean;
  public focus: boolean;

  @Input()
  protected config: ISignaturePadConfig;

  onEndWrapper = (value) => {
    // configurable onEnd
    if (this.isObject(this.config)
      && 'onEnd' in this.config
      && typeof this.config.onEnd === 'function') {
      this.config.onEnd(value);
    }

    // default onEnd function
    // sync form control
    this.handleInput(this.signaturePad.toData());
  }

  onBeginWrapper = (value) => {
    // configurable onBegin
    if (this.isObject(this.config)
      && 'onBegin' in this.config
      && typeof this.config.onBegin === 'function') {
      this.config.onBegin(value);
    }

    // default onBegin function here
  }

  constructor(
    protected renderer: Renderer2,
    @Optional() @Inject(GlobalSignaturePadConfig) private defaultConfig?: ISignaturePadConfig
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('config' in changes) {
      this.updateConfig(changes.config.currentValue);
    }
  }

  ngOnInit() {
    this.initializeSignaturePad();
  }

  ngAfterViewInit(): void {
    // listen to focus
    this.renderer.listen(this.canvas, 'focus', ($event) => {
      this.handleFocus(true);
    });

    // listen to blur
    this.renderer.listen(this.canvas, 'blur', ($event) => {
      this.handleFocus(false);
    });

    // handle resize
    this.resizeSignaturePad();
    this.renderer.listen('window', 'resize', ($event) => {
      this.resizeSignaturePad();
    });
  }

  getValue(): number {
    return this.value;
  }

  setValue(signatureData: any) {
    if (signatureData && signatureData.constructor === [].constructor) {
      this.value = [...signatureData];
    } else {
      this.value = null;
    }

    this.valueChange.next(this.value);
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.renderViewDisabled();
  }

  clear() {
    this.signaturePad.clear();
    this.setValue(null);
  }

  resizeSignaturePad = (): void => {
    if (this.canvas) {

      this.resizeCanvas();

      // When the width or height of a canvas gets modified,
      // it will be automatically cleared by the browser.
      // How ever the data of the signature are still stores in the model value => this.value.
      // Because of this we have to reassign the value from this.value to the signaturePad.
      this.renderViewValue(this.value);
    }
  }

  /*
   * Depending on the compositionMode and the composing state it
   */
  protected handleInput(signatureData: any): void {
    this.setValue(signatureData);
  }

  /*
   * Sets the internal focus state and renders it to the view
   */
  public handleFocus(isFocus: boolean): void {
    this.focus = isFocus;
    this.renderViewFocus();
  }

  // render functions ==================================================================

  renderViewDisabled() {
    this.renderer.setProperty(this.canvas, 'disabled', this.disabled);

    if (this.disabled) {
      this.renderer.addClass(this.canvas, 'disabled');
    } else {
      this.renderer.removeClass(this.canvas, 'disabled');
    }
  }

  renderViewFocus(): void {
    this.renderer.setProperty(this.canvas, 'focus', this.focus);

    if (this.focus) {
      this.renderer.addClass(this.canvas, 'focus');
    } else {
      this.renderer.removeClass(this.canvas, 'focus');
    }
  }

  renderViewValue(signatureData: any) {
    if (signatureData && signatureData.constructor === [].constructor) {
      this.signaturePad.fromData([...signatureData]);
    } else {
      this.signaturePad.clear();
    }
  }


  // helper ==================================================================

  protected updateConfig(config?: ISignaturePadConfig): void {

    if (!config || config.constructor !== {}.constructor || !this.signaturePad) {
      return;
    }

    if ('dotSize' in config && config.dotSize) {
      this.signaturePad.dotSize = config.dotSize;
    }

    if ('minWidth' in config && config.minWidth >= 0) {
      this.signaturePad.minWidth = config.minWidth;
      console.log('minWidth', this.signaturePad.minWidth, config.minWidth);
    }

    if ('maxWidth' in config && config.maxWidth >= 0) {
      this.signaturePad.maxWidth = config.maxWidth;
    }

    if ('throttle' in config && config.throttle >= 0) {
      this.signaturePad.throttle = config.throttle;
    }

    if ('backgroundColor' in config && config.backgroundColor) {
      this.signaturePad.backgroundColor = config.backgroundColor;
      this.resizeSignaturePad();
    }

    if ('penColor' in config && config.penColor) {
      this.signaturePad.penColor = config.penColor;
    }

    if ('velocityFilterWeight' in config && config.velocityFilterWeight >= 0) {
      this.signaturePad.velocityFilterWeight = config.velocityFilterWeight;
    }

    // callbacks are registered when creating signaturePad instance in initializeSignaturePad
    // onBegin
    // onEnd

  }

  protected resizeCanvas() {
    interface ICssWidthHeight {top: number; bottom: number; left: number; right: number; fullHeight: number; fullWidth: number;
    }

    // When zoomed out to less than 100%, for some very strange reason,
    // some browsers report devicePixelRatio as less than 1
    // and only part of the canvas is cleared then.
    // So we will have at least 1 as ration.
    const ratio = 1; // @TODO fix offset on ratios > 1. => Math.max(window.devicePixelRatio || 1, 1);

    // information needed to calculate the available width and height
    const canvasStyles = window.getComputedStyle(this.canvas, null);
    const canvasBorder: ICssWidthHeight = {} as ICssWidthHeight;
    canvasBorder.top = parseInt(canvasStyles.borderTopWidth, null) || 0;
    canvasBorder.bottom = parseInt(canvasStyles.borderBottomWidth, null) || 0;
    canvasBorder.left = parseInt(canvasStyles.borderLeftWidth, null) || 0;
    canvasBorder.right = parseInt(canvasStyles.borderRightWidth, null) || 0;
    canvasBorder.fullHeight = canvasBorder.top + canvasBorder.bottom;
    canvasBorder.fullWidth = canvasBorder.left + canvasBorder.right;

    const containerStyles = window.getComputedStyle(this.container, null);
    const parentPadding: ICssWidthHeight = {} as ICssWidthHeight;
    parentPadding.top = parseInt(containerStyles.paddingTop, null) || 0;
    parentPadding.bottom = parseInt(containerStyles.paddingBottom, null) || 0;
    parentPadding.left = parseInt(containerStyles.paddingLeft, null) || 0;
    parentPadding.right = parseInt(containerStyles.paddingRight, null) || 0;
    parentPadding.fullHeight = parentPadding.top + parentPadding.bottom;
    parentPadding.fullWidth = parentPadding.left + parentPadding.right;

    const withToSubtract = parentPadding.fullWidth + canvasBorder.fullWidth;
    const heightToSubtract = parentPadding.fullHeight + canvasBorder.fullHeight;

    // resize canvas

    // get most right point of signature
    let signatureWidth = 0;
    if (this.value && [].constructor === this.value.constructor) {
      signatureWidth = this.value
        .reduce((concated, arr) => concated.concat(arr), [])
        .reduce((mR, segment) => mR < segment.x ? segment.x : mR, 0);
    }

    // get most left point of signature
    let signatureHeight = 0;
    if (this.value && [].constructor === this.value.constructor) {
      signatureHeight = this.value
        .reduce((concated, arr) => concated.concat(arr), [])
        .reduce((mL, segment) => mL < segment.y ? segment.y : mL, 0);
    }

    // calc new width and height
    const newCanvasWidth = Math.max(this.container.clientWidth, signatureWidth);
    const newCanvasHeight = Math.max(this.container.clientHeight, signatureHeight);

    // adopt canvas scales
    this.canvas.width = (newCanvasWidth - withToSubtract) * ratio;
    this.canvas.height = (newCanvasHeight - heightToSubtract - 6) * ratio; // @TODO find the 6px
    this.canvas.getContext('2d').scale(ratio, ratio);

    // adopt show/hide scroll of vertical canvas container
    this.container.style.overflowX = 'inherit';
    if (this.canvas.width + withToSubtract > this.container.clientWidth) {
      this.container.style.overflowX = 'scroll';
    }

    // adopt show/hide scroll of horizontal canvas container
    this.container.style.overflowY = 'inherit';
    if (this.canvas.height > this.container.clientHeight) {
      this.container.style.overflowY = 'scroll';
    }

    // When the width or height of a canvas gets modified,
    // it will be automatically cleared by the browser.
    // So we have to call signaturePad.clear() to make sure
    // that signaturePad.isEmpty() returns correct value in this case.
    this.signaturePad.clear();
  }

  protected initializeSignaturePad() {
    this.canvas = this.canvasRef.nativeElement;
    this.container = this.canvas.parentElement;
    this.container.className = this.container.className + ' signature-pad';

    this.signaturePad = new SignaturePad(this.canvas, this.defaultConfig);
    // onBegin
    this.signaturePad.onBegin = this.onBeginWrapper;
    // onEnd
    this.signaturePad.onEnd = this.onEndWrapper;

    this.updateConfig(this.config);
  }

  protected isObject(val: any) {
    const objectConstructor = {}.constructor;
    return val && val.constructor === objectConstructor;
  }

}
