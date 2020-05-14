import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EzHeaderComponent } from './ez-header.component';

describe('EzHeaderComponent', () => {
  let component: EzHeaderComponent;
  let fixture: ComponentFixture<EzHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EzHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EzHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
