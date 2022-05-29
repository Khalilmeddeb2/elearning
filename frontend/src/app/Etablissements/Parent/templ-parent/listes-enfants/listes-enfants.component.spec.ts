import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListesEnfantsComponent } from './listes-enfants.component';

describe('ListesEnfantsComponent', () => {
  let component: ListesEnfantsComponent;
  let fixture: ComponentFixture<ListesEnfantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListesEnfantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListesEnfantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
