import { Injectable } from '@angular/core';
import { ILibri } from './Modules/i-libri';

@Injectable({
  providedIn: 'root'
})
export class CarrelloService {

  private carrello:ILibri[]=[];


  getCarrello():ILibri[]{
    return this.carrello
  }
  addToCarrello(carrello:ILibri):void{
    this.carrello.push(carrello)
  }

  clearCarrello():void{
    this.carrello=[]
  }
  purchaseCart():ILibri[]{
    const purchasedBooks = [...this.carrello]
    this.clearCarrello()
    return purchasedBooks
  }
}
