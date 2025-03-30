import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dialog-remove',
  templateUrl: './dialog-remove.component.html',
  styleUrls: ['./dialog-remove.component.scss']
})
export class DialogRemoveComponent {

  public control = new FormControl('', { validators: Validators.compose([Validators.required, this.eqValidator(this.translate.instant('GEN.CONFIRM'))]) })

  constructor(private translate: TranslateService) { 

  }

  private eqValidator(term: string): ValidatorFn {
    return (c: FormControl) => {
      const regex = new RegExp(term.toLowerCase())
      return regex.test(c.value.toLowerCase()) ? null : { termInvalid: true }
    }
  }

}
