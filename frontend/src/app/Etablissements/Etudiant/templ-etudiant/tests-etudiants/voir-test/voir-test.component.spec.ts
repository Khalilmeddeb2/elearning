import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirTestComponent } from './voir-test.component';

describe('VoirTestComponent', () => {
  let component: VoirTestComponent;
  let fixture: ComponentFixture<VoirTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoirTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoirTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
