import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSortedUsingTableColumnComponent } from './pre-sorted-using-table-column.component';

describe('PreSortedUsingTableColumnComponent', () => {
  let component: PreSortedUsingTableColumnComponent;
  let fixture: ComponentFixture<PreSortedUsingTableColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreSortedUsingTableColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreSortedUsingTableColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
