import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function minPointsInEachNLines(minPointCount: number, minLineCount: number): ValidatorFn {

  return (c: AbstractControl): null | ValidationErrors => {

    if (c.value) {
      const arrayConstructor = [].constructor;
      if (c.value.constructor !== arrayConstructor) {
        return null;
      }
      const lineCountWithValidPointCount = c.value.filter((i) => {
        if (i.constructor !== arrayConstructor) {
          return true;
        }
        return i.length >= minPointCount;
      }).length;

      if (lineCountWithValidPointCount < minLineCount) {
        return {
          minPointsInNLines: {
            pointCount: lineCountWithValidPointCount,
            minPointCount: minPointCount,
            message: `Signature must have at least ${minPointCount} points in at least ${minLineCount} lines.`
          }
        };
      }
      return null;
    }
    return null;
  }
}

