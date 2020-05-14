import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSortedComponent } from './pre-sorted.component';

describe('PreSortedComponent', () => {
  let component: PreSortedComponent;
  let fixture: ComponentFixture<PreSortedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreSortedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreSortedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
