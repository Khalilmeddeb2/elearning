import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplParentComponent } from './templ-parent.component';

describe('TemplParentComponent', () => {
  let component: TemplParentComponent;
  let fixture: ComponentFixture<TemplParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
