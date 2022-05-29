import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEnfantComponent } from './update-enfant.component';

describe('UpdateEnfantComponent', () => {
  let component: UpdateEnfantComponent;
  let fixture: ComponentFixture<UpdateEnfantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateEnfantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEnfantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
