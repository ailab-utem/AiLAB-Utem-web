// lib/csv.mjs
// ponytail: CSV mínimo sin dependencia. Cubre RFC-4180 básico (comillas, ""
// escapado, comas y saltos de línea dentro de celdas). Si el dataset crece o
// llega CSV raro de Excel (BOM, separador ;), cambiar por la lib `csv-parse`.

/**
 * Parsea un CSV cuya primera fila son los headers.
 * @param {string} text
 * @returns {Array<Record<string, string>>}
 */
export function parseCsv(text) {
  const src = String(text).replace(/\r\n?/g, "\n");
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (quoted) {
      if (c === '"') {
        if (src[i + 1] === '"') {
          cell += '"';
          i++;
        } else {
          quoted = false;
        }
      } else {
        cell += c;
      }
    } else if (c === '"') {
      quoted = true;
    } else if (c === ",") {
      row.push(cell);
      cell = "";
    } else if (c === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += c;
    }
  }
  if (cell !== "" || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }
  const headers = rows.shift() ?? [];
  return rows
    .filter((r) => r.some((v) => v !== ""))
    .map((r) => Object.fromEntries(headers.map((h, i) => [h, r[i] ?? ""])));
}

/**
 * Serializa una fila de valores a una línea CSV terminada en "\n".
 * @param {Array<string | number>} values
 * @returns {string}
 */
export function toCsvRow(values) {
  return (
    values
      .map((v) => {
        const s = String(v ?? "");
        return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
      })
      .join(",") + "\n"
  );
}
