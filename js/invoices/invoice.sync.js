import { saveInvoiceOnline } from "./invoice.service.js";
import {
  getOfflineInvoices,
  clearOfflineInvoices
} from "./invoice.offline.js";

export async function syncInvoices() {
  if (!navigator.onLine) return;

  const invoices = await getOfflineInvoices();
  if (!invoices.length) return;

  for (const inv of invoices) {
    await saveInvoiceOnline(inv);
  }

  await clearOfflineInvoices();
}

window.addEventListener("online", syncInvoices);
