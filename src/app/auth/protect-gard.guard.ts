import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const protectGardGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router)
  let token = localStorage.getItem('token');
  if (!token) {
    _Router.navigate(['/login'])
  }
  return true;
};
