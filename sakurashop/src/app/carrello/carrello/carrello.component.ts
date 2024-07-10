import { Component } from '@angular/core';
import { ILibri } from '../../Modules/i-libri';
import { LibriService } from '../../libri.service';
import { CarrelloService } from '../../carrello.service';
import { StatoLibroService } from '../../stato-libro.service';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrl: './carrello.component.scss'
})
export class CarrelloComponent {

  carrello:ILibri[]= [];

  constructor (private librisvc:LibriService, private carrelloSvc:CarrelloService,private statoLibroSvc:StatoLibroService){}

  ngOnInit(){
    this.carrello = this.carrelloSvc.getCarrello();


  }

  clearCarrello():void{
    this.carrelloSvc.clearCarrello();
    this.carrello = []
    }


    acquistaCarrello(){
      const purchasedBooks= this.carrelloSvc.purchaseCart();
      purchasedBooks.forEach(book => {
        const newQuantity = book.quantita - 1;
        this.librisvc.updateLibroQuantity(book.id , newQuantity).subscribe(updatedProduct => {
          this.statoLibroSvc.updateLibroQuantity(book.id , updatedProduct.quantita)
        });
        this.carrello = []
      })
    }
}
