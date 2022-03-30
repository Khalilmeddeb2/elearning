import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursByDescriptionComponent } from './cours-by-description.component';

describe('CoursByDescriptionComponent', () => {
  let component: CoursByDescriptionComponent;
  let fixture: ComponentFixture<CoursByDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursByDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursByDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
