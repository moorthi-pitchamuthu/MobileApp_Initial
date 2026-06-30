import { MenuItem } from '../core/models/menu-item.model';
import { ROUTES } from '../core/constants/routes.constants';

/** Bottom-nav items for the employee area. */
export const EMPLOYEE_NAV: MenuItem[] = [
  { label: 'Home', icon: '🏠', route: ROUTES.employee.home },
  { label: 'Menu', icon: '☰', route: ROUTES.employee.menu },
  { label: 'Profile', icon: '👤', route: ROUTES.employee.profile },
];
