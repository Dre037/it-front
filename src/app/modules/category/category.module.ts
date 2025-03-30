import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryManagerComponent } from './pages/category-manager/category-manager.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { RouterModule } from '@angular/router';
import { routes } from './category.routes';
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkColumnDef } from '@angular/cdk/table';
import { StoreModule } from '@ngrx/store';
import * as CategoryReducer from './shared/store/category.reducer'
import { EffectsModule } from '@ngrx/effects';
import { CategoryEffects } from './shared/store/category.effects';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CategoryManagerComponent,
    CategoryListComponent,
    CategoryFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(CategoryReducer.CategoryFeatureKey, CategoryReducer.reducer),
    EffectsModule.forFeature([CategoryEffects]),
    TranslateModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatSnackBarModule
  ],
  providers: [
    CdkColumnDef
  ]
})
export class CategoryModule { }
