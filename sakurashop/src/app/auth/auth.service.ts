import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { IUser } from '../Modules/i-user';
import { HttpClient } from '@angular/common/http';
import { ILoginData } from '../Modules/i-login-data';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

type AccessData = {
  token: string,
  user:IUser
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper: JwtHelperService = new JwtHelperService();
  authSubject = new BehaviorSubject<IUser | null>(null);

  user$ = this.authSubject.asObservable();
  isLoggedIn$ = this.user$.pipe(map(user => !!user),
  tap(user => this.syncIsLoggedIn = user))

  syncIsLoggedIn = false;

  constructor(private http:HttpClient, private router:Router) {

this.restoreUser()

  }

  registerUrl:string = environment.registerUrl
  loginUrl:string = environment.loginUrl
  adminUrl:string = environment.adminUrl


  login(loginData:ILoginData): Observable<AccessData>{
    return this.http.post<AccessData>(this.loginUrl, loginData)
    .pipe(tap(data => {
      this.authSubject.next(data.user)
      localStorage.setItem('accessData',JSON.stringify(data))

      this.autoLogout(data.token)
    }))


  }
  logout(){
    this.authSubject.next(null)
    localStorage.removeItem('accessData')
    this.router.navigate(['/auth/login'])
  }

  autoLogout(jwt:string){
    const expDate = this.jwtHelper.getTokenExpirationDate(jwt) as Date;
    if (!expDate) {
      console.error('Invalid JWT: Missing expiration date');
      return;
    }
    const expMs = expDate.getTime() - new Date().getTime();
    setTimeout(() => {
      this.logout()
    },expMs)
  }

  getAccessToken():string{
    const userJson = localStorage.getItem('accessData')
    if(!userJson) return '';
    const accessData:AccessData = JSON.parse(userJson)
    //if(this.jwtHelper.isTokenExpired(accessData.accessToken)) return ''
    return accessData.token

  }

  register(newUser:Partial<IUser>):Observable<AccessData>{
    return this.http.post<AccessData>(this.registerUrl, newUser)
  }
  registerAdmin(newUser:Partial<IUser>):Observable<AccessData>{
    return this.http.post<AccessData>(this.adminUrl, newUser)
  }

  restoreUser(){

    const userJson = localStorage.getItem('accessData')
    if(!userJson) return;

    const accessData:AccessData = JSON.parse(userJson)
    if(this.jwtHelper.isTokenExpired(accessData.token)) return;

    this.authSubject.next(accessData.user)
    this.autoLogout(accessData.token)
  }
  hasRole(role: string): Observable<boolean> {
    return this.user$.pipe(
      map(user => user ? user.roles.some(r => r.roleType === role) : false)
    );
  }

  isUser$ = this.hasRole('user');
  isAdmin$ = this.hasRole('admin');


  getUserProfile(): IUser | null {
    const userJson = localStorage.getItem('accessData');
    if (!userJson) return null;

    const accessData: AccessData = JSON.parse(userJson);
    return accessData.user;
  }

}
