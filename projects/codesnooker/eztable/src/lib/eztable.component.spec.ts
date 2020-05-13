import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EztableComponent } from './eztable.component';

describe('EztableComponent', () => {
  let component: EztableComponent;
  let fixture: ComponentFixture<EztableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EztableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EztableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
