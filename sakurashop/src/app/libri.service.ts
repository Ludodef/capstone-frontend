import { Injectable } from '@angular/core';
import { ILibri } from './Modules/i-libri';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { AuthService } from './auth/auth.service';

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

 create(libro:Partial<ILibri>){
  return this.http.post<ILibri>(this.apiUrl,libro)
  .pipe(tap(responseLibri => {
    this.libri.push(responseLibri)
    this.libriSubject.next(this.libri)
  }))
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
}
