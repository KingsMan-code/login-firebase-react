import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAMyki-2ICJ3F2zFgHSAv5ZrKyG9uMvLdE",
  authDomain: "eventos-8e60f.firebaseapp.com",
  projectId: "eventos-8e60f",
  storageBucket: "eventos-8e60f.appspot.com",
  messagingSenderId: "663933499755",
  appId: "1:663933499755:web:aaf564deda1c0c1019342e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)