import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-dialog-remove',
  templateUrl: './dialog-remove.component.html',
  styleUrls: ['./dialog-remove.component.scss']
})
export class DialogRemoveComponent {

  public control = new FormControl('', { validators: Validators.compose([Validators.required, this.eqValidator('Confirmar')]) })

  constructor() { 

  }

  private eqValidator(term: string): ValidatorFn {
    return (c: FormControl) => {
      const regex = new RegExp(term.toLowerCase())
      return regex.test(c.value.toLowerCase()) ? null : { termInvalid: true }
    }
  }

}
