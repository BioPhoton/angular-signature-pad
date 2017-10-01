import {AbstractControl} from '@angular/forms';

export function consistOfArrays(c: AbstractControl) {

  if (c.value) {
    const arrayConstructor = [].constructor;

    const error = {
      consistOfArrays: {
        numOfItemsThatAreNoArray: 0,
        message: 'Signature don\'t consist of arrays'
      }
    };

    if (c.value.constructor !== arrayConstructor) {
      return null;
    }

    const countOfNonArrays =
      c.value.filter(function (i) {
        // filter non arrays
        return i.constructor !== arrayConstructor;
      }).length;

    // return error if a non array is contained
    if (countOfNonArrays > 0) {
      error.consistOfArrays.numOfItemsThatAreNoArray = countOfNonArrays;
      return error;
    }
    return null;
  }
  return null;
}
