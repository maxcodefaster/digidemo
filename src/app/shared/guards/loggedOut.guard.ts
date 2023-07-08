import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const loggedOutGuard = async (): Promise<boolean | UrlTree> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (await authService.isLoggedIn) {
    return router.parseUrl('/home');
  }
  return true;
};
