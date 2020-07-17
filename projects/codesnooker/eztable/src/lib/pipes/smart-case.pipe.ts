import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'smartCase',
})
export class SmartCasePipe implements PipeTransform {
  transform(value: string, disabled: boolean = false): any {
    const input: string = value || '';

    if (disabled) {
      return input;
    }

    const cloned: string = value.toUpperCase();

    if (input === cloned) {
      return input;
    }

    const splittedValue: string[] = input.split(/(?=[A-Z])/);
    const modified = splittedValue.map((c) => {
      return c.replace(/^./, c[0].toUpperCase());
    });

    return modified.join(' ');
  }
}
