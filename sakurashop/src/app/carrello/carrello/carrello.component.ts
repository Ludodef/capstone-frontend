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
  totale: number = 0;

  constructor (private librisvc:LibriService, private carrelloSvc:CarrelloService,private statoLibroSvc:StatoLibroService){}

  ngOnInit(){
    this.carrello = this.carrelloSvc.getCarrello();
    this.calcolaTotale();


  }
  calcolaTotale(): void {
    this.totale = this.carrello.reduce((acc, libri) => acc + libri.prezzo, 0);
  }


  clearCarrello():void{
    this.carrelloSvc.clearCarrello();
    this.carrello = [];
    this.totale = 0
    }


    acquistaCarrello(){
      const purchasedBooks= this.carrelloSvc.purchaseCart();
      purchasedBooks.forEach(book => {
        const newQuantity = book.quantita - 1;
        this.librisvc.updateLibroQuantity(book.id , newQuantity).subscribe(updatedProduct => {
          this.statoLibroSvc.updateLibroQuantity(book.id , updatedProduct.quantita)
        });
        this.carrello = [];
        this.totale = 0;
      })
    }
}
