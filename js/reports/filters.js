export function getDateFilters() {
  return {
    from: document.getElementById("fromDate")?.value || null,
    to: document.getElementById("toDate")?.value || null,
    customer: document.getElementById("customerFilter")?.value || null
  };
}

export function isInRange(date, from, to) {
  const d = date.toDate ? date.toDate() : new Date(date);
  if (from && d < new Date(from)) return false;
  if (to && d > new Date(to)) return false;
  return true;
}
