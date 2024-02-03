import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAiA8TZE_o6orIBnLmdaOSE6pHn1EPDZcg",
  authDomain: "twitter-clone-d54af.firebaseapp.com",
  projectId: "twitter-clone-d54af",
  storageBucket: "twitter-clone-d54af.appspot.com",
  messagingSenderId: "152370856325",
  appId: "1:152370856325:web:c1083b04d953791df784ec"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);

export const db = getFirestore(app);