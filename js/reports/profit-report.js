import { db } from "../core/firebase.js";
import { getDateFilters, isInRange } from "./filters.js";
import {
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const profitBox = document.getElementById("profitResult");

export async function loadProfitReport() {
  if (!window.currentUID || !profitBox) return;

  const filters = getDateFilters();
  let sales = 0;
  let expenses = 0;

  const salesQ = query(
    collection(db, "invoices"),
    where("uid", "==", window.currentUID)
  );

  const expenseQ = query(
    collection(db, "expenses"),
    where("uid", "==", window.currentUID)
  );

  const salesSnap = await getDocs(salesQ);
  const expenseSnap = await getDocs(expenseQ);

  salesSnap.forEach(doc => {
    const d = doc.data();
    if (isInRange(d.createdAt, filters.from, filters.to)) {
      sales += d.total;
    }
  });

  expenseSnap.forEach(doc => {
    const d = doc.data();
    if (isInRange(d.createdAt, filters.from, filters.to)) {
      expenses += d.amount;
    }
  });

  profitBox.innerHTML = `
    <h3>المبيعات: ${sales}</h3>
    <h3>المصروفات: ${expenses}</h3>
    <h2>صافي الربح: ${sales - expenses}</h2>
  `;
}

window.loadProfitReport = loadProfitReport;
