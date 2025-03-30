import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConceptLayout } from './concept.component';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ConceptLayout
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule
  ]
})
export class ConceptModule { }
