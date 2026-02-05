import { requireRole } from "./guard.js";
import { logout } from "./auth.js";
requireRole(["warehouse", "admin"]); // allow admin to test
document.getElementById("logoutBtn").onclick = logout;

