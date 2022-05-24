import { TestBed } from '@angular/core/testing';

import { MedicAssignmentService } from './medic-assignment.service';

describe('MedicAssignmentService', () => {
  let service: MedicAssignmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicAssignmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
