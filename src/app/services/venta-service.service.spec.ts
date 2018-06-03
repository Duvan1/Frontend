import { TestBed, inject } from '@angular/core/testing';

import { VentaServiceService } from './venta-service.service';

describe('VentaServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VentaServiceService]
    });
  });

  it('should be created', inject([VentaServiceService], (service: VentaServiceService) => {
    expect(service).toBeTruthy();
  }));
});
