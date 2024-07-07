import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { GuestGuard } from './auth/guest.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home/home.module').then(m => m.HomeModule)
  },

  {
    path: 'libri',
    loadChildren: () => import('./libri/libri/libri.module').then(m => m.LibriModule),
    canActivate:[AuthGuard]
  },



  {
    path: 'contatti',
    loadChildren: () => import('./contatti/contatti/contatti.module').then(m => m.ContattiModule)
  },

  {
    path: 'profilo',
    loadChildren: () => import('./profilo/profilo/profilo.module').then(m => m.ProfiloModule),
  canActivate:[AuthGuard]
 },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate:[GuestGuard],
    canActivateChild:[GuestGuard]
  },

  {
    path: 'carrello',
    loadChildren: () => import('./carrello/carrello/carrello.module').then(m => m.CarrelloModule)
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
