import { db } from "../core/firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function saveInvoiceOnline(invoice) {
  if (!window.currentUID) return;

  await addDoc(collection(db, "invoices"), {
    ...invoice,
    uid: window.currentUID,
    createdAt: serverTimestamp()
  });
}
