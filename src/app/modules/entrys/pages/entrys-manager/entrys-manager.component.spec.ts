import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrysManagerComponent } from './entrys-manager.component';

describe('EntrysManagerComponent', () => {
  let component: EntrysManagerComponent;
  let fixture: ComponentFixture<EntrysManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrysManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrysManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
