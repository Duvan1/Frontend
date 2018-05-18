import { TestBed, inject } from '@angular/core/testing';

import { EmpleadoServiceService } from './empleado-service.service';

describe('EmpleadoServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmpleadoServiceService]
    });
  });

  it('should be created', inject([EmpleadoServiceService], (service: EmpleadoServiceService) => {
    expect(service).toBeTruthy();
  }));
});
