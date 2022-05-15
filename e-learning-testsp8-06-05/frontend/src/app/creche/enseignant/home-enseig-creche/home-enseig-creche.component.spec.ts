import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnseigCrecheComponent } from './home-enseig-creche.component';

describe('HomeEnseigCrecheComponent', () => {
  let component: HomeEnseigCrecheComponent;
  let fixture: ComponentFixture<HomeEnseigCrecheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeEnseigCrecheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeEnseigCrecheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
