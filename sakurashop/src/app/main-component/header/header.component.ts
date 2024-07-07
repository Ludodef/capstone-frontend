import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isUserLoggedIn: boolean = false;

  constructor(private AuthSvc:AuthService){}
  ngOnInit(){
    this.AuthSvc.isLoggedIn$.subscribe(data => {
      this.isUserLoggedIn = data;
    })
  }

  logOut(){
    this.AuthSvc.logout();

  }

}
