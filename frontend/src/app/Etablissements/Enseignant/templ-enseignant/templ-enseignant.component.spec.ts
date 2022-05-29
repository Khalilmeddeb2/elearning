import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplEnseignantComponent } from './templ-enseignant.component';

describe('TemplEnseignantComponent', () => {
  let component: TemplEnseignantComponent;
  let fixture: ComponentFixture<TemplEnseignantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplEnseignantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
