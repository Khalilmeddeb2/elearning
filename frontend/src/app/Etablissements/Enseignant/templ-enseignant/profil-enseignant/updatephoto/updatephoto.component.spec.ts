import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatephotoComponent } from './updatephoto.component';

describe('UpdatephotoComponent', () => {
  let component: UpdatephotoComponent;
  let fixture: ComponentFixture<UpdatephotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatephotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatephotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
