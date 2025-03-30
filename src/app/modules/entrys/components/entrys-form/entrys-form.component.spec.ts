import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrysFormComponent } from './entrys-form.component';

describe('EntrysFormComponent', () => {
  let component: EntrysFormComponent;
  let fixture: ComponentFixture<EntrysFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrysFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrysFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
