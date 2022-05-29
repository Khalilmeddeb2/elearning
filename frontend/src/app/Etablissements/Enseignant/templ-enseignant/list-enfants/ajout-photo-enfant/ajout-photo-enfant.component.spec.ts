import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutPhotoEnfantComponent } from './ajout-photo-enfant.component';

describe('AjoutPhotoEnfantComponent', () => {
  let component: AjoutPhotoEnfantComponent;
  let fixture: ComponentFixture<AjoutPhotoEnfantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutPhotoEnfantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutPhotoEnfantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
