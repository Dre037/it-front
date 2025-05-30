import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConceptLayout } from './concept.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ConceptLayout
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class ConceptModule { }
