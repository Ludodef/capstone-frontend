import { Component } from '@angular/core';
import { ILibri } from '../../Modules/i-libri';
import { LibriService } from '../../libri.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {

  newLibro:Partial <ILibri> = {}

  constructor(private libroSvc:LibriService){}

  aggiungiLibro(){
    this.libroSvc.create(this.newLibro).subscribe(() =>{
      this.newLibro = {}
    })
  }

}
