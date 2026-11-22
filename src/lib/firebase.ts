import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

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
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined,
};

export const firebaseConfigured = Boolean(
  config.apiKey && config.authDomain && config.projectId && config.appId,
);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

if (firebaseConfigured) {
  app = initializeApp({
    apiKey: config.apiKey!,
    authDomain: config.authDomain!,
    projectId: config.projectId!,
    appId: config.appId!,
    ...(config.storageBucket ? { storageBucket: config.storageBucket } : {}),
  });
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
}

export function getAdminAuth(): Auth {
  if (!auth) throw new Error('Firebase is not configured. Add the VITE_FIREBASE_* values to greenlakes-ui/.env.');
  return auth;
}

export function getAdminDb(): Firestore {
  if (!db) throw new Error('Firebase is not configured. Add the VITE_FIREBASE_* values to greenlakes-ui/.env.');
  return db;
}

export function getAdminStorage(): FirebaseStorage {
  if (!storage) throw new Error('Firebase is not configured. Add the VITE_FIREBASE_* values to greenlakes-ui/.env.');
  return storage;
}
