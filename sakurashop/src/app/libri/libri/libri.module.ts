import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibriRoutingModule } from './libri-routing.module';
import { LibriComponent } from './libri.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LibriComponent
  ],
  imports: [
    CommonModule,
    LibriRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LibriModule { }
