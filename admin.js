import { requireRole } from "./guard.js";
import { logout } from "./auth.js";
requireRole(["admin"]);
document.getElementById("logoutBtn").onclick = logout;

