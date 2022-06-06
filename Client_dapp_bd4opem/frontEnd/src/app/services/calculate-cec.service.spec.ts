import { TestBed } from '@angular/core/testing';

import { CalculateCecService } from './calculate-cec.service';

describe('CalculateCecService', () => {
  let service: CalculateCecService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculateCecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
