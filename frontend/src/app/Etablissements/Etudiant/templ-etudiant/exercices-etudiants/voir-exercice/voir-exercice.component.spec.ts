import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirExerciceComponent } from './voir-exercice.component';

describe('VoirExerciceComponent', () => {
  let component: VoirExerciceComponent;
  let fixture: ComponentFixture<VoirExerciceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoirExerciceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoirExerciceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
