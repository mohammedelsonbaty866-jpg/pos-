import { checkSubscription } from "./subscription.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth } from "../core/firebase.js";

onAuthStateChanged(auth, async user => {
  if (!user) {
    location.href = "/login.html";
    return;
  }

  window.currentUID = user.uid;

  const ok = await checkSubscription();
  if (!ok) {
    alert("الاشتراك منتهي");
    location.href = "/subscription.html";
  }
});
