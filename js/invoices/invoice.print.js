export function printInvoice(invoice) {
  const w = window.open("", "_blank");
  w.document.write(`
    <html><head><title>فاتورة</title></head>
    <body>
      <h2>فاتورة بيع</h2>
      <p>العميل: ${invoice.customer}</p>
      <hr>
      ${invoice.items.map(i =>
        `<div>${i.name} × ${i.qty} = ${i.total}</div>`
      ).join("")}
      <hr>
      <h3>الإجمالي: ${invoice.total}</h3>
    </body></html>
  `);
  w.print();
}
