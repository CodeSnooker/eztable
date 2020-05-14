import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondensedTableComponent } from './condensed-table.component';

describe('CondensedTableComponent', () => {
  let component: CondensedTableComponent;
  let fixture: ComponentFixture<CondensedTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondensedTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondensedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
