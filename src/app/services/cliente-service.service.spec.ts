import { TestBed, inject } from '@angular/core/testing';

import { ClienteServiceService } from './cliente-service.service';

describe('ClienteServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClienteServiceService]
    });
  });

  it('should be created', inject([ClienteServiceService], (service: ClienteServiceService) => {
    expect(service).toBeTruthy();
  }));
});
