import { TestBed } from '@angular/core/testing';
import { SelectCheckboxService } from './select-checkbox.service';

describe('SelectCheckboxService', () => {
  let service: SelectCheckboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectCheckboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
