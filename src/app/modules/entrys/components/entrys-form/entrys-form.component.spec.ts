import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrysFormComponent } from './entrys-form.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CategoryState } from '@category/shared/store/category.reducer';
import { ReactiveFormsModule } from '@angular/forms';
import { Category } from '@category/shared/interfaces/category';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef } from '@angular/material/dialog';
import { Entrys } from '@entrys/shared/interfaces/entrys';
import { selectCategories } from '@category/shared/store/category.selectors';
import { MatDatepickerModule } from '@angular/material/datepicker';

describe('EntrysFormComponent', () => {
  let component: EntrysFormComponent;
  let fixture: ComponentFixture<EntrysFormComponent>;
  let storeMock: MockStore<{ categoryState: CategoryState }>
  let mockDialogRef: jest.MockedObject<MatDialogRef<EntrysFormComponent>>

  const mockCategories: Category[] = [
    { id: 'A', name: 'Turismo' },
    { id: 'B', name: 'Paisagismo' }
  ]

  const initialState = {
    categoryState: {
      list: mockCategories
    }
  }

  const formData = {
    idCategoria: 'A',
    description: 'Gasto com turismo',
    date: { format: jest.fn().mockReturnValue('30/03/2025') },
    value: 100
  }

  beforeEach(async () => {
    mockDialogRef = {
      close: jest.fn().mockReturnValue({...formData, date: '30/03/2025'})
    } as any

    await TestBed.configureTestingModule({
      declarations: [EntrysFormComponent],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        TranslateTestingModule.withTranslations({}),
        MatFormFieldModule,
        MatSelectModule,
        MatDatepickerModule,
        MatInputModule
      ],
      providers: [
        provideMockStore({initialState}),
        {
          provide: MatDialogRef, useValue: mockDialogRef
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrysFormComponent);
    component = fixture.componentInstance;
    component.dialogRef = mockDialogRef;
    storeMock = TestBed.inject(MockStore)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('trigger dialogRef.close() with the form data when sendForm() is fired', () => {
    component.formGroup.setValue(formData)
    component.sendForm();

    expect(mockDialogRef.close).toHaveBeenCalledWith({
      ...formData,
      date: '30/03/2025'
    })
  })

  it('should invalidate the form if required fields are empty', () => {
    component.formGroup.reset()
    expect(component.formGroup.valid).toBeFalsy()
  })

  it('should call categories to store', () => {
    storeMock.overrideSelector(selectCategories, mockCategories)
    component.ngOnInit()
    
    component.categories$.subscribe(categories => {
      expect(categories).toEqual(mockCategories)
    })
  })
});
