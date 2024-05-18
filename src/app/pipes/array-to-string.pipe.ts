import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayToString',
})
export class ArrayToStringPipe implements PipeTransform {
  transform(value: any[], key?: string): string {
    if (!Array.isArray(value)) {
      return '';
    }

    if (key) {
      return value.map((item) => item[key]).join(', ');
    }

    return value.join(', ');
  }
}
