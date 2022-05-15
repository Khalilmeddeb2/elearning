import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCoursByDescriptionComponent } from './update-cours-by-description.component';

describe('UpdateCoursByDescriptionComponent', () => {
  let component: UpdateCoursByDescriptionComponent;
  let fixture: ComponentFixture<UpdateCoursByDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCoursByDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCoursByDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
