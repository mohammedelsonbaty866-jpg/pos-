import { db } from "../core/firebase.js";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const invoiceForm = document.getElementById("invoiceForm");
const invoiceList = document.getElementById("invoiceList");

if (invoiceForm) {
  invoiceForm.onsubmit = async (e) => {
    e.preventDefault();

    const customer = invoiceForm.customer.value;
    const total = Number(invoiceForm.total.value);

    await addDoc(collection(db, "invoices"), {
      uid: window.currentUID,
      customer,
      total,
      createdAt: serverTimestamp()
    });

    invoiceForm.reset();
    loadInvoices();
  };
}

export async function loadInvoices() {
  if (!window.currentUID || !invoiceList) return;

  const q = query(
    collection(db, "invoices"),
    where("uid", "==", window.currentUID)
  );

  const snap = await getDocs(q);
  invoiceList.innerHTML = "";

  snap.forEach((doc) => {
    const d = doc.data();
    invoiceList.innerHTML += `
      <tr>
        <td>${d.customer}</td>
        <td>${d.total}</td>
      </tr>
    `;
  });
}

loadInvoices();
