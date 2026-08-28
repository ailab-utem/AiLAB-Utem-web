"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { CornerBrackets } from "@/components/CornerBrackets";

type Errors = {
  name?: string;
  email?: string;
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SOCIAL_OPTIONS = [
  { value: "instagram", label: "Instagram" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "discord", label: "Discord" },
];

const INTEREST_OPTIONS = [
  { value: "models", label: "Desarrollo de modelos" },
  { value: "vision", label: "Visión por computadora" },
  { value: "nlp", label: "Procesamiento de lenguaje" },
  { value: "generativa", label: "IA generativa" },
  { value: "etica", label: "IA ética" },
  { value: "datos", label: "Ciencia de datos" },
];

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [socials, setSocials] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);

  const toggleSocial = (value: string) => {
    setSocials((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const toggleInterest = (value: string) => {
    setInterests((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = "[ERROR DE CAMPO]";
    if (!email) next.email = "[ERROR DE CAMPO]";
    else if (!EMAIL_RE.test(email)) next.email = "[FORMATO INVALIDO]";
    if (!message) next.message = "[ERROR DE CAMPO]";
    else if (message.length < 10) next.message = "[MIN. 10 CARACTERES]";

    setErrors(next);
    setSent(Object.keys(next).length === 0);
  };

  return (
    <div className="relative rounded-[10px] border border-line bg-surface-raised p-[16px] shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
      <form className="flex flex-col gap-[16px]" onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col gap-[6px]">
          <label
            htmlFor="contact-name"
            className="font-mono text-[10px] font-medium uppercase leading-none tracking-[0.14em] text-muted-2"
          >
            {">"} NOMBRE_
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={!!errors.name}
            placeholder="tu-nombre"
            className="h-[44px] w-full border border-line bg-transparent px-[14px] font-mono text-[12px] text-content outline-none placeholder:text-muted-2 focus:border-cybergrape"
          />
          {errors.name && (
            <span className="font-mono text-[10px] font-medium leading-none text-rose">
              {errors.name}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-[6px]">
          <label
            htmlFor="contact-email"
            className="font-mono text-[10px] font-medium uppercase leading-none tracking-[0.14em] text-muted-2"
          >
            {">"} CORREO_
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={!!errors.email}
            placeholder="tu-correo@utem.cl"
            className="h-[44px] w-full border border-line bg-transparent px-[14px] font-mono text-[12px] text-content outline-none placeholder:text-muted-2 focus:border-cybergrape"
          />
          {errors.email && (
            <span className="font-mono text-[10px] font-medium leading-none text-rose">
              {errors.email}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-[6px]">
          <label
            htmlFor="contact-career"
            className="font-mono text-[10px] font-medium uppercase leading-none tracking-[0.14em] text-muted-2"
          >
            {">"} CARRERA_
          </label>
          <div className="relative">
            <select
              id="contact-career"
              name="career"
              defaultValue=""
              className="h-[44px] w-full appearance-none border border-line bg-surface-raised px-[14px] pr-[36px] font-mono text-[12px] text-content outline-none placeholder:text-muted-2 focus:border-cybergrape"
            >
              <option value="" disabled>
                SELECCIONAR_
              </option>
              <option value="icd">ING. CIVIL EN CIENCIA DE DATOS</option>
              <option value="inf">ING. EN INFORMÁTICA</option>
              <option value="icc">ING. CIVIL EN COMPUTACIÓN_ M. INFORMÁTICA</option>
            </select>
            <span
              aria-hidden
              className="pointer-events-none absolute right-[14px] top-1/2 -translate-y-1/2 font-mono text-[11px] leading-none text-muted-2"
            >
              ▾
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-[6px]">
          <label
            htmlFor="contact-social"
            className="font-mono text-[10px] font-medium uppercase leading-none tracking-[0.14em] text-muted-2"
          >
            {">"} RED SOCIAL_ (1 O MÁS)
          </label>
          <div id="contact-social" className="flex flex-wrap items-center gap-[8px]">
            <input type="hidden" name="socials" value={socials.join(",")} />
            {SOCIAL_OPTIONS.map((opt) => {
              const active = socials.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggleSocial(opt.value)}
                  aria-pressed={active}
                  className={`flex h-[36px] items-center gap-[8px] rounded-full border px-[14px] font-mono text-[11px] font-medium uppercase leading-none tracking-[0.14em] ${
                    active
                      ? "border-cybergrape bg-cybergrape text-smoky"
                      : "border-line text-muted-2 hover:border-cybergrape hover:text-content"
                  }`}
                >
                  {active && <span aria-hidden className="h-[5px] w-[5px] rounded-full bg-current" />}
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-[6px]">
          <label
            htmlFor="contact-interest"
            className="font-mono text-[10px] font-medium uppercase leading-none tracking-[0.14em] text-muted-2"
          >
            {">"} ÁREA DE INTERÉS_ (1 O MÁS)
          </label>
          <div id="contact-interest" className="flex flex-wrap items-center gap-[8px]">
            <input type="hidden" name="interests" value={interests.join(",")} />
            {INTEREST_OPTIONS.map((opt) => {
              const active = interests.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggleInterest(opt.value)}
                  aria-pressed={active}
                  className={`flex h-[36px] items-center gap-[8px] rounded-full border px-[14px] font-mono text-[11px] font-medium uppercase leading-none tracking-[0.14em] ${
                    active
                      ? "border-cybergrape bg-cybergrape text-smoky"
                      : "border-line text-muted-2 hover:border-cybergrape hover:text-content"
                  }`}
                >
                  {active && <span aria-hidden className="h-[5px] w-[5px] rounded-full bg-current" />}
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-[6px]">
          <label
            htmlFor="contact-message"
            className="font-mono text-[10px] font-medium uppercase leading-none tracking-[0.14em] text-muted-2"
          >
            {">"} MENSAJE_
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            aria-invalid={!!errors.message}
            placeholder="mensaje para el lab..."
            className="w-full resize-none border border-line bg-transparent px-[14px] py-[12px] font-mono text-[12px] leading-[1.6] text-content outline-none placeholder:text-muted-2 focus:border-cybergrape"
          />
          {errors.message && (
            <span className="font-mono text-[10px] font-medium leading-none text-rose">
              {errors.message}
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-[14px] pt-[4px]">
          <button
            type="submit"
            className="flex h-[46px] items-center gap-[12px] rounded-[8px] bg-btn-bg px-[22px] font-mono text-[12px] font-medium uppercase leading-none tracking-[0.14em] text-btn-text hover:bg-cybergrape"
          >
            Transmitir <span aria-hidden>↗</span>
          </button>
          <span className="font-mono text-[10px] font-medium uppercase leading-none tracking-[0.1em] text-muted-2">
            [canal abierto]
          </span>
        </div>
      </form>

      {sent && (
        <div className="flex flex-col gap-[8px] border-t border-line pt-[16px]">
          <span className="flex items-center gap-[8px] font-mono text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-cybergrape">
            <span className="h-[6px] w-[6px] rounded-full bg-limerick animate-[ail-blink_1.1s_linear_infinite]" />
            [MENSAJE TRANSMITIDO]
          </span>
          <span className="font-mono text-[11px] leading-[1.6] text-muted-2">
            NO DEJES DE MIRAR LA FRONTERA_ Te responderemos pronto.
          </span>
        </div>
      )}

      <CornerBrackets />
    </div>
  );
}