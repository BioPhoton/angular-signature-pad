import {InjectionToken} from '@angular/core';
import {ISignaturePadConfig} from '../interfaces/signature-pad-config.interface';

export const GlobalSignaturePadConfig = new InjectionToken<ISignaturePadConfig>('Global SignaturePad default config');
