import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { EntrysFilterComponent } from './entrys-filter.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Category } from '@category/shared/interfaces/category';
import { CategoryState } from '@category/shared/store/category.reducer';
import { Store } from '@ngrx/store';
import { selectCategories } from '@category/shared/store/category.selectors';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EntrysFilterComponent', () => {
  let component: EntrysFilterComponent;
  let fixture: ComponentFixture<EntrysFilterComponent>;
  let store: MockStore<{ categoryState: CategoryState }>

  const mockCategories: Category[] = [
    { id: 'A', name: 'Turismo' },
    { id: 'B', name: 'Paisagismo' }
  ]

  const initialState = {
    categoryState: {
      list: mockCategories
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntrysFilterComponent],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        TranslateTestingModule.withTranslations({}),
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule
      ],
      providers: [
        provideMockStore({ initialState })
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrysFilterComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.filterForm).toBeTruthy();
    expect(component.filterForm.value).toEqual({ description: '', categories: [] })
  })

  it('should emit filter event on form value change', () => {
    const filterSpy = jest.spyOn(component.filter, 'emit')

    component.filterForm.setValue({ description: 'Test', categories: mockCategories })

    expect(filterSpy).toHaveBeenCalledWith({
      description: 'Test',
      categories: mockCategories
    })
  })

  it('should select categories from store', () => {
    store.overrideSelector(selectCategories, mockCategories);

    component.ngOnInit()
    component.categories$.subscribe(categories => {
      expect(categories).toEqual(mockCategories)
    })
  })

  it('should unsubscribe and destroy', () => {
    const unsubscribeSpy = jest.spyOn(component['subscription'], 'unsubscribe');

    component.ngOnDestroy()
    expect(unsubscribeSpy).toHaveBeenCalled()
  })
});
