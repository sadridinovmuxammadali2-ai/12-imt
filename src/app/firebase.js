import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB-yZtlXZoSKxDUANRmvThx7VkankWKZOA",
  authDomain: "imit-adaa9.firebaseapp.com",
  projectId: "imit-adaa9",
  storageBucket: "imit-adaa9.firebasestorage.app",
  messagingSenderId: "862348421066",
  appId: "1:862348421066:web"
};

export const firebaseReady = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  firebaseConfig.appId
);

const app = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export function getFirebaseAuth() {
  return auth;
}
