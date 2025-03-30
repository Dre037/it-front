import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { EntrysManagerComponent } from './pages/entrys-manager/entrys-manager.component';
import { EntrysListComponent } from './components/entrys-list/entrys-list.component';
import { EntrysFormComponent } from './components/entrys-form/entrys-form.component';
import { RouterModule } from '@angular/router';
import { routes } from './entrys.routes';
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { EntrysFilterComponent } from './components/entrys-filter/entrys-filter.component';

@NgModule({
  declarations: [
    EntrysManagerComponent,
    EntrysListComponent,
    EntrysFormComponent,
    EntrysFilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TranslateModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSnackBarModule
  ]
})
export class EntrysModule { }
