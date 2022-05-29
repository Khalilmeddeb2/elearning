import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadTestComponent } from './download-test.component';

describe('DownloadTestComponent', () => {
  let component: DownloadTestComponent;
  let fixture: ComponentFixture<DownloadTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
