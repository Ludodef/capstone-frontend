import { Router } from '@angular/router';
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
  files: File[] = [];

  constructor(private libroSvc:LibriService,
    private router:Router
  ){}

  aggiungiLibro() {
    this.libroSvc.create(this.newLibro as ILibri, this.files).subscribe(() => {
      this.newLibro = {};
      this.files = [];
      this.router.navigate(['/libri']);
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.files = Array.from(event.target.files);
    }
  }

}
