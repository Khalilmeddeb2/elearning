import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoursByDescriptionComponent } from './add-cours-by-description.component';

describe('AddCoursByDescriptionComponent', () => {
  let component: AddCoursByDescriptionComponent;
  let fixture: ComponentFixture<AddCoursByDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCoursByDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCoursByDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
