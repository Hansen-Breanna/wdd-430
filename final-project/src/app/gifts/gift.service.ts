import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Gift } from './gift.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GiftService {
  gifts: Gift[] = [];
  giftSelectedEvent = new EventEmitter<Gift>();
  giftListChangedEvent = new Subject<Gift[]>();
  maxGiftId: number;

  constructor(private http: HttpClient) {
    this.http.get<Gift[]>('http://localhost:3000/gifts')
      .subscribe(
        // success method
        (gifts: Gift[]) => {
          this.gifts = gifts;
          this.gifts = JSON.parse(JSON.stringify(this.gifts)).gifts;
          this.maxGiftId = this.getMaxId();
          this.gifts.sort((a, b) => {
            if (a.name > b.name) {
              return 1;
            } else {
              return -1;
            }
          });//sort the list of gifts
          var giftsListClone = this.gifts.slice(); // giftsListClone = gifts.slice()
          console.log(giftsListClone);
          this.giftListChangedEvent.next(giftsListClone);//emit the next gift list change event
          this.maxGiftId = this.getMaxId();
        },
        // error method
        (error: any) => {
          console.log(error.message); //print the error to the console
        });
  }

  getGiftsFromDB() {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    
    this.http.get<Gift[]>('http://localhost:3000/gifts',
      { headers: headers })
    .subscribe(
      // success method
      (gifts: Gift[]) => {
        this.gifts = gifts;
        this.gifts = JSON.parse(JSON.stringify(this.gifts)).gifts;
        this.maxGiftId = this.getMaxId();
        this.gifts.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          } else {
            return -1;
          }
        });//sort the list of gifts
        var giftsListClone = this.gifts.slice(); // giftsListClone = gifts.slice()
        this.giftListChangedEvent.next(giftsListClone);//emit the next gift list change event
        this.maxGiftId = this.getMaxId();
      },
      // error method
      (error: any) => {
        console.log(error.message); //print the error to the console
      });
  }

  getGifts(): Gift[] {
    return this.gifts.slice();
  }

  getGift(id: string): Gift {
    for (let gift of this.gifts) { // FOR each gift in the gifts list
      if (gift.id == id) { // IF gift.id equals the id THEN
        return gift; //RETURN gift
      } 
    }
    return null; // RETURN null 
  }

  getMaxId(): number {
    var maxId = 0;
    for (let gift of this.gifts) { //for each gift in the gifts list
      var currentId = parseInt(gift.id); //currentId = convert gift.id into a number
      if (currentId > maxId) { //if currentId > maxId then
        maxId = currentId; //maxId = currentId
      } //endIf
    } //endFor
    return maxId;
  }
  
  addGift(gift: Gift) {
    if (!gift) {
      return;
    }

    // make sure id of the new Gift is empty
    gift.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, gift: Gift }>('http://localhost:3000/gifts',
      gift,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new gift to gifts
          this.gifts.push(responseData.gift);
          this.sortAndSend();
        }
      );
  }

  sortAndSend() {
    this.gifts.sort((a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      } else {
        return -1;
      }
    });//sort the list of gifts
    this.giftListChangedEvent.next([...this.gifts]);
  }

  updateGift(originalGift: Gift, newGift: Gift) {
    if (!originalGift || !newGift) {
      return;
    }

    const pos = this.gifts.findIndex(c => c.id === originalGift.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Gift to the id of the old Gift
    newGift.id = originalGift.id;
    // newGift._id = originalGift._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/gifts/' + originalGift.id,
      newGift, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.gifts[pos] = newGift;
          this.giftListChangedEvent.next([...this.gifts]);
        }
      );
  }

  deleteGift(gift: Gift) {

    if (!gift) {
      return;
    }

    const pos = this.gifts.findIndex(c => c.id === gift.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/gifts/' + gift.id)
      .subscribe(
        (response: Response) => {
          this.gifts.splice(pos, 1);
          this.giftListChangedEvent.next([...this.gifts]);
        }
      );
  }

  storeGifts() {
    const gifts = JSON.stringify(this.getGifts());
    //Create a new HttpHeathis.sorters object that sets the Content-Type of the HTTP request to application/json.
    this.http.put('http://localhost:3000/gifts', gifts,
      {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }
    )
      .subscribe(response => {
        this.gifts.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          } else {
            return -1;
          }
        });
        var giftsListClone = this.gifts.slice();
        this.giftListChangedEvent.next(giftsListClone);
      });
  }
}
