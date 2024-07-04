import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibriRoutingModule } from './libri-routing.module';
import { LibriComponent } from './libri.component';


@NgModule({
  declarations: [
    LibriComponent
  ],
  imports: [
    CommonModule,
    LibriRoutingModule
  ]
})
export class LibriModule { }
