import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { IUser } from '../../Modules/i-user';
import { Router } from '@angular/router';

type AccessData = {
  token: string,
  user:IUser
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
 registerData: Partial<IUser> = {
  roles: []
 }


 admin:boolean = false;

  constructor(private authSvc:AuthService,
    private router:Router
  ){}
  onRoleChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.registerData.roles?.push({ roleType: 'ADMIN' });
    }else {
      const index = this.registerData.roles?.findIndex(role => role.roleType === 'ADMIN');
      if (index !== undefined && index > -1) {
        this.registerData.roles?.splice(index, 1);
      }

    }

    }
    signUp(){
      if(this.admin){
        this.authSvc.registerAdmin(this.registerData).subscribe( data => this.router.navigate(['/']));
      }else{
        this.authSvc.register(this.registerData).subscribe( data => this.router.navigate(['/']));
      }
    }


  }





