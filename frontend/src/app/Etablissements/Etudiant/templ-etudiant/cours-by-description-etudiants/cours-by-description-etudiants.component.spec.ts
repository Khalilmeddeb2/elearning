import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursByDescriptionEtudiantsComponent } from './cours-by-description-etudiants.component';

describe('CoursByDescriptionEtudiantsComponent', () => {
  let component: CoursByDescriptionEtudiantsComponent;
  let fixture: ComponentFixture<CoursByDescriptionEtudiantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursByDescriptionEtudiantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursByDescriptionEtudiantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
