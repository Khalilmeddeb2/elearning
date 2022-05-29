import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePhotoEtudiantComponent } from './update-photo-etudiant.component';

describe('UpdatePhotoEtudiantComponent', () => {
  let component: UpdatePhotoEtudiantComponent;
  let fixture: ComponentFixture<UpdatePhotoEtudiantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePhotoEtudiantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePhotoEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
