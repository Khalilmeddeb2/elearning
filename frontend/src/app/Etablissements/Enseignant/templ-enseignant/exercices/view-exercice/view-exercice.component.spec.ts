import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExerciceComponent } from './view-exercice.component';

describe('ViewExerciceComponent', () => {
  let component: ViewExerciceComponent;
  let fixture: ComponentFixture<ViewExerciceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewExerciceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewExerciceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
