/**
 * Initializes a Firebase application with the provided configuration.
 * This function sets up Firebase services including analytics.
 *
 * @module firebaseInit
 * 
 * @example
 * // Import the firebaseInit module
 * import firebaseInit from './path/to/your/firebaseInit';
 * 
 * // Use firebaseInit in your application
 * const app = firebaseInit();
 * 
 * @returns {FirebaseApp} The initialized Firebase application instance.
 * 
 * @see {@link https://firebase.google.com/docs/web/setup} for more information on setting up Firebase.
 */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;