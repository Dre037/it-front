import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryManagerComponent } from './category-manager.component';
import { ActionReducerMap, Store, StoreModule } from '@ngrx/store';
import { CategoryState } from '@category/shared/store/category.reducer';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryApiService } from '@category/shared/services/category-api.service';
import * as CategoryActions from '@category/shared/store/category.actions'
import * as CategoryReducer from '@category/shared/store/category.reducer'
import { TranslateTestingModule } from 'ngx-translate-testing';
import { CategoryFormComponent } from '@category/components/category-form/category-form.component';
import { Category } from '@category/shared/interfaces/category';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { DialogRemoveComponent } from '@core/components/dialog-remove/dialog-remove.component';

describe('CategoryManagerComponent', () => {
  let component: CategoryManagerComponent;
  let fixture: ComponentFixture<CategoryManagerComponent>;
  let store: Store<{ categoryState: CategoryState }>
  let matDialog: MatDialog
  let matSnackbar: MatSnackBar
  let categoryApiService: CategoryApiService

  beforeEach(async () => {
    const dialogRefMock = {
      afterClosed: jest.fn().mockReturnValue(of(true)),
      close: jest.fn()
    }

    await TestBed.configureTestingModule({
      declarations: [ CategoryManagerComponent ],
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(CategoryReducer.CategoryFeatureKey, CategoryReducer.reducer),
        TranslateTestingModule.withTranslations({})
      ],
      providers: [
        { provide: CategoryApiService, useValue: { list: jest.fn() } },
        { provide: MatDialog, useValue: { open: jest.fn().mockReturnValue(dialogRefMock) } },
        { provide: MatSnackBar, useValue: { open: jest.fn() } }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryManagerComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    matDialog = TestBed.inject(MatDialog);
    matSnackbar = TestBed.inject(MatSnackBar);
    categoryApiService = TestBed.inject(CategoryApiService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('dispatch fetchCategories on load component', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    component.ngOnInit()

    expect(dispatchSpy).toHaveBeenCalledWith(CategoryActions.fetchCategories());
  })

  it('check dialog opened after trigger open method', () => {
    const openDialogSpy = jest.spyOn(matDialog, 'open');

    component.open()

    expect(openDialogSpy).toHaveBeenCalledWith(CategoryFormComponent, expect.objectContaining({
      autoFocus: false,
      position: { top: '24px' }
    }));
  })

  it('check action remove is fired after trigger removeCategory', () => {
    const category: Category = { id: 'A', name: 'Turismo' };
    const removeCategorySpy = jest.spyOn(matDialog, 'open');

    component.removeCategory(category)

    expect(removeCategorySpy).toHaveBeenCalledWith(DialogRemoveComponent, expect.objectContaining({
      autoFocus: false,
      position: { top: '24px' }
    }))
  })
});
