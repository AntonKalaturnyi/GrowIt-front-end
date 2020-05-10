import { TestBed } from '@angular/core/testing';

import { InvestorCabinetService } from './investor-cabinet.service';

describe('InvestorCabinetService', () => {
  let service: InvestorCabinetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestorCabinetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
