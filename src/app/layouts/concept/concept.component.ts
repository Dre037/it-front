import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.scss']
})
export class ConceptLayout implements OnInit {

  public links = [
    { icon: 'category', title: 'Categorias', subtitle: 'Lista de categorias', route: '/category' },
    { icon: 'receipt_long', title: 'Lançamentos', subtitle: 'Lista de lançamentos', route: '/entrys'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
