import { Component } from '@angular/core';
import { LibriService } from '../../libri.service';
import { ActivatedRoute } from '@angular/router';
import { ILibri } from '../../Modules/i-libri';
import { StatoLibroService } from '../../stato-libro.service';
import { CarrelloService } from '../../carrello.service';

@Component({
  selector: 'app-dettaglio-libri',
  templateUrl: './dettaglio-libri.component.html',
  styleUrl: './dettaglio-libri.component.scss'
})
export class DettaglioLibriComponent {

  libro:ILibri | null = null;
constructor(private libroSvc:LibriService,
  private  router:ActivatedRoute,
  private carrelloSvc:CarrelloService,
  private stateSvc:StatoLibroService){}

  ngOnInit(){
   this.router.params.subscribe(params=>{
    const id = +params['id'];
    this.libro = this.libroSvc.getById(id);
   })


  }
addToCarrello():void{
    if(this.libro && this.libro.quantita > 0){
      this.carrelloSvc.addToCarrello(this.libro);

    }else{
      console.log('libro non disponibile')
    }
  }

}
