import { TestBed } from '@angular/core/testing';

import { VitalValueService } from './vital-value.service';

describe('VitalValueService', () => {
  let service: VitalValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VitalValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
