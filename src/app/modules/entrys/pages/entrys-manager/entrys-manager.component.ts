import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, filter, map, mergeMap, switchMap, take } from 'rxjs';
import { Entrys } from '@entrys/shared/interfaces/entrys';
import { EntrysApiService } from '@entrys/shared/services/entrys-api.service';
import { MatDialog } from '@angular/material/dialog';
import { EntrysFormComponent } from '@entrys/components/entrys-form/entrys-form.component';
import { CommonManager } from '@core/common/common-manager';
import { select, Store } from '@ngrx/store';
import { CategoryState } from '@category/shared/store/category.reducer';
import { selectCategories } from '@category/shared/store/category.selectors';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-entrys-manager',
  templateUrl: './entrys-manager.component.html',
  styleUrls: ['./entrys-manager.component.scss']
})
export class EntrysManagerComponent extends CommonManager<EntrysApiService, Entrys> implements OnInit {

  constructor(
    private store: Store<{ categoryState: CategoryState }>,
    private entrysApiService: EntrysApiService,
    matDialog: MatDialog,
    matSnackbar: MatSnackBar,
    translate: TranslateService
  ) { 
    super(entrysApiService, matDialog, matSnackbar, translate)
  }

  ngOnInit(): void {
    this.load()
  }

  public override load(): void {
    this.entrysApiService.list().pipe(
      mergeMap(items => this.store.pipe(select(selectCategories), map(categories => {
        return items.map(m => ({
          ...m,
          category: categories.find(f => f.id == m.idCategoria)?.name
        }))
      }))),
      take(1)
    ).subscribe(items => {
      this.itemsSubj.next(items)
    })
  }

  public open() {
    this.openDialog(EntrysFormComponent)
  }

  public removeEntry(entry: Entrys) {
    this.remove(entry.id)
  }
}
