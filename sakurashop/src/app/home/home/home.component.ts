import { Component } from '@angular/core';
import { ILibri } from '../../Modules/i-libri';
import { LibriService } from '../../libri.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
book:ILibri[]= [];
randomBooks:ILibri[] = [];
constructor(private libriSvc:LibriService){}
ngOnInit(): void {
  this.libriSvc.getAll().subscribe((data: ILibri[]) => {
    this.book = data;
    this.getRandomBooks();
  });
}

getRandomBooks(): void {
  const shuffled = this.book.sort(() => 0.5 - Math.random());
  this.randomBooks = shuffled.slice(0, 4);
}

}
