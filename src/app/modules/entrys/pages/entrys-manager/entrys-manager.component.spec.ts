import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrysManagerComponent } from './entrys-manager.component';
import { Chart, registerables } from 'chart.js';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CategoryState } from '@category/shared/store/category.reducer';
import { EntrysApiService } from '@entrys/shared/services/entrys-api.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from '@category/shared/interfaces/category';
import { Entrys } from '@entrys/shared/interfaces/entrys';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { EntrysFormComponent } from '@entrys/components/entrys-form/entrys-form.component';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { selectCategories } from '@category/shared/store/category.selectors';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EntrysManagerComponent', () => {
  let component: EntrysManagerComponent;
  let fixture: ComponentFixture<EntrysManagerComponent>;
  let mockStore: MockStore<{ categoryState: CategoryState }>
  let mockEntryApiService: EntrysApiService
  let mockDialog: MatDialog
  let mockSnackbar: MatSnackBar

  const mockCategories: Category[] = [
    { id: 'A', name: 'Turismo' },
    { id: 'B', name: 'Paisagismo' }
  ]

  const initialState = {
    categoryState: {
      list: mockCategories
    }
  }

  const mockEntries: Entrys[] = [
    { id: 'A1', idCategoria: 'A', description: 'Gasto com turismo', category: 'Turismo', date: '30/03/2025', value: 100 },
    { id: 'A2', idCategoria: 'A', description: 'Gasto com paisagismo', category: 'Paisagismo', date: '30/03/2025', value: 50 }
  ]

  beforeEach(async () => {
    const dialogRefMock = {
      afterOpened: jest.fn().mockReturnValue(of()),
      afterClosed: jest.fn().mockReturnValue(of(true)),
      close: jest.fn()
    }

    global.HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
      clearRect: jest.fn()
    })) as any

    jest.mock('chart.js', () => ({
      Chart: jest.fn().mockImplementation(() => ({
        destroy: jest.fn(),
        update: jest.fn()
      })),
      registerables: []
    }));

    global.MutationObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      disconnect: jest.fn()
    }))

    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn()
    }))

    await TestBed.configureTestingModule({
      declarations: [EntrysManagerComponent],
      imports: [
        TranslateTestingModule.withTranslations({}),
        HttpClientTestingModule
      ],
      providers: [
        provideMockStore({ initialState }),
        { provide: MatDialog, useValue: { open: jest.fn().mockReturnValue(dialogRefMock) } },
        { provide: MatSnackBar, useValue: { open: jest.fn() } }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrysManagerComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    mockDialog = TestBed.inject(MatDialog);
    mockSnackbar = TestBed.inject(MatSnackBar)
    mockEntryApiService = TestBed.inject(EntrysApiService)

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize observers and load data', () => {
    const apiSpy = jest.spyOn(mockEntryApiService, 'list')

    component.ngOnInit();

    expect(MutationObserver).toHaveBeenCalled()
    expect(ResizeObserver).toHaveBeenCalled()
    expect(apiSpy).toHaveBeenCalled()
  })

  it('should set up MutationObserver for theme changes', () => {
    const mutationInstance = (global.MutationObserver as jest.Mock).mock.results[0].value

    expect(mutationInstance.observe).toHaveBeenCalledWith(document.body, {
      attributes: true,
      attributeFilter: ['class']
    })
  })

  it('should set up ResizeObserver for resize events', () => {
    const resizeIntance = (global.ResizeObserver as jest.Mock).mock.results[0].value

    expect(resizeIntance.observe).toHaveBeenCalledWith(document.body)
  })

  it('should load entrys with categories and create chart', () => {
    const apiSpy = jest.spyOn(mockEntryApiService, 'list').mockReturnValue(of(mockEntries))
    mockStore.overrideSelector(selectCategories, mockCategories)
    component.load()

    expect(apiSpy).toHaveBeenCalled()
    expect(component.initialState[0].id).toEqual(mockEntries[0].id)
  })

  it('should open EntrysFormComponent dialog', () => {
    const openDialogSpy = jest.spyOn(mockDialog, 'open')

    component.open()

    expect(openDialogSpy).toHaveBeenCalledWith(EntrysFormComponent, {
      position: {
        top: '24px'
      },
      autoFocus: false
    })
  })

  it('should call remove method with entry id', () => {
    const apiSpy = jest.spyOn(mockEntryApiService, 'remove')
    const mockEntry = mockEntries[0]

    component.removeEntry(mockEntry)

    expect(apiSpy).toHaveBeenCalledWith(mockEntry.id)
  })

  describe('filters', () => {
    beforeEach(() => {
      component.initialState = mockEntries
      component.itemsSubj.next(mockEntries)
    })

    it('should filter by description', () => {
      const filterEvent = { description: 'Gasto com turis', categories: [] }
      component.filterByFields(filterEvent)

      const filteredItems = component.itemsSubj.getValue()
      expect(filteredItems.length).toBe(1)
      expect(filteredItems[0].description).toBe('Gasto com turismo')
    })
  })
});
