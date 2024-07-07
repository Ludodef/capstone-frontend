import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { IUser } from '../../Modules/i-user';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.scss'
})
export class ProfiloComponent {

  constructor(private AuthSvc:AuthService){}
user!:IUser|undefined

  ngOnInit(){
    this.AuthSvc.user$.subscribe(user => {


      this.user = user || undefined;
    })
  }

}
