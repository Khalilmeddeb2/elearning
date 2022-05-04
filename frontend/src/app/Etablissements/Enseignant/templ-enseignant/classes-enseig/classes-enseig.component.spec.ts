import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesEnseigComponent } from './classes-enseig.component';

describe('ClassesEnseigComponent', () => {
  let component: ClassesEnseigComponent;
  let fixture: ComponentFixture<ClassesEnseigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassesEnseigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesEnseigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
