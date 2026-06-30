import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { AppUser } from '../models/user.model';
import { UserRole } from '../constants/app.constants';
import { HOME_BY_ROLE, ROUTES } from '../constants/routes.constants';
import { ActionResult } from '../models/api-response.model';

/**
 * AuthService — authentication flow PLACEHOLDER.
 *
 * This starter ships in "demo mode": login() accepts any email/password and
 * signs you in as the chosen role so the navigation flow works with no backend.
 *
 * To make it real:
 *   1. Put your Firebase config in src/environments/environment*.ts
 *   2. Replace the demo body of login() with signInWithEmailAndPassword(...)
 *      and load the profile from Firestore `users/{uid}` (see loadProfile TODO).
 *   3. Wire onAuthStateChanged in the constructor to restore sessions.
 *
 * `Auth` and `Firestore` are injected already so the providers are validated
 * and you only need to fill in the method bodies.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private fs = inject(Firestore);
  private router = inject(Router);

  private _user = signal<AppUser | null>(null);
  readonly currentUser = this._user.asReadonly();

  private _ready = signal(true); // demo: ready immediately. Real: flip after onAuthStateChanged.
  readonly authReady = this._ready.asReadonly();

  constructor() {
    // TODO (real auth): restore session
    // onAuthStateChanged(this.auth, async (fbUser) => {
    //   this._user.set(fbUser ? await this.loadProfile(fbUser.uid) : null);
    //   this._ready.set(true);
    // });
  }

  /** DEMO login — replace body with real Firebase auth. */
  async login(email: string, _password: string, role: UserRole = 'customer'): Promise<ActionResult<AppUser>> {
    // ── Placeholder: build a mock user from the selected role ──
    const user: AppUser = {
      uid: 'demo-' + role,
      email: email || `${role}@example.com`,
      full_name: this.titleCase(role) + ' User',
      user_type: role,
      is_active: true,
    };
    this._user.set(user);
    return { success: true, data: user };

    // ── Real implementation (uncomment & remove the demo block above) ──
    // try {
    //   const cred = await signInWithEmailAndPassword(this.auth, email, password);
    //   const profile = await this.loadProfile(cred.user.uid);
    //   if (!profile) return { success: false, message: 'Profile not found.' };
    //   this._user.set(profile);
    //   return { success: true, data: profile };
    // } catch (e: any) {
    //   return { success: false, message: 'Login failed.' };
    // }
  }

  /** DEMO register — replace with createUserWithEmailAndPassword + profile write. */
  async register(_data: { email: string; password: string; full_name: string }): Promise<ActionResult> {
    // TODO: implement real registration
    return { success: true };
  }

  async logout(): Promise<void> {
    // TODO (real auth): await signOut(this.auth);
    this._user.set(null);
    this.router.navigate([ROUTES.auth.login]);
  }

  /** Navigate to the logged-in user's role home. */
  goHome(): void {
    const role = this._user()?.user_type;
    this.router.navigate([role ? HOME_BY_ROLE[role] : ROUTES.auth.login]);
  }

  isLoggedIn(): boolean { return !!this._user(); }
  isAdmin(): boolean { return this._user()?.user_type === 'admin'; }
  isCustomer(): boolean { return this._user()?.user_type === 'customer'; }
  isEmployee(): boolean { return this._user()?.user_type === 'employee'; }

  // private async loadProfile(uid: string): Promise<AppUser | null> {
  //   const snap = await getDoc(doc(this.fs, COLLECTIONS.users, uid));
  //   return snap.exists() ? (snap.data() as AppUser) : null;
  // }

  private titleCase(s: string): string { return s.charAt(0).toUpperCase() + s.slice(1); }
}
