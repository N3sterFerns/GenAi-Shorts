import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "shortsgenai-89909.firebaseapp.com",
  projectId: "shortsgenai-89909",
  storageBucket: "shortsgenai-89909.firebasestorage.app",
  messagingSenderId: "1005835598382",
  appId: "1:1005835598382:web:a65a5dd086b2d3c5e87dbf"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)