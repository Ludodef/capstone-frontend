import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '',
    loadChildren: () => import('./home/home/home.module').then(m => m.HomeModule) },
  { path: 'libri',
    loadChildren: () => import('./libri/libri/libri.module').then(m => m.LibriModule) },
  { path: 'manga',
    loadChildren: () => import('./manga/manga/manga.module').then(m => m.MangaModule) },

  { path: 'contatti',
    loadChildren: () => import('./contatti/contatti/contatti.module').then(m => m.ContattiModule) },
  { path: 'profilo',
    loadChildren: () => import('./profilo/profilo/profilo.module').then(m => m.ProfiloModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
