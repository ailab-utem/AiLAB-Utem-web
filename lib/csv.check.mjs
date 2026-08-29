// lib/csv.check.mjs
// Self-check de lib/csv.mjs. Correr: node lib/csv.check.mjs
import assert from "node:assert/strict";
import { parseCsv, toCsvRow } from "./csv.mjs";

// round-trip con celda que tiene coma y comillas, y una celda vacía
const header = "fecha,titulo,resumen,url\n";
const line = toCsvRow(["2026-08-01", "Título, con coma", 'Dijo "hola"', ""]);
assert.deepEqual(parseCsv(header + line)[0], {
  fecha: "2026-08-01",
  titulo: "Título, con coma",
  resumen: 'Dijo "hola"',
  url: "",
});

// salto de línea dentro de comillas
assert.deepEqual(parseCsv('a,b\n"x\ny",z\n'), [{ a: "x\ny", b: "z" }]);

// fila en blanco al final se ignora
assert.deepEqual(parseCsv("a,b\n1,2\n\n"), [{ a: "1", b: "2" }]);

console.log("csv.mjs OK");
