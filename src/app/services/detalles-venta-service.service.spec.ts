import { TestBed, inject } from '@angular/core/testing';

import { DetallesVentaServiceService } from './detalles-venta-service.service';

describe('DetallesVentaServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetallesVentaServiceService]
    });
  });

  it('should be created', inject([DetallesVentaServiceService], (service: DetallesVentaServiceService) => {
    expect(service).toBeTruthy();
  }));
});
