import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '@category/shared/interfaces/category';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {

  @Input() items!: Category[]
  @Output() remove = new EventEmitter<Category>()

  constructor() { }

  public deleteEvent(category: Category) {
    this.remove.emit(category)
  }

}
