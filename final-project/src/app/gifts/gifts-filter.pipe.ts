import { Pipe, PipeTransform } from '@angular/core';
import { Gift } from './gift.model';

@Pipe({
  name: 'giftsFilter'
})
export class GiftsFilterPipe implements PipeTransform {

  transform(gifts: Gift[], term: string): any {
    let filteredGifts: Gift[] =[];  
    if (term && term.length > 0) {
       filteredGifts = gifts.filter(
          (gift:Gift) => gift.name.toLowerCase().includes(term.toLowerCase())
       );
    }
    if (filteredGifts.length < 1){
       return gifts;
    }
    return filteredGifts;
  }

}
