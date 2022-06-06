import { TestBed } from '@angular/core/testing';

import { ReadCecService } from './read-cec.service';

describe('ReadCecService', () => {
  let service: ReadCecService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadCecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
