import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { LibriService } from '../../libri.service';
import { ILibri } from '../../Modules/i-libri';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isUserLoggedIn: boolean = false;
  titolo: string = '';
  libroRicercato: ILibri[]= [];
  errore: string | null = null;
  showResults = false;

  constructor(private AuthSvc:AuthService, private libriSvc:LibriService){}
  ngOnInit(){
    this.AuthSvc.isLoggedIn$.subscribe(data => {
      this.isUserLoggedIn = data;
    })
  }

  logOut(){
    this.AuthSvc.logout();

  }

  searchLibro(): void {
    if (this.titolo.trim()) {
      this.libriSvc.searchByTitolo(this.titolo).subscribe(
        (data: ILibri[]) => {
          this.libroRicercato = data;
          this.errore = null;
        },
        (error) => {
          console.error('Errore durante la ricerca dei libri:', error);
          this.errore = 'Si è verificato un errore durante la ricerca';
        }
      );
    } else {
      this.libroRicercato = [];
    }
  }


  onSearch(event: Event) {
    this.showResults = true;
  }

  closeSearchResults() {
    this.showResults = false;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const searchResults = document.getElementById('searchResults');
    if (searchResults && !searchResults.contains(event.target as Node) && event.target !== document.getElementById('searchInput')) {
      this.closeSearchResults();
    }
  }
}

