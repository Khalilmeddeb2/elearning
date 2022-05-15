import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirNotesEtudiantsComponent } from './voir-notes-etudiants.component';

describe('VoirNotesEtudiantsComponent', () => {
  let component: VoirNotesEtudiantsComponent;
  let fixture: ComponentFixture<VoirNotesEtudiantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoirNotesEtudiantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoirNotesEtudiantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
