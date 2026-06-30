/**
 * PRODUCTION environment.
 * Replace placeholders with your LIVE Firebase project + production API URL.
 */
export const environment = {
  production: true,

  apiUrl: 'https://your-api.example.com',

  features: {
    enableForceUpdate: true,
    enableMaintenanceMode: true,
    enableMultiLanguage: true,
  },

  firebase: {
    apiKey: 'YOUR_PROD_API_KEY',
    authDomain: 'your-prod-project.firebaseapp.com',
    projectId: 'your-prod-project',
    storageBucket: 'your-prod-project.appspot.com',
    messagingSenderId: 'YOUR_PROD_SENDER_ID',
    appId: 'YOUR_PROD_APP_ID',
    measurementId: 'YOUR_PROD_MEASUREMENT_ID',
  },
};
