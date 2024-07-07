import { Component } from '@angular/core';
import { ILibri } from '../../Modules/i-libri';
import { LibriService } from '../../libri.service';

@Component({
  selector: 'app-libri',
  templateUrl: './libri.component.html',
  styleUrl: './libri.component.scss'
})
export class LibriComponent {
  libri:ILibri[] = [];

  constructor(
    private libriSvc:LibriService
  ){}


  ngOnInit(){
    this.libriSvc.libri$.subscribe(libri =>this.libri = libri)
    this.libriSvc.getAll().subscribe()
  }


  elimina(id:number){
    this.libriSvc.delete(id).subscribe()
  }
}
