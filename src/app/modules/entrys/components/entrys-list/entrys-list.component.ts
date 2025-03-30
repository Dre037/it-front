import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Entrys } from '../../shared/interfaces/entrys';

@Component({
  selector: 'entrys-list',
  templateUrl: './entrys-list.component.html',
  styleUrls: ['./entrys-list.component.scss']
})
export class EntrysListComponent {

  @Input() items!: Entrys[]
  @Output() remove = new EventEmitter<Entrys>()

  public displayedColumns = ['it-description', 'it-date', 'it-value', 'it-actions']

  constructor() { }

  public deleteEvent(entry: Entrys) {
    this.remove.emit(entry)
  }

}
