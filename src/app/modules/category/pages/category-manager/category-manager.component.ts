import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, filter, switchMap, take } from 'rxjs';
import { Category } from '../../shared/interfaces/category';
import { CategoryApiService } from '../../shared/services/category-api.service';
import { MatDialog } from '@angular/material/dialog';
import { CategoryFormComponent } from '../../components/category-form/category-form.component';
import { CommonManager } from 'src/app/core/common/common-manager';

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.scss']
})
export class CategoryManagerComponent extends CommonManager<CategoryApiService, Category> implements OnInit {

  // private itemsSubj = new BehaviorSubject<Category[]>([])
  // public items$ = this.itemsSubj.asObservable()

  constructor(
    categoryApiService: CategoryApiService,
    matDialog: MatDialog
  ) { 
    super(categoryApiService, matDialog)
  }

  ngOnInit(): void {
      this.load()
  }

  public open() {
    this.openDialog(CategoryFormComponent)
  }

  public removeCategory(category: Category) {
    this.remove(category.id)
  }

  // ngOnInit(): void {
  //   this.categoryApiService.list().pipe(
  //     take(1)
  //   ).subscribe(list => {
  //     this.itemsSubj.next(list)
  //   })
  // }

  // public openDialog() {
  //   const dialog = this.matDialog.open(CategoryFormComponent, {
  //     position: {
  //       top: '24px'
  //     }
  //   })

  //   dialog.afterClosed().pipe(
  //     filter(f => f && true),
  //     switchMap(({name}) => this.categoryApiService.create({name})),
  //     take(1)
  //   ).subscribe(() => {

  //   })
  // }

  // public removeCategory(category: Category) {
  //   this.categoryApiService.remove(category.id).pipe(
  //     take(1)
  //   ).subscribe(() => {

  //   })
  // }
}
