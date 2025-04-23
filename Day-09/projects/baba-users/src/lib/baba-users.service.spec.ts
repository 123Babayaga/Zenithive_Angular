import { TestBed } from '@angular/core/testing';

import { BabaUsersService } from './baba-users.service';

describe('BabaUsersService', () => {
  let service: BabaUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BabaUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
