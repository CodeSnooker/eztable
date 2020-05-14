import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisableSortingComponent } from './disable-sorting.component';

describe('DisableSortingComponent', () => {
  let component: DisableSortingComponent;
  let fixture: ComponentFixture<DisableSortingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisableSortingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisableSortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
