import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'objToArray'
})
export class ObjToArrayPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const objCtor = {}.constructor;
    if (value && value.constructor === objCtor) {
      return Object.keys(value)
        .map(key => {
          return {key, value: value[key]};
        });
    }
    return value;
  }

}
