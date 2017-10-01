import {ISignaturePadConfig} from './interfaces/signature-pad-config.interface';
export const GLOBAL_SIGNATURE_PAD_CONFIG: ISignaturePadConfig = {
  minWidth: 1,
  maxWidth: 3,
  throttle: 16,
  backgroundColor: 'rgba(0,0,0,0)',
  penColor: 'rgb(0,0,0)',
  velocityFilterWeight: 0.7
};
