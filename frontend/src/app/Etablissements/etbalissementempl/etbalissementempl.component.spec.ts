import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtbalissementemplComponent } from './etbalissementempl.component';

describe('EtbalissementemplComponent', () => {
  let component: EtbalissementemplComponent;
  let fixture: ComponentFixture<EtbalissementemplComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtbalissementemplComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtbalissementemplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
