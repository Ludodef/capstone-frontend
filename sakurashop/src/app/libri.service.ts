import { Injectable } from '@angular/core';
import { ILibri } from './Modules/i-libri';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { AuthService } from './auth/auth.service';
import { ILibriParziale } from './Modules/i-libri-parziale';

@Injectable({
  providedIn: 'root'
})
export class LibriService {

libri:ILibri[] = [];
libriSubject = new BehaviorSubject<ILibri[]>([]);
libri$ = this.libriSubject.asObservable();

constructor(
  private http:HttpClient,
  private authSvc:AuthService

) {}


 apiUrl:string =environment.libriUrl
 modificaUrl:string = environment.modificaUrl
 eliminaUrl:string = environment.eliminaUrl
 creaUrl:string = environment.creaUrl

 getAll(): Observable<ILibri[]>{
  const token = this.authSvc.getAccessToken();
  return this.http.get<ILibri[]>(this.apiUrl)
  .pipe(
    tap(libri => {
      this.libriSubject.next(libri)
      this.libri = libri}
    ))
 }

 getById(id:number):ILibri | null{
  return this.libri.find(libro => libro.id === id) || null;
 }

 update(libro:ILibri){
  return this.http.put<ILibri>(`${this.modificaUrl}${libro.id}`, libro)
  .pipe(tap(responseLibri =>{
    const index = this.libri.findIndex(u => u.id === libro.id);

    this.libri.splice(index,1,responseLibri)
    this.libriSubject.next(this.libri)

  }))
 }

 create(libro: ILibriParziale, files: File[]): Observable<ILibri> {
  const formData = new FormData();
  files.forEach((file,index) => {
    formData.append('file', file, file.name);
  });
  formData.append('libri', JSON.stringify(libro));

  return this.http.post<ILibri>(this.creaUrl, formData)
    .pipe(tap(responseLibri => {
      this.libri.push(responseLibri);
      this.libriSubject.next(this.libri);
    }));
}

 delete(id:number){
  return this.http.delete<ILibri>(`${this.eliminaUrl}${id}`)
  .pipe(tap(() => {
    const index = this.libri.findIndex(u => u.id === id)
    this.libri.splice(index,1)
    this.libriSubject.next(this.libri)
  }))
 }

 updateLibroQuantity(id: number, quantita: number): Observable<ILibri> {
  const payload = { quantita };
  return this.http.put<ILibri>(`${this.apiUrl}/${id}/quantity`, payload)
    .pipe(tap(updatedLibro => {
      const index = this.libri.findIndex(libro => libro.id === id);
      if (index !== -1) {
        this.libri[index] = updatedLibro;
        this.libriSubject.next(this.libri);
      }
    }));
}

updateQuantita(id: number, quantita: number): Observable<ILibri> {
  const libro = this.getById(id);
  if (libro) {
    libro.quantita = quantita;
    return this.update(libro);
  }
  return new Observable<ILibri>(); // Restituisce un observable vuoto se il libro non viene trovato
}

searchByTitolo(titolo: string): Observable<ILibri[]> {
  return this.http.get<ILibri[]>(`${this.apiUrl}/search`, { params: { titolo } });
}
}
