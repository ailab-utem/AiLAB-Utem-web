import { appendFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { toCsvRow } from "@/lib/csv.mjs";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATA_DIR = join(process.cwd(), "data");
const CSV_PATH = join(DATA_DIR, "contacto.csv");
const HEADER = "fecha,name,email,career,socials,interests,message\n";

type Payload = {
  name?: string;
  email?: string;
  career?: string;
  socials?: string[];
  interests?: string[];
  message?: string;
};

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "JSON inválido" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email || !message) {
    return Response.json({ error: "Faltan campos obligatorios" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: "Correo inválido" }, { status: 400 });
  }
  if (message.length < 10) {
    return Response.json({ error: "Mensaje muy corto" }, { status: 400 });
  }

  // ponytail: append a archivo — anda local y en host Node/VPS. En serverless
  // (Vercel) el disco es efímero: cambiar SOLO este bloque por DB / Google
  // Sheets / Formspree. La firma del handler y el contrato con el form no cambian.
  const row = toCsvRow([
    new Date().toISOString(),
    name,
    email,
    (body.career ?? "").trim(),
    (body.socials ?? []).join("|"),
    (body.interests ?? []).join("|"),
    message,
  ]);
  try {
    mkdirSync(DATA_DIR, { recursive: true });
    if (!existsSync(CSV_PATH)) appendFileSync(CSV_PATH, HEADER);
    appendFileSync(CSV_PATH, row);
  } catch {
    return Response.json({ error: "No se pudo guardar" }, { status: 500 });
  }

  return Response.json({ ok: true });
}
