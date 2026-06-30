/** A single entry on a menu / dashboard / bottom-nav. */
export interface MenuItem {
  /** i18n key or plain label. */
  label: string;
  /** Emoji or icon class for the tile/nav. */
  icon: string;
  /** Router path to navigate to. */
  route: string;
  /** Optional badge count. */
  badge?: number;
}
