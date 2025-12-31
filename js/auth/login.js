import { auth } from "../core/firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const email = document.getElementById("email");
const password = document.getElementById("password");
const errorBox = document.getElementById("authError");

document.getElementById("loginBtn").onclick = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    window.location.href = "/index.html";
  } catch (e) {
    errorBox.textContent = e.message;
  }
};

document.getElementById("registerBtn").onclick = async () => {
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    window.location.href = "/index.html";
  } catch (e) {
    errorBox.textContent = e.message;
  }
};
