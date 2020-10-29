import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomRowComponentComponent } from './custom-row-component.component';

describe('CustomRowComponentComponent', () => {
  let component: CustomRowComponentComponent;
  let fixture: ComponentFixture<CustomRowComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomRowComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomRowComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
