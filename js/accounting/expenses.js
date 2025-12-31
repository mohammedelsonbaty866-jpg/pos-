import { db } from "../core/firebase.js";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const expenseForm = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");

if (expenseForm) {
  expenseForm.onsubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "expenses"), {
      uid: window.currentUID,
      title: expenseForm.title.value,
      amount: Number(expenseForm.amount.value),
      createdAt: serverTimestamp()
    });

    expenseForm.reset();
    loadExpenses();
  };
}

export async function loadExpenses() {
  if (!window.currentUID || !expenseList) return;

  const q = query(
    collection(db, "expenses"),
    where("uid", "==", window.currentUID)
  );

  const snap = await getDocs(q);
  expenseList.innerHTML = "";

  snap.forEach((doc) => {
    const d = doc.data();
    expenseList.innerHTML += `
      <tr>
        <td>${d.title}</td>
        <td>${d.amount}</td>
      </tr>
    `;
  });
}

loadExpenses();
