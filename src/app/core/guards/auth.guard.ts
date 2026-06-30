import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ROUTES } from '../constants/routes.constants';

/** Allows the route only when a user is logged in; otherwise → login. */
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) return true;
  router.navigate([ROUTES.auth.login]);
  return false;
};
