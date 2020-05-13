import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'smartCase',
})
export class SmartCasePipe implements PipeTransform {
  transform(value: string, ...args: any[]): any {
    const input: string = value || '';
    const splittedValue: string[] = input.split(/(?=[A-Z])/);
    // console.log(splittedValue);

    return splittedValue.join(' ');
  }
}
