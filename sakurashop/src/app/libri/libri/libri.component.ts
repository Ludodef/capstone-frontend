import { Component } from '@angular/core';
import { ILibri } from '../../Modules/i-libri';
import { LibriService } from '../../libri.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-libri',
  templateUrl: './libri.component.html',
  styleUrl: './libri.component.scss'
})
export class LibriComponent {
  libri:ILibri[] = [];
  isAdmin$ = this.authSvc.isAdmin$;


  constructor(
    private libriSvc:LibriService,
    public authSvc:AuthService
  ){}


  ngOnInit(){
    this.libriSvc.libri$.subscribe(libri =>this.libri = libri)
    this.libriSvc.getAll().subscribe()
  }


  elimina(id:number){
    this.libriSvc.delete(id).subscribe()
  }
}
