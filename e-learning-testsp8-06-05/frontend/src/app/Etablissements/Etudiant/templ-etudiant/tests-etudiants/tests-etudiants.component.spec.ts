import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsEtudiantsComponent } from './tests-etudiants.component';

describe('TestsEtudiantsComponent', () => {
  let component: TestsEtudiantsComponent;
  let fixture: ComponentFixture<TestsEtudiantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsEtudiantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsEtudiantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
