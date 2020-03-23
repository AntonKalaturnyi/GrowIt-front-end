import { TestBed } from '@angular/core/testing';

import { PrevDataService } from './prev-data.service';

describe('PrevDataService', () => {
  let service: PrevDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrevDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
