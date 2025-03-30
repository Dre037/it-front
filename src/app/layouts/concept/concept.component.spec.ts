import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptLayout } from './concept.component';

describe('ConceptComponent', () => {
  let component: ConceptLayout;
  let fixture: ComponentFixture<ConceptLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptLayout ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
