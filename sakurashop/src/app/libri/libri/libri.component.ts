import { Component } from '@angular/core';
import { ILibri } from '../../Modules/i-libri';
import { LibriService } from '../../libri.service';
import { AuthService } from '../../auth/auth.service';
import { CarrelloService } from '../../carrello.service';
import { StatoLibroService } from '../../stato-libro.service';

@Component({
  selector: 'app-libri',
  templateUrl: './libri.component.html',
  styleUrl: './libri.component.scss'
})
export class LibriComponent {
  libri:ILibri[] = [];
  isUser$ = this.authSvc.isUser$;
  currentUser:any


  constructor(
    private libriSvc:LibriService,
    public authSvc:AuthService,
    private carrelloSvc:CarrelloService,
    private stateSvc:StatoLibroService
  ){}


  ngOnInit(){
    this.libriSvc.libri$.subscribe(libri =>this.libri = libri)
    this.libriSvc.getAll().subscribe();
    this.currentUser = this.authSvc.getUserProfile()
  }


  elimina(id:number){
    this.libriSvc.delete(id).subscribe()
  }

  addToCarrello(libro:ILibri):void{
    if(libro.quantita > 0){
      this.carrelloSvc.addToCarrello(libro);

    }else{
      console.log('libro non disponibile')
    }
  }


}
