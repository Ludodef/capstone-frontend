import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ILibri } from './Modules/i-libri';
import { LibriService } from './libri.service';

@Injectable({
  providedIn: 'root'
})
export class StatoLibroService {

  private libriSubject: BehaviorSubject<ILibri[]> = new BehaviorSubject<ILibri[]>([]);
  public libri$: Observable<ILibri[]> = this.libriSubject.asObservable();

  constructor(private libroSvc: LibriService) {
    this.loadInitialData();
  }

  private loadInitialData():void{
    this.libroSvc.getAll().subscribe({
      next: (libri) =>{
        this.libriSubject.next(libri)
      },
      error: (err) => console.error('Error fetching libri', err)
    })
  }



updateLibroQuantity(id:number, newQuantity:number): void{
  const currentLibri = this.libriSubject.getValue();
  const updatedLibri = currentLibri.map(libro => {
    if(libro.id === id){
      return {...libro,quantita:newQuantity,isAvaible:newQuantity > 0 }
    }
    return libro;

  });
  this.libriSubject.next(updatedLibri);
}

addLibro(libro:ILibri):void{
  const currentLibri = this.libriSubject.getValue();
  this.libriSubject.next([...currentLibri, libro]);
}

removeLibro(id:number):void{
  const currentLibri = this.libriSubject.getValue();
  const updatedLibri = currentLibri.filter(libro => libro.id!== id);
  this.libriSubject.next(updatedLibri);
}

}
