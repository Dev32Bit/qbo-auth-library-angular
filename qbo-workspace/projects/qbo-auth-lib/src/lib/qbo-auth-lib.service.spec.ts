import { TestBed } from '@angular/core/testing';

import { QboAuthService } from './qbo-auth-lib.service';

describe('QboAuthLibService', () => {
  let service: QboAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QboAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
