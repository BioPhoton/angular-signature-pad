import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function minLines(minLineCount: number): ValidatorFn {

  return (c: AbstractControl): null | ValidationErrors => {

    if (c.value) {
      const lineCount = c.value.length;

      if (lineCount < minLineCount) {
        return {
          minLines: {
            lineCount: lineCount,
            minLineCount: minLineCount,
            message: `Signature must have a minimum line count of ${minLineCount}.`
          }
        };
      }
      return null;
    }
    return null;
  }
}
