import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableIntroComponent } from './table-intro.component';

describe('TableIntroComponent', () => {
  let component: TableIntroComponent;
  let fixture: ComponentFixture<TableIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
