import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfilePassowrdComponent } from './update-profile-passowrd.component';

describe('UpdateProfilePassowrdComponent', () => {
  let component: UpdateProfilePassowrdComponent;
  let fixture: ComponentFixture<UpdateProfilePassowrdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateProfilePassowrdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfilePassowrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
