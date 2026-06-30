import { UserRole } from '../constants/app.constants';

/** Authenticated user profile (stored in the `users` collection, keyed by uid). */
export interface AppUser {
  uid: string;
  email: string;
  full_name: string;
  user_type: UserRole;
  is_active: boolean;
  // Optional links to other domain collections — add as your app grows.
  photoUrl?: string;
  phone?: string;
}
