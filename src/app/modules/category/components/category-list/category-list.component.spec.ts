import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListComponent } from './category-list.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Category } from '@category/shared/interfaces/category';
import { By } from '@angular/platform-browser';

describe('CategoryListComponent', () => {
  let component: CategoryListComponent;
  let fixture: ComponentFixture<CategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryListComponent ],
      imports: [MatChipsModule, MatIconModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('registry chips correctaly', () => {
    const mockCategories: Category[] = [
      { id: 'A', name: 'Turismo' },
      { id: 'B', name: 'Paisagismo' }
    ]

    component.items = mockCategories
    fixture.detectChanges()

    const chips = fixture.nativeElement.querySelectorAll('mat-chip');
    expect(chips.length).toBe(mockCategories.length);
  })

  it('check remove event emitted', () => {
    const emitSpy = jest.spyOn(component.remove, 'emit');

    const mockCategory: Category = { id: 'A', name: 'Turismo' }
    component.items = [mockCategory]
    fixture.detectChanges()

    const deleteButton = fixture.debugElement.query(By.css('button'))
    const event = { preventDefault: jest.fn(), stopPropagation: jest.fn() }
    deleteButton.triggerEventHandler('click', event)

    expect(emitSpy).toHaveBeenCalledWith(mockCategory)
    expect(event.preventDefault).toHaveBeenCalled()
    expect(event.stopPropagation).toHaveBeenCalled()
  })
});
