import { protectPage } from "./core/auth-guard.js";
import { watchAuth } from "./core/firebase.js";

import "./accounting/invoices.js";
import "./accounting/expenses.js";

protectPage();

watchAuth((user) => {
  if (user) {
    window.currentUID = user.uid;
    console.log("Logged UID:", user.uid);
  }
});
