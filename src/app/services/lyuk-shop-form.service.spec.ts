import { TestBed } from '@angular/core/testing';

import { LyukShopFormService } from './lyuk-shop-form.service';

describe('LyukShopFormService', () => {
  let service: LyukShopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LyukShopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
