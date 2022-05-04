import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursEtudiantsComponent } from './cours-etudiants.component';

describe('CoursEtudiantsComponent', () => {
  let component: CoursEtudiantsComponent;
  let fixture: ComponentFixture<CoursEtudiantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursEtudiantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursEtudiantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
