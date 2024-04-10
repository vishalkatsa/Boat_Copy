import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { protectGardGuard } from './protect-gard.guard';

describe('protectGardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => protectGardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
