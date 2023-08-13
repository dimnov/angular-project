import { TestBed } from '@angular/core/testing';

import { SeachService } from './search.service';

describe('SeachService', () => {
  let service: SeachService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeachService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
