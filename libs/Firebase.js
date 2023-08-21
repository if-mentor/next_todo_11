import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCeFsjinYftcCg5N55AN7dSeLmollcljQY",
  authDomain: "next-todo-11.firebaseapp.com",
  projectId: "next-todo-11",
  storageBucket: "next-todo-11.appspot.com",
  messagingSenderId: "1098935854485",
  appId: "1:1098935854485:web:27f104fac70e671658429c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };