import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-entrys-form',
  templateUrl: './entrys-form.component.html',
  styleUrls: ['./entrys-form.component.scss']
})
export class EntrysFormComponent implements OnInit {

  public formGroup: FormGroup



  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      idCategoria: ['', Validators.required],
      description: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(40)])],
      date: ['', Validators.required],
      value: ['', Validators.required]
    })
  }

  updateDate(event: MatDatepickerInputEvent<Date>) {

  }

}
