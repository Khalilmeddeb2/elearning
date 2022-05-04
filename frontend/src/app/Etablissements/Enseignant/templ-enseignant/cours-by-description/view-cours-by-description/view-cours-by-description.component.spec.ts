import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCoursByDescriptionComponent } from './view-cours-by-description.component';

describe('ViewCoursByDescriptionComponent', () => {
  let component: ViewCoursByDescriptionComponent;
  let fixture: ComponentFixture<ViewCoursByDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCoursByDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCoursByDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
