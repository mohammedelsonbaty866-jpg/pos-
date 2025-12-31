import { db } from "../core/firebase.js";
import { getDateFilters, isInRange } from "./filters.js";
import {
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const salesTable = document.getElementById("salesReportTable");

export async function loadSalesReport() {
  if (!window.currentUID || !salesTable) return;

  const filters = getDateFilters();

  const q = query(
    collection(db, "invoices"),
    where("uid", "==", window.currentUID)
  );

  const snap = await getDocs(q);
  let total = 0;
  salesTable.innerHTML = "";

  snap.forEach(doc => {
    const d = doc.data();

    if (!isInRange(d.createdAt, filters.from, filters.to)) return;
    if (filters.customer && d.customer !== filters.customer) return;

    total += d.total;

    salesTable.innerHTML += `
      <tr>
        <td>${d.customer}</td>
        <td>${d.total}</td>
      </tr>
    `;
  });

  document.getElementById("salesTotal").innerText = total;
}

window.loadSalesReport = loadSalesReport;
