import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisableSortWithPreSortColumnComponent } from './disable-sort-with-pre-sort-column.component';

describe('DisableSortWithPreSortColumnComponent', () => {
  let component: DisableSortWithPreSortColumnComponent;
  let fixture: ComponentFixture<DisableSortWithPreSortColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisableSortWithPreSortColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisableSortWithPreSortColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
