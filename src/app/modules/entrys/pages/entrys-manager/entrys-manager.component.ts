import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, filter, switchMap, take } from 'rxjs';
import { Entrys } from '../../shared/interfaces/entrys';
import { EntrysApiService } from '../../shared/services/entrys-api.service';
import { MatDialog } from '@angular/material/dialog';
import { EntrysFormComponent } from '../../components/entrys-form/entrys-form.component';
import { CommonManager } from 'src/app/core/common/common-manager';

@Component({
  selector: 'app-entrys-manager',
  templateUrl: './entrys-manager.component.html',
  styleUrls: ['./entrys-manager.component.scss']
})
export class EntrysManagerComponent extends CommonManager<EntrysApiService, Entrys> implements OnInit {

  constructor(
    private entrysApiService: EntrysApiService,
    matDialog: MatDialog
  ) { 
    super(entrysApiService, matDialog)
  }

  ngOnInit(): void {
    this.load()
  }

  public override load(): void {
    this.entrysApiService.list().pipe(
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
