import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateExerciceComponent } from './update-exercice.component';

describe('UpdateExerciceComponent', () => {
  let component: UpdateExerciceComponent;
  let fixture: ComponentFixture<UpdateExerciceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateExerciceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateExerciceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
