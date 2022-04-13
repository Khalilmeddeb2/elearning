import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateCrecheComponent } from './template-creche.component';

describe('TemplateCrecheComponent', () => {
  let component: TemplateCrecheComponent;
  let fixture: ComponentFixture<TemplateCrecheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateCrecheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateCrecheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
