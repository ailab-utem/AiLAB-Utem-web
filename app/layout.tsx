import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import type { ReactNode } from "react";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: "900",
  variable: "--font-archivo",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "AiLAB UTEM",
  description: "Comunidad de estudiantes e investigadores de IA de la UTEM.",
};

const navLinks = [
  { href: "/#pilares", label: "Quiénes somos" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/talleres", label: "Talleres" },
  { href: "/recursos", label: "Recursos" },
  { href: "/contacto", label: "Contacto" },
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`${archivo.variable} ${jetbrainsMono.variable}`}>
      <body className="flex min-h-screen flex-col border-[6px] border-smoky bg-paper font-mono text-[13px] leading-[1.6] text-ink-200">
        <header className="flex h-[64px] items-stretch bg-smoky text-white">
          <Link
            href="/#top"
            className="flex min-w-[120px] flex-col justify-center border-r border-[#2A2A2A] px-[24px] no-underline"
          >
            <span className="font-hero text-[22px] font-black uppercase leading-none tracking-[-0.03em] text-white">
              AiLAB
            </span>
            <span className="font-mono text-[10px] font-medium leading-none tracking-[0.42em] text-ink-400">
              UTEM
            </span>
          </Link>
          <div className="flex items-center border-r border-[#2A2A2A] px-[18px] font-mono text-sm font-medium leading-none text-ink-300">
            ⋮
          </div>
          <nav className="flex min-w-0 flex-1 items-center gap-[12px] overflow-hidden px-[20px]">
            <span className="font-mono text-[11px] font-medium leading-none tracking-[0.14em] text-ink-300">
              NAV:
            </span>
            {navLinks.map((link, i) => (
              <span key={link.href} className="flex items-center gap-[12px]">
                {i > 0 && (
                  <span className="font-mono text-[10px] font-medium leading-none text-ink-300">
                    /
                  </span>
                )}
                <Link
                  href={link.href}
                  className="font-mono text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-white no-underline"
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </nav>
          <div className="flex min-w-[110px] flex-col justify-center gap-[3px] border-l border-[#2A2A2A] px-[20px]">
            <span className="font-mono text-[10px] font-medium leading-none tracking-[0.08em] text-white">
              SYS.TIME
            </span>
            <span className="font-mono text-[10px] font-medium leading-none tracking-[0.08em] text-ink-400">
              UTEM
            </span>
          </div>
          <div className="flex items-center border-l border-[#2A2A2A] px-[16px]">
            <Link
              href="/contacto"
              className="flex h-[36px] items-center gap-[10px] bg-limerick px-[18px] font-mono text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-smoky no-underline hover:bg-lavender"
            >
              Unirse al lab <span>↗</span>
            </Link>
          </div>
          <div className="flex items-center border-l border-[#2A2A2A] px-[16px] font-mono text-sm font-medium leading-none text-ink-400">
            ⋮
          </div>
        </header>

        <div className="grid flex-1 grid-cols-[44px_1fr_44px] bg-paper">
          <div className="flex flex-col items-center justify-between border-r border-ink-600 py-[14px]">
            <span className="text-center font-mono text-[9px] font-medium leading-[1.7] text-ink-500">
              ⋮<br />⋮<br />|<br />|
            </span>
            <span className="[writing-mode:vertical-rl] rotate-180 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.3em] text-ink-400">
              Ved desien resianted
            </span>
            <span className="[writing-mode:vertical-rl] rotate-180 font-mono text-[10px] font-medium leading-none tracking-[0.18em] text-ink-400">
              2014
            </span>
          </div>

          <main className="min-w-0 border-r border-ink-600">{children}</main>

          <div className="grid place-items-center font-mono text-[11px] font-medium leading-[2] text-ink-500">
            +<br />+<br />+<br />+
          </div>
        </div>

        <div className="flex h-[32px] items-stretch overflow-hidden border-t border-ink-600 bg-paper-raised">
          <div className="flex items-center gap-[8px] px-[16px] font-mono text-[10px] font-medium uppercase leading-none tracking-[0.14em] text-ink-300">
            <span className="h-[6px] w-[6px] rounded-full bg-limerick animate-[ail-blink_1.1s_linear_infinite]" />
            Conexión segura
          </div>
          <div className="flex flex-1 items-center border-l border-r border-ink-600 bg-cybergrape px-[24px] font-mono text-[10px] font-medium uppercase leading-none tracking-[0.14em] text-white">
            &gt; ACCESO CONCEDIDO_
          </div>
          <div className="flex items-center gap-[16px] px-[16px] font-mono text-[10px] font-medium leading-none tracking-[0.08em] text-smoky">
            <span>SCN: 0001</span>
            <span>NODE: AiLAB_UTEM</span>
          </div>
        </div>
      </body>
    </html>
  );
}
