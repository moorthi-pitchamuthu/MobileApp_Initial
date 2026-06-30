/** Generic API response wrapper for REST endpoints (if/when you use them). */
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

/** Generic result for an action (login, save, etc.). */
export interface ActionResult<T = void> {
  success: boolean;
  message?: string;
  data?: T;
}
