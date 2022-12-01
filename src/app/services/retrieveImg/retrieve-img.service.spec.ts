import { TestBed } from '@angular/core/testing';

import { RetrieveImgService } from './retrieve-img.service';

describe('RetrieveImgService', () => {
  let service: RetrieveImgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetrieveImgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
