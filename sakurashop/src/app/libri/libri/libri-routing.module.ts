import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibriComponent } from './libri.component';
import { EditComponent } from '../edit/edit.component';
import { AddComponent } from '../add/add.component';

const routes: Routes = [
  {
    path: '',
    component: LibriComponent
  },
  {
    path:'edit/:id',
    component:EditComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibriRoutingModule { }
