import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMatiereComponent } from './get-matiere.component';

describe('GetMatiereComponent', () => {
  let component: GetMatiereComponent;
  let fixture: ComponentFixture<GetMatiereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetMatiereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
