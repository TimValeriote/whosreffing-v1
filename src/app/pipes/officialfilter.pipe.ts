import { Pipe, PipeTransform } from '@angular/core';
import { Official } from "src/app/models/official/official.model";

@Pipe({
  name: 'officialfilter'
})
export class OfficialfilterPipe implements PipeTransform {

  transform(officials: any, term?: any): any {
    if( term === undefined) return officials;
    return officials.filter(function(official: any){
      let first = official.first_name.toLowerCase().includes(term.toLowerCase());
      let last = official.last_name.toLowerCase().includes(term.toLowerCase());
      return first + last;
    })
  }

}
