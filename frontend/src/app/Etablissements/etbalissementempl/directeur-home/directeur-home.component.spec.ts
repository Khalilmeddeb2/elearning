import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirecteurHomeComponent } from './directeur-home.component';

describe('DirecteurHomeComponent', () => {
  let component: DirecteurHomeComponent;
  let fixture: ComponentFixture<DirecteurHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirecteurHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirecteurHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
