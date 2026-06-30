import { MenuItem } from '../core/models/menu-item.model';
import { ROUTES } from '../core/constants/routes.constants';

/** Bottom-nav items for the customer area. */
export const CUSTOMER_NAV: MenuItem[] = [
  { label: 'Home', icon: '🏠', route: ROUTES.customer.dashboard },
  { label: 'Menu', icon: '☰', route: ROUTES.customer.menu },
  { label: 'Profile', icon: '👤', route: ROUTES.customer.profile },
];
