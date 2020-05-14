import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlwaysResponsiveTableComponent } from './always-responsive-table.component';

describe('AlwaysResponsiveTableComponent', () => {
  let component: AlwaysResponsiveTableComponent;
  let fixture: ComponentFixture<AlwaysResponsiveTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlwaysResponsiveTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlwaysResponsiveTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
