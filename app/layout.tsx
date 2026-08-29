import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import type { ReactNode } from "react";
import { SysClock } from "@/components/SysClock";
import { ThemeToggle } from "@/components/ThemeToggle";
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
    <html lang="es" suppressHydrationWarning className={`${archivo.variable} ${jetbrainsMono.variable}`}>
      <body className="flex min-h-screen flex-col border-[6px] border-smoky bg-surface font-mono text-[13px] leading-[1.6] text-muted">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("ail-theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d){document.documentElement.classList.add("dark");}}catch(e){}})();`,
          }}
        />
        <header
          className="flex h-[64px] items-stretch bg-smoky text-white"
          style={{ viewTransitionName: "site-header" }}
        >
          <Link
            href="/#top"
            transitionTypes={["nav-back"]}
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
                  transitionTypes={[i === 0 ? "nav-back" : "nav-forward"]}
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
            <SysClock />
          </div>
          <div className="flex items-center border-l border-[#2A2A2A] px-[12px]">
            <ThemeToggle />
          </div>
          <div className="flex items-center border-l border-[#2A2A2A] px-[16px]">
            <Link
              href="/contacto"
              transitionTypes={["nav-forward"]}
              className="flex h-[36px] items-center gap-[10px] rounded-[8px] bg-limerick px-[18px] font-mono text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-smoky no-underline hover:bg-lavender"
            >
              Unirse al lab <span>↗</span>
            </Link>
          </div>
          <div className="flex items-center border-l border-[#2A2A2A] px-[16px] font-mono text-sm font-medium leading-none text-ink-400">
            ⋮
          </div>
        </header>

        <div className="grid flex-1 grid-cols-[1fr] bg-surface md:grid-cols-[44px_1fr_44px]">
          <div className="hidden flex-col items-center justify-between border-r border-line py-[14px] md:flex">
            <span className="text-center font-mono text-[9px] font-medium leading-[1.7] text-muted-4">
              ⋮<br />⋮<br />|<br />|
            </span>
            <span className="w-px flex-1 border-l-2 border-dashed border-muted-4" />
            <span className="[writing-mode:vertical-rl] rotate-180 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.3em] text-muted-2">
              AILAB DESIGN RESIGNED
            </span>
            <span className="w-px flex-1 border-l-2 border-dashed border-muted-4" />
            <span className="[writing-mode:vertical-rl] rotate-180 font-mono text-[10px] font-medium leading-none tracking-[0.18em] text-muted-2">
              2026
            </span>
          </div>

          <main className="flex min-w-0 flex-col border-r border-line md:border-r">{children}</main>

          <div className="hidden place-items-center font-mono text-[11px] font-medium leading-[2] text-muted-4 md:grid">
            +<br />+<br />+<br />+
          </div>
        </div>

        <div
          className="flex h-[32px] items-stretch overflow-hidden border-t border-line bg-surface-raised"
          style={{ viewTransitionName: "site-footer" }}
        >
          <div className="flex items-center gap-[8px] px-[16px] font-mono text-[10px] font-medium uppercase leading-none tracking-[0.14em] text-muted-3">
            <span className="h-[6px] w-[6px] rounded-full bg-limerick animate-[ail-blink_1.1s_linear_infinite]" />
            Conexión segura
          </div>
          <div className="flex flex-1 items-center border-l border-r border-line bg-cybergrape px-[24px] font-mono text-[10px] font-medium uppercase leading-none tracking-[0.14em] text-white">
            &gt; ACCESO CONCEDIDO_
          </div>
          <div className="flex items-center gap-[16px] px-[16px] font-mono text-[10px] font-medium leading-none tracking-[0.08em] text-content">
            <span>SCN: 0001</span>
            <span>NODE: AiLAB_UTEM</span>
          </div>
        </div>
      </body>
    </html>
  );
}
