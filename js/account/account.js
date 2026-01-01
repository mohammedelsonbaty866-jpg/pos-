import { db } from "../core/firebase.js";
import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function saveAccountSettings(data) {
  if (!window.currentUID) return;

  await setDoc(
    doc(db, "accounts", window.currentUID),
    {
      ...data,
      uid: window.currentUID,
      updatedAt: new Date()
    },
    { merge: true }
  );

  alert("تم حفظ بيانات الحساب");
}

export async function loadAccountSettings() {
  if (!window.currentUID) return;

  const ref = doc(db, "accounts", window.currentUID);
  const snap = await getDoc(ref);

  if (!snap.exists()) return;

  const d = snap.data();

  document.getElementById("accountName").value = d.name || "";
  document.getElementById("accountCompany").value = d.company || "";
  document.getElementById("accountPhone").value = d.phone || "";
}

window.saveAccountSettings = saveAccountSettings;
window.loadAccountSettings = loadAccountSettings;
