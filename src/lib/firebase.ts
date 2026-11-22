import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

// Web Firebase config for the companion project. Values come from the
// Firebase console (Project settings > General > Your apps > Web app,
// SDK setup and configuration) and live in greenlakes-ui/.env, never in git.
// Required: VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN,
// VITE_FIREBASE_PROJECT_ID and VITE_FIREBASE_APP_ID.
const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string | undefined,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string | undefined,
};

export const firebaseConfigured = Boolean(
  config.apiKey && config.authDomain && config.projectId && config.appId,
);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

if (firebaseConfigured) {
  app = initializeApp({
    apiKey: config.apiKey!,
    authDomain: config.authDomain!,
    projectId: config.projectId!,
    appId: config.appId!,
  });
  auth = getAuth(app);
  db = getFirestore(app);
}

export function getAdminAuth(): Auth {
  if (!auth) throw new Error('Firebase is not configured. Add the VITE_FIREBASE_* values to greenlakes-ui/.env.');
  return auth;
}

export function getAdminDb(): Firestore {
  if (!db) throw new Error('Firebase is not configured. Add the VITE_FIREBASE_* values to greenlakes-ui/.env.');
  return db;
}
