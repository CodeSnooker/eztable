import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomRowCheckboxDemoComponent } from './custom-row-checkbox-demo.component';

describe('CustomRowCheckboxDemoComponent', () => {
  let component: CustomRowCheckboxDemoComponent;
  let fixture: ComponentFixture<CustomRowCheckboxDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomRowCheckboxDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomRowCheckboxDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
