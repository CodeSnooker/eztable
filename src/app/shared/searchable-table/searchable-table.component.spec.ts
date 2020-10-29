import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchableTableComponent } from './searchable-table.component';

describe('SearchableTableComponent', () => {
  let component: SearchableTableComponent;
  let fixture: ComponentFixture<SearchableTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchableTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchableTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
