import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibriComponent } from './libri.component';
import { EditComponent } from '../edit/edit.component';
import { AddComponent } from '../add/add.component';
import { DettaglioLibriComponent } from '../dettaglio-libri/dettaglio-libri.component';
import { CarrelloComponent } from '../../carrello/carrello/carrello.component';

const routes: Routes = [
  {
    path: '',
    component: LibriComponent
  },
  {
    path:'edit/:id',
    component:EditComponent
  },
{
  path:'dettaglio/:id',
  component:DettaglioLibriComponent
},
{
  path:'add',
  component:AddComponent
},
{
  path:'carrello',
  component:CarrelloComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibriRoutingModule { }
