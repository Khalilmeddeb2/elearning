import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEnfantsComponent } from './list-enfants.component';

describe('ListEnfantsComponent', () => {
  let component: ListEnfantsComponent;
  let fixture: ComponentFixture<ListEnfantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEnfantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEnfantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
