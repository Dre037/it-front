import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category } from '@category/shared/interfaces/category';
import { CategoryState } from '@category/shared/store/category.reducer';
import { selectCategories } from '@category/shared/store/category.selectors';

@Component({
  selector: 'app-entrys-form',
  templateUrl: './entrys-form.component.html',
  styleUrls: ['./entrys-form.component.scss']
})
export class EntrysFormComponent implements OnInit {

  public formGroup: FormGroup
  public categories$: Observable<Category[]>

  constructor(
    private store: Store<{ categoryState: CategoryState }>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      idCategoria: ['', Validators.required],
      description: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(40)])],
      date: ['', Validators.required],
      value: ['', Validators.required]
    })

    this.categories$ = this.store.pipe(select(selectCategories))
  }

  updateDate(event: MatDatepickerInputEvent<Date>) {

  }

}
