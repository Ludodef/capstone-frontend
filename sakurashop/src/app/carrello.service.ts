import { Injectable } from '@angular/core';
import { ILibri } from './Modules/i-libri';
import { StatoLibroService } from './stato-libro.service';
import { AuthService } from './auth/auth.service';
import { LibriService } from './libri.service';

@Injectable({
  providedIn: 'root'
})
export class CarrelloService {
  private carrello: ILibri[] = [];

  getCarrello(): ILibri[] {
    return this.carrello;
  }

  addToCarrello(libro: ILibri): void {
    this.carrello.push(libro);
  }

  clearCarrello(): void {
    this.carrello = [];
  }

  purchaseCart(): ILibri[] {
    const purchasedBooks = [...this.carrello];
    this.clearCarrello();
    return purchasedBooks;
  }
}
