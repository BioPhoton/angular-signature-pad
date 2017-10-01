export interface ISignaturePadConfig {
  // (float or function) Radius of a single dot.
  dotSize?: number | Function;
  // (float) Minimum width of a line. Defaults to 0.5.
  minWidth?: number;
  // (float) Maximum width of a line. Defaults to 2.5.
  maxWidth?: number;
  // (integer) Draw the next point at most once per every x milliseconds. Set it to 0 to turn off throttling. Defaults to 16.
  throttle?: number;
  // (string) Color used to clear the background.
  // Can be any color format accepted by context.fillStyle.
  // Defaults to "rgba(0,0,0,0)" (transparent black).
  // Use a non-transparent color e.g. "rgb(255,255,255)" (opaque white) if you'd like to save signatures as JPEG images.
  backgroundColor?: string;
  // (string) Color used to draw the lines. Can be any color format accepted by context.fillStyle. Defaults to "black".
  penColor?: string;
  // (float) Weight used to modify new velocity based on the previous velocity. Defaults to 0.7.
  velocityFilterWeight?: number;
  //  (function) Callback when stroke begin.
  onBegin?: (value: any) => {};
  // (function) Callback when stroke end.
  onEnd?: (value: any) => {};
}
