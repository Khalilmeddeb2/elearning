import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCoursEnseignantComponent } from './view-cours-enseignant.component';

describe('ViewCoursEnseignantComponent', () => {
  let component: ViewCoursEnseignantComponent;
  let fixture: ComponentFixture<ViewCoursEnseignantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCoursEnseignantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCoursEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
