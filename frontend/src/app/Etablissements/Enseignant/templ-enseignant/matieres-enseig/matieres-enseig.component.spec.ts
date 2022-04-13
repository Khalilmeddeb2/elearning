import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatieresEnseigComponent } from './matieres-enseig.component';

describe('MatieresEnseigComponent', () => {
  let component: MatieresEnseigComponent;
  let fixture: ComponentFixture<MatieresEnseigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatieresEnseigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatieresEnseigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
