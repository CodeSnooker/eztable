import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoverableTableComponent } from './hoverable-table.component';

describe('HoverableTableComponent', () => {
  let component: HoverableTableComponent;
  let fixture: ComponentFixture<HoverableTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoverableTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoverableTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
