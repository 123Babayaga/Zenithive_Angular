import { TestBed } from '@angular/core/testing';

import { ReusableUiComponentsService } from './reusable-ui-components.service';

describe('ReusableUiComponentsService', () => {
  let service: ReusableUiComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReusableUiComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
