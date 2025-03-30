import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrysFilterComponent } from './entrys-filter.component';

describe('EntrysFilterComponent', () => {
  let component: EntrysFilterComponent;
  let fixture: ComponentFixture<EntrysFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrysFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrysFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
