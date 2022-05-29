import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInformationsComponent } from './update-informations.component';

describe('UpdateInformationsComponent', () => {
  let component: UpdateInformationsComponent;
  let fixture: ComponentFixture<UpdateInformationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateInformationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
