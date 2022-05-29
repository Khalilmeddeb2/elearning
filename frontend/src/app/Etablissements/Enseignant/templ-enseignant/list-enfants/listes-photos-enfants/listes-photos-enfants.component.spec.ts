import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListesPhotosEnfantsComponent } from './listes-photos-enfants.component';

describe('ListesPhotosEnfantsComponent', () => {
  let component: ListesPhotosEnfantsComponent;
  let fixture: ComponentFixture<ListesPhotosEnfantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListesPhotosEnfantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListesPhotosEnfantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
