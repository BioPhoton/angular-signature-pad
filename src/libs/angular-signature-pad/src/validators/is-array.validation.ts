import {AbstractControl, ValidationErrors} from '@angular/forms';

export function isArray(c: AbstractControl): null | ValidationErrors {
  if (c.value) {
    const error = {
      isArray: {
        message: 'signature is no array'
      }
    };

    const arrayConstructor = [].constructor;
    if (c.value.constructor !== arrayConstructor) {
      return error;
    }
  }
  return null;
}
