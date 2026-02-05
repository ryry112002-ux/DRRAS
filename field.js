import { requireRole } from "./guard.js";
import { logout } from "./auth.js";
requireRole(["field", "admin"]); // allow admin to test
document.getElementById("logoutBtn").onclick = logout;

