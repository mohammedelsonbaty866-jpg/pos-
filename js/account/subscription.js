import { db } from "../core/firebase.js";
import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function checkSubscription() {
  if (!window.currentUID) return false;

  const ref = doc(db, "subscriptions", window.currentUID);
  const snap = await getDoc(ref);

  if (!snap.exists()) return false;

  const sub = snap.data();

  if (sub.status !== "active") return false;

  if (sub.expiresAt.toDate() < new Date()) return false;

  return true;
}

window.checkSubscription = checkSubscription;
