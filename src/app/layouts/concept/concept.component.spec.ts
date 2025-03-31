import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptLayout } from './concept.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateTestingModule } from 'ngx-translate-testing';

describe('ConceptComponent', () => {
  let component: ConceptLayout;
  let fixture: ComponentFixture<ConceptLayout>;
  let activatedRouteMock: jest.MockedObject<ActivatedRoute>
  let urlSubject = new Subject()

  beforeEach(async () => {

    activatedRouteMock = {
      url: urlSubject.asObservable()
    } as any

    const localStorageMock = (function() {
      let store: Record<string, string> = {};

      return {
        getItem: jest.fn((key: string) => store[key] || null),
        setItem: jest.fn((key: string, value: string) => {
          store[key] = value.toString()
        }),
        clear: jest.fn(() => {
          store = {}
        })
      }
    })();

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock
    })

    await TestBed.configureTestingModule({
      declarations: [ ConceptLayout ],
      imports: [
        TranslateTestingModule.withTranslations({}),
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should initialize with dark theme if localStorage has dark theme', () => {
    localStorage.setItem('theme', 'dark');
    const spyDark = jest.spyOn(component, 'setupDark')
    const spyLight = jest.spyOn(component, 'setupLight')

    component.ngOnInit();

    expect(spyDark).toHaveBeenCalled()
    expect(spyLight).not.toHaveBeenCalled()
  })

  it('should subscribe to route changes and update currentUrl', () => {
    const mockUrl = [{ path: 'category' }]
    component.ngOnInit()

    urlSubject.next(mockUrl)

    expect(component.currentUrl).toBe('/category')
  })

  it('should unsubscribe$ completed', () => {
    const spyNext = jest.spyOn(component['unsubscribe$'], 'next')
    const spyComplete = jest.spyOn(component['unsubscribe$'], 'complete')

    component.ngOnDestroy()

    expect(spyNext).toHaveBeenCalledWith();
    expect(spyComplete).toHaveBeenCalled();
  })

  it('setulLight should remove dark-theme class and set light theme in localStorage', () => {
    component.setupLight();

    expect(document.body.classList.contains('dark-theme')).toBeFalsy();
    expect(localStorage.getItem('theme')).toBe('light')
  })
});
