import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesAllDemosComponent } from './pages-all-demos.component';

describe('PagesAllDemosComponent', () => {
  let component: PagesAllDemosComponent;
  let fixture: ComponentFixture<PagesAllDemosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesAllDemosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesAllDemosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
