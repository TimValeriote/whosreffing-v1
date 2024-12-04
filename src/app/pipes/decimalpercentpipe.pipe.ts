import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalpercentpipe'
})
export class DecimalpercentpipePipe implements PipeTransform {
  transform(value: number): string {
    if (isNaN(value)) return '';

    // Multiply by 100 to convert to percentage, round to one decimal place, and append percent sign
    return (value * 100).toFixed(1) + '%';
  }
}
