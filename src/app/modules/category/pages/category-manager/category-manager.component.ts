import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, filter, switchMap, take } from 'rxjs';
import { Category } from '@category/shared/interfaces/category';
import { CategoryApiService } from '@category/shared/services/category-api.service';
import { MatDialog } from '@angular/material/dialog';
import { CategoryFormComponent } from '@category/components/category-form/category-form.component';
import { CommonManager } from '@core/common/common-manager';
import { select, Store } from '@ngrx/store';
import { CategoryState } from '@category/shared/store/category.reducer';
import * as CategoryActions from '@category/shared/store/category.actions';
import { selectCategories } from '@category/shared/store/category.selectors';

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.scss']
})
export class CategoryManagerComponent extends CommonManager<CategoryApiService, Category> implements OnInit {

  constructor(
    private store: Store<{ categoryState: CategoryState }>,
    categoryApiService: CategoryApiService,
    matDialog: MatDialog
  ) {
    super(categoryApiService, matDialog)
  }

  ngOnInit(): void {
    this.items$ = this.store.pipe(select(selectCategories))
    this.load()
  }
  
  public override load(): void {
    this.store.dispatch(CategoryActions.fetchCategories())
  }

  public open() {
    this.openDialog(CategoryFormComponent)
  }

  public removeCategory(category: Category) {
    this.remove(category.id)
  }
}
