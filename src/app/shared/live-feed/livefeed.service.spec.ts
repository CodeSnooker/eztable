import { TestBed } from '@angular/core/testing';

import { LivefeedService } from './livefeed.service';

describe('LivefeedService', () => {
  let service: LivefeedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LivefeedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
