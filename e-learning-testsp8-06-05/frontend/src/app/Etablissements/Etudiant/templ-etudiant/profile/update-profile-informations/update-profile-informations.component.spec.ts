import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfileInformationsComponent } from './update-profile-informations.component';

describe('UpdateProfileInformationsComponent', () => {
  let component: UpdateProfileInformationsComponent;
  let fixture: ComponentFixture<UpdateProfileInformationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateProfileInformationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfileInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
