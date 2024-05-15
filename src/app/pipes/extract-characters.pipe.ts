import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractCharacters',
})
export class ExtractCharactersPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/^\d+/, '');
  }
}
