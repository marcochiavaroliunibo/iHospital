import { TestBed } from '@angular/core/testing';

import { ValueStatusService } from './value-status.service';

describe('ValueStatusService', () => {
  let service: ValueStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValueStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
