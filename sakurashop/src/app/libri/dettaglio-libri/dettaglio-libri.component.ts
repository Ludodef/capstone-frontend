import { Component } from '@angular/core';
import { LibriService } from '../../libri.service';
import { ActivatedRoute } from '@angular/router';
import { ILibri } from '../../Modules/i-libri';

@Component({
  selector: 'app-dettaglio-libri',
  templateUrl: './dettaglio-libri.component.html',
  styleUrl: './dettaglio-libri.component.scss'
})
export class DettaglioLibriComponent {

  libro:ILibri | null = null;
constructor(private libroSvc:LibriService,private  router:ActivatedRoute){}

  ngOnInit(){
   this.router.params.subscribe(params=>{
    const id = +params['id'];
    this.libro = this.libroSvc.getById(id);
   })

  }


}
