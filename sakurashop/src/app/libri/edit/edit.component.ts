import { Component } from '@angular/core';
import { ILibri } from '../../Modules/i-libri';
import { LibriService } from '../../libri.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  libro!:ILibri;

  constructor(private libriSvc: LibriService,
    private route: ActivatedRoute
  ){}


  ngOnInit(){
    this.route.params.subscribe((params: any) => {
      this.libriSvc.libri$.subscribe(libri =>{
        const foundLibro = libri.find(l => l.id == params.id)
        if (foundLibro) this.libro = foundLibro

      })
  })

}

modificaLibro(){
  this.libriSvc.update(this.libro).subscribe(() => alert('Modificato'))
}
}
