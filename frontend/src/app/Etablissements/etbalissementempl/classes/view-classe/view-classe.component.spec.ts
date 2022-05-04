import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClasseComponent } from './view-classe.component';

describe('ViewClasseComponent', () => {
  let component: ViewClasseComponent;
  let fixture: ComponentFixture<ViewClasseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewClasseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
