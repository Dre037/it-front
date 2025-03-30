import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryFormComponent } from './category-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateTestingModule } from 'ngx-translate-testing'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

describe('CategoryFormComponent', () => {
  let component: CategoryFormComponent;
  let fixture: ComponentFixture<CategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryFormComponent],
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        TranslateTestingModule.withTranslations({})
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('init form correctaly', () => {
    expect(component.control).toBeDefined()
    expect(component.control.valid).toBeFalsy()
  })

  it('check field is valid', () => {
    component.control.setValue('')
    expect(component.control.valid).toBeFalsy()
    expect(component.control.hasError('required')).toBeTruthy()

    component.control.setValue('abc')
    expect(component.control.valid).toBeFalsy()
    expect(component.control.hasError('minlength')).toBeTruthy()

    component.control.setValue('a'.repeat(41));
    expect(component.control.valid).toBeFalsy()
    expect(component.control.hasError('maxlength')).toBeTruthy()

    component.control.setValue('Turismo')
    expect(component.control.valid).toBeTruthy()
  })
});
