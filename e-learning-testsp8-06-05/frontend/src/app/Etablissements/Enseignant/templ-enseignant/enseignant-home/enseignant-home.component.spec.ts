import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnseignantHomeComponent } from './enseignant-home.component';

describe('EnseignantHomeComponent', () => {
  let component: EnseignantHomeComponent;
  let fixture: ComponentFixture<EnseignantHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnseignantHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnseignantHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
