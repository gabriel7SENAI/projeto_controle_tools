import { auth } from "./config.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

export function login(email, senha) {
  return signInWithEmailAndPassword(auth, email, senha);
}

export function cadastrar(email, senha) {
  return createUserWithEmailAndPassword(auth, email, senha);
}

export function observarAuth(callback) {
  return onAuthStateChanged(auth, callback);
}

export function logout() {
  return signOut(auth);
}
