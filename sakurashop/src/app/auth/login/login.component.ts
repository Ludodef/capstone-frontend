import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ILoginData } from '../../Modules/i-login-data';
import { LibriService } from '../../libri.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginData: ILoginData ={
    username: '',
    password: ''

  };


  constructor(private authSvc:AuthService,
    private router:Router,
    private librisvc:LibriService
  ){

  }

signIn(){
  this.authSvc.login(this.loginData).subscribe( data => {
    this.router.navigate(['/'])

  });

}
}
