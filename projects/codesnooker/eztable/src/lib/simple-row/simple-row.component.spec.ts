import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleRowComponent } from './simple-row.component';

describe('SimpleRowComponent', () => {
  let component: SimpleRowComponent;
  let fixture: ComponentFixture<SimpleRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
