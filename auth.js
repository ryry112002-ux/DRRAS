import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

export async function login(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  const uid = cred.user.uid;

  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) {
    await signOut(auth);
    throw new Error("No user profile found in Firestore (users/{uid}). Contact admin.");
  }

  const data = snap.data();
  if (data.status !== "active") {
    await signOut(auth);
    throw new Error("Account is not active.");
  }

  const role = (data.role || "").toLowerCase();
  if (role === "admin") window.location.href = "admin.html";
  else if (role === "warehouse") window.location.href = "warehouse.html";
  else if (role === "field") window.location.href = "field.html";
  else throw new Error("Unknown role in user profile.");
}

export async function logout() {
  await signOut(auth);
  window.location.href = "index.html";
}

