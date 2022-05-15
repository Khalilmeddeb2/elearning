import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCoursByDescriptionEtudiantsComponent } from './view-cours-by-description-etudiants.component';

describe('ViewCoursByDescriptionEtudiantsComponent', () => {
  let component: ViewCoursByDescriptionEtudiantsComponent;
  let fixture: ComponentFixture<ViewCoursByDescriptionEtudiantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCoursByDescriptionEtudiantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCoursByDescriptionEtudiantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
