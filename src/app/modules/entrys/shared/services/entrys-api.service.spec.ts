import { TestBed } from '@angular/core/testing';

import { EntrysApiService } from './entrys-api.service';

describe('EntrysApiService', () => {
  let service: EntrysApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntrysApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
