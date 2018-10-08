import {AbstractControl, ValidationErrors} from '@angular/forms';

export function consistOfObjects(c: AbstractControl): null | ValidationErrors {
  if (c.value) {
    const objectConstructor = {}.constructor;
    const arrayConstructor = [].constructor;

    const error = {
      consistOfObjects: {
        numOfItemsThatAreNoObject: 0,
        message: 'Signature segments don\'t contain of objects'
      }
    };

    if (c.value.constructor !== arrayConstructor) {
      return null;
    }

    const countOfNonObjects =
      c.value.reduce((nonObjCount, line) => {
        if (line.constructor !== arrayConstructor) {
          return false;
        }
        nonObjCount += line.filter((i) => {
          // filter non objects
          return i.constructor !== objectConstructor;
        }).length;
      }, 0);

    // return error if a non object is contained
    if (countOfNonObjects > 0) {
      error.consistOfObjects.numOfItemsThatAreNoObject = countOfNonObjects;
      return error;
    }
    return null;
  }
  return null;
}
