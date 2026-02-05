import { db } from "./firebase.js";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const needsList = document.getElementById("needsList");

const q = query(
  collection(db, "requestsPublic"),
  where("status", "in", ["open", "partial"]),
  orderBy("updatedAt", "desc")
);

onSnapshot(q, (snap) => {
  needsList.innerHTML = "";
  if (snap.empty) {
    needsList.innerHTML = `<p class="muted">No open requests right now.</p>`;
    return;
  }

  snap.forEach((docu) => {
    const r = docu.data();
    const items = Array.isArray(r.items) ? r.items : [];

    const itemLines = items.map(it => {
      const need = Number(it.qtyNeeded ?? 0);
      const done = Number(it.qtyFulfilled ?? 0);
      return `<li>${it.itemName || it.itemId}: <strong>${done}</strong> / ${need} ${it.unit || ""}</li>`;
    }).join("");

    const el = document.createElement("div");
    el.className = "row";
    el.innerHTML = `
      <div class="rowHead">
        <strong>${r.locationName || r.locationId || "Unknown location"}</strong>
        <span class="pill">${r.status || "open"}</span>
      </div>
      <ul>${itemLines}</ul>
      <p class="muted">Request ID: ${docu.id}</p>
    `;
    needsList.appendChild(el);
  });
});
