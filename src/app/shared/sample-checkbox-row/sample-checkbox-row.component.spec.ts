import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleCheckboxRowComponent } from './sample-checkbox-row.component';

describe('SampleCheckboxRowComponent', () => {
  let component: SampleCheckboxRowComponent;
  let fixture: ComponentFixture<SampleCheckboxRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleCheckboxRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleCheckboxRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
