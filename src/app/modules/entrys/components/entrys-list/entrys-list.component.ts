import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Entrys } from '@entrys/shared/interfaces/entrys';

@Component({
  selector: 'entrys-list',
  templateUrl: './entrys-list.component.html',
  styleUrls: ['./entrys-list.component.scss']
})
export class EntrysListComponent {

  @Input() set items(value: Entrys[]) {
    this._items = value
    this.totalCount = value.map(m => m.value).reduce((a, b) => a + b, 0)
  }
  @Output() remove = new EventEmitter<Entrys>()

  public displayedColumns = ['it-description', 'it-category', 'it-date', 'it-value', 'it-actions']
  public totalCount: number

  public get items(): Entrys[] {
    return this._items
  }

  private _items!: Entrys[]

  constructor() {
   }

  public deleteEvent(entry: Entrys) {
    this.remove.emit(entry)
  }

}
