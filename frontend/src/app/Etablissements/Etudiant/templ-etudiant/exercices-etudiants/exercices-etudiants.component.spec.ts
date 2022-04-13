import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercicesEtudiantsComponent } from './exercices-etudiants.component';

describe('ExercicesEtudiantsComponent', () => {
  let component: ExercicesEtudiantsComponent;
  let fixture: ComponentFixture<ExercicesEtudiantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExercicesEtudiantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercicesEtudiantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
