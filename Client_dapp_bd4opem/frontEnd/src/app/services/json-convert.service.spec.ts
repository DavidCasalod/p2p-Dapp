import { TestBed } from '@angular/core/testing';

import { JsonConvertService } from './json-convert.service';

describe('JsonConvertService', () => {
  let service: JsonConvertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonConvertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
