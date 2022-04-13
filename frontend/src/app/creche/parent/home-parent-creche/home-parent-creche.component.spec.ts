import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeParentCrecheComponent } from './home-parent-creche.component';

describe('HomeParentCrecheComponent', () => {
  let component: HomeParentCrecheComponent;
  let fixture: ComponentFixture<HomeParentCrecheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeParentCrecheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeParentCrecheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
