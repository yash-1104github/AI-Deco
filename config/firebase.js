// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-room-redesign-f30a5.firebaseapp.com",
  projectId: "ai-room-redesign-f30a5",
  storageBucket: "ai-room-redesign-f30a5.firebasestorage.app",
  messagingSenderId: "126010838788",
  appId: "1:126010838788:web:bd58a4416401e00210ca51",
  measurementId: "G-Y0H74YPXYZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
