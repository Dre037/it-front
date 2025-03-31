import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent {

  public control = new FormControl('', { validators: Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(40) ]) })

  constructor() { }
}
