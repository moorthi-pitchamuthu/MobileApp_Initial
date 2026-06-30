import { HttpInterceptorFn } from '@angular/common/http';

/**
 * authInterceptor — placeholder HTTP interceptor.
 *
 * This starter talks to Firestore directly (no REST calls need a token), so the
 * interceptor is a pass-through. If you add a REST API, attach the auth token here.
 *
 * Register it in app.config.ts:
 *   provideHttpClient(withInterceptors([authInterceptor]))
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // TODO: attach auth header, e.g.
  // const token = inject(AuthService).getToken();
  // if (token) req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  return next(req);
};
