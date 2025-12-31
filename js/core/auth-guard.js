import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

export function protectPage() {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "/login.html";
    } else {
      const emailEl = document.getElementById("userEmail");
      if (emailEl) emailEl.textContent = user.email;
    }
  });
}
