import { TestBed } from '@angular/core/testing';

import { BorrowerCabinetService } from './borrower-cabinet.service';

describe('BorrowerCabinetService', () => {
  let service: BorrowerCabinetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BorrowerCabinetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
