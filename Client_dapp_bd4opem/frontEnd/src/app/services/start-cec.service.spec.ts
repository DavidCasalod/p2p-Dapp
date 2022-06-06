import { TestBed } from '@angular/core/testing';

import { StartCecService } from './start-cec.service';

describe('StartCecService', () => {
  let service: StartCecService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StartCecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
