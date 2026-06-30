import { MenuItem } from '../core/models/menu-item.model';
import { ROUTES } from '../core/constants/routes.constants';

/** Bottom-nav items for the admin area. */
export const ADMIN_NAV: MenuItem[] = [
  { label: 'Home', icon: '🏠', route: ROUTES.admin.home },
  { label: 'Menu', icon: '☰', route: ROUTES.admin.menu },
  { label: 'Profile', icon: '👤', route: ROUTES.admin.profile },
];
