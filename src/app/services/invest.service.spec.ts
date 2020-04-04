import { TestBed } from '@angular/core/testing';

import { InvestService } from './invest.service';

describe('InvestService', () => {
  let service: InvestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
