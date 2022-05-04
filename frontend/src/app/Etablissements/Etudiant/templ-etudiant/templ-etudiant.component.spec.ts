import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplEtudiantComponent } from './templ-etudiant.component';

describe('TemplEtudiantComponent', () => {
  let component: TemplEtudiantComponent;
  let fixture: ComponentFixture<TemplEtudiantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplEtudiantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
