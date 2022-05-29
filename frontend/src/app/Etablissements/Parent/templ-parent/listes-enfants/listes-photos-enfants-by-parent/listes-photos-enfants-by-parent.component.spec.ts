import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListesPhotosEnfantsByParentComponent } from './listes-photos-enfants-by-parent.component';

describe('ListesPhotosEnfantsByParentComponent', () => {
  let component: ListesPhotosEnfantsByParentComponent;
  let fixture: ComponentFixture<ListesPhotosEnfantsByParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListesPhotosEnfantsByParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListesPhotosEnfantsByParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
