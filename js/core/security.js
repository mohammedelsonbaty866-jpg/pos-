export function sanitize(text) {
  return text
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function requireUID(uid) {
  if (!uid) {
    alert("غير مصرح");
    location.href = "/login.html";
  }
}
