import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MangaRoutingModule } from './manga-routing.module';
import { MangaComponent } from './manga.component';


@NgModule({
  declarations: [
    MangaComponent
  ],
  imports: [
    CommonModule,
    MangaRoutingModule
  ]
})
export class MangaModule { }
