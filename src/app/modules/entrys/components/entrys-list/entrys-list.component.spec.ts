import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrysListComponent } from './entrys-list.component';
import { MatTableModule } from '@angular/material/table';
import { Entrys } from '@entrys/shared/interfaces/entrys';
import { TranslateTestingModule } from 'ngx-translate-testing';

describe('EntrysListComponent', () => {
  let component: EntrysListComponent;
  let fixture: ComponentFixture<EntrysListComponent>;

  const entriesMock: Entrys[] = [
    { id: 'A1', idCategoria: 'A', description: 'Gasto com turismo', category: 'Turismo', date: '30/03/2025', value: 100 },
    { id: 'A2', idCategoria: 'A', description: 'Gasto com paisagismo', category: 'Paisagismo', date: '30/03/2025', value: 50}
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrysListComponent ],
      imports: [
        MatTableModule,
        TranslateTestingModule.withTranslations({})
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrysListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('compute totalCount correctly', () => {
    component.items = entriesMock

    expect(component.totalCount).toBe(150)
  })

  it('emit remove action when deleteEvent is called', () => {
    const entry = entriesMock[0]
    const removeSpy = jest.spyOn(component.remove, 'emit')

    component.deleteEvent(entry)

    expect(removeSpy).toHaveBeenCalledWith(entry)
  })
});
