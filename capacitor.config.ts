import type { CapacitorConfig } from '@capacitor/cli';

/**
 * Capacitor configuration for the starter template.
 *
 * NOTE: The native `android/` folder is intentionally NOT included in this starter.
 * When you are ready to build a native app, run:  npm run cap:add:android
 * then:  npm run build:apk
 *
 * Brand colors (splash / status bar) are duplicated here on purpose — native shells
 * cannot read CSS variables. Keep these in sync with --primary in src/theme/_tokens.scss.
 */
const config: CapacitorConfig = {
  appId: 'com.example.mobileapp',
  appName: 'MobileApp',
  webDir: 'dist/mobile-app-starter/browser',
  server: {
    androidScheme: 'https'
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: false,
    // Eliminate 300ms tap delay — makes all button/tab taps feel instant
    initialFocus: false
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      backgroundColor: '#4f46e5',
      showSpinner: false
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#4f46e5'
    }
  }
};

export default config;
