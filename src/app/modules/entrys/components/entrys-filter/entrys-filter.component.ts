import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from '@category/shared/interfaces/category';
import { CategoryState } from '@category/shared/store/category.reducer';
import { selectCategories } from '@category/shared/store/category.selectors';
import { select, Store } from '@ngrx/store';
import { distinctUntilChanged, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'entrys-filter',
  templateUrl: './entrys-filter.component.html',
  styleUrls: ['./entrys-filter.component.scss']
})
export class EntrysFilterComponent implements OnInit, OnDestroy {

  public categories$: Observable<Category[]>
  public filterForm: FormGroup

  @Output() filter = new EventEmitter<{ description: string, categories: Category[] }>()

  private subscription = new Subscription()

  constructor(
    private store: Store<{ categoryState: CategoryState }>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.categories$ = this.store.pipe(select(selectCategories))
    this.filterForm = this.fb.group({
      description: [''],
      categories: [[]]
    })

    this.subscription.add(
      this.filterForm.valueChanges.pipe(
        distinctUntilChanged()
      ).subscribe(({description, categories}) => {
        this.filter.emit({description, categories})
      })
    )
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }
}
