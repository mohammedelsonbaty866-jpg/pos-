const DB_NAME = "pospro_offline";
const STORE = "invoices";

function openDB() {
  return new Promise((resolve) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = e => {
      e.target.result.createObjectStore(STORE, { autoIncrement: true });
    };
    req.onsuccess = () => resolve(req.result);
  });
}

export async function saveInvoiceOffline(invoice) {
  const db = await openDB();
  const tx = db.transaction(STORE, "readwrite");
  tx.objectStore(STORE).add(invoice);
}

export async function getOfflineInvoices() {
  const db = await openDB();
  return new Promise(resolve => {
    const req = db.transaction(STORE).objectStore(STORE).getAll();
    req.onsuccess = () => resolve(req.result);
  });
}

export async function clearOfflineInvoices() {
  const db = await openDB();
  db.transaction(STORE, "readwrite").objectStore(STORE).clear();
}
