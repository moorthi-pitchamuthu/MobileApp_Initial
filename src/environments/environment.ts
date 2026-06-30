/**
 * DEVELOPMENT environment.
 * Production values live in environment.prod.ts (swapped at build time by angular.json).
 *
 * Replace the placeholder Firebase values with your own project config:
 *   Firebase Console → Project Settings → Your apps → Web app → SDK setup & configuration
 * Until you do, Firebase calls fail gracefully and the dummy app still runs.
 */
export const environment = {
  production: false,

  // REST/back-end base URL (optional — this starter uses Firestore directly).
  apiUrl: 'https://your-api.example.com',

  // Feature flags — toggle starter features without touching code.
  features: {
    enableForceUpdate: true,
    enableMaintenanceMode: true,
    enableMultiLanguage: true,
  },

  // Firebase web config — REPLACE these placeholders with your project's values.
  firebase: {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'your-project.firebaseapp.com',
    projectId: 'your-project',
    storageBucket: 'your-project.appspot.com',
    messagingSenderId: 'YOUR_SENDER_ID',
    appId: 'YOUR_APP_ID',
    measurementId: 'YOUR_MEASUREMENT_ID',
  },
};
