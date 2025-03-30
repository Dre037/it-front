import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrysListComponent } from './entrys-list.component';

describe('EntrysListComponent', () => {
  let component: EntrysListComponent;
  let fixture: ComponentFixture<EntrysListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrysListComponent ]
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
});
