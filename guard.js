import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

export function requireRole(allowedRoles = []) {
  onAuthStateChanged(auth, async (user) => {
    if (!user) return (window.location.href = "index.html");

    const snap = await getDoc(doc(db, "users", user.uid));
    if (!snap.exists()) return (window.location.href = "index.html");

    const { role, status } = snap.data();
    if (status !== "active" || !allowedRoles.includes(String(role).toLowerCase())) {
      window.location.href = "index.html";
    }
  });
}

