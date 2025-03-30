import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category } from '@category/shared/interfaces/category';
import { CategoryState } from '@category/shared/store/category.reducer';
import { selectCategories } from '@category/shared/store/category.selectors';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter'
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';
import { Moment } from 'moment';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-entrys-form',
  templateUrl: './entrys-form.component.html',
  styleUrls: ['./entrys-form.component.scss'],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useFactory: (translate: TranslateService) => {
        return translate.defaultLang
      },
      deps: [TranslateService]
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MAT_MOMENT_DATE_FORMATS
    }
  ]
})
export class EntrysFormComponent implements OnInit {

  public dialogRef: MatDialogRef<EntrysFormComponent>

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

  public sendForm() {
    const payload = this.formGroup.value
    payload['date'] = payload['date'].format('DD/MM/YYYY')
    this.dialogRef.close(payload)
  }
}
