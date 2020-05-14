import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisableSortOnColumnComponent } from './disable-sort-on-column.component';

describe('DisableSortOnColumnComponent', () => {
  let component: DisableSortOnColumnComponent;
  let fixture: ComponentFixture<DisableSortOnColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisableSortOnColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisableSortOnColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
