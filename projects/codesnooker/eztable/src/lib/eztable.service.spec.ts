import { TestBed } from '@angular/core/testing';

import { EztableService } from './eztable.service';

describe('EztableService', () => {
  let service: EztableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EztableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
