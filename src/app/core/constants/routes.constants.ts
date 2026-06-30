/**
 * Centralized route path strings. Reference these instead of hardcoding
 * route literals so a path change happens in exactly one place.
 */
export const ROUTES = {
  auth: {
    root: 'auth',
    login: 'auth/login',
    register: 'auth/register',
  },
  admin: {
    root: 'admin',
    home: 'admin/home',
    menu: 'admin/menu',
    appManagement: 'admin/app-management',
    profile: 'admin/profile',
  },
  customer: {
    root: 'customer',
    dashboard: 'customer/dashboard',
    menu: 'customer/menu',
    profile: 'customer/profile',
  },
  employee: {
    root: 'employee',
    home: 'employee/home',
    menu: 'employee/menu',
    profile: 'employee/profile',
  },
} as const;

/** Landing route for a given role after login. */
export const HOME_BY_ROLE: Record<string, string> = {
  admin: ROUTES.admin.home,
  customer: ROUTES.customer.dashboard,
  employee: ROUTES.employee.home,
};
