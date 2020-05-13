import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleRowComponent } from './sample-row.component';

describe('SampleRowComponent', () => {
  let component: SampleRowComponent;
  let fixture: ComponentFixture<SampleRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
