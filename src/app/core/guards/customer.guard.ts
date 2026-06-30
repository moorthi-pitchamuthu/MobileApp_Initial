import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HOME_BY_ROLE, ROUTES } from '../constants/routes.constants';

/** Restricts a route to customer users. */
export const customerGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isCustomer()) return true;
  const role = auth.currentUser()?.user_type;
  router.navigate([role ? HOME_BY_ROLE[role] : ROUTES.auth.login]);
  return false;
};
