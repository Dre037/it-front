import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRemoveComponent } from './dialog-remove.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

describe('DialogRemoveComponent', () => {
  let component: DialogRemoveComponent;
  let fixture: ComponentFixture<DialogRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRemoveComponent ],
      imports: [
        ReactiveFormsModule,
        TranslateTestingModule.withTranslations('pt-BR', require('@assets/i18n/pt-BR.json')),
        MatDialogModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check control is invalid', () => {
    component.control.setValue('Teste')

    expect(component.control.valid).toBeFalsy()
  })

  it('check control valid', () => {
    component.control.setValue('Confirmar')

    expect(component.control.valid).toBeTruthy()
  })
});
