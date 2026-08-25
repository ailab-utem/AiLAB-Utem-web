import Image from "next/image";
import { EmailCapture } from "@/components/EmailCapture";
import { StatusBar } from "@/components/StatusBar";
import { StatusPill } from "@/components/StatusPill";

const pilares = [
  { n: "1.", glyph: "⌗", title: "Investigación ética", desc: "IA para la sociedad." },
  { n: "2.", glyph: "●", title: "Código abierto", desc: "Colaboración radical." },
  {
    n: "3.",
    glyph: "HUD",
    title: "Desarrollo de hardware",
    desc: "No hay software sin fierros.",
  },
  { n: "4.", glyph: "+", title: "Ética algorítmica", desc: "IA con conciencia." },
  { n: "5.", glyph: "▮", title: "Revolución urbana", desc: "Silueta de impacto local." },
];

export default function HomePage() {
  return (
    <>
      <section
        id="top"
        className="grid grid-cols-[minmax(0,1fr)_300px] border-b border-ink-600"
      >
        <div className="relative grid grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] items-start gap-[8px] py-[24px] pb-[28px] pl-[32px]">
          <div className="flex flex-col gap-[20px]">
            <span className="font-mono text-[12px] font-medium leading-none tracking-[0.08em] text-smoky">
              /01
            </span>
            <h1 className="m-0 font-hero text-[clamp(44px,5.6vw,80px)] font-black uppercase leading-[0.88] tracking-[-0.03em] text-smoky [text-wrap:balance]">
              Intelligencia
              <br />
              Artificial UTEM
            </h1>
            <div className="font-mono text-[12px] font-medium uppercase leading-none tracking-[0.06em] text-smoky">
              [High tech, low life]. [Open source]. M7-3F.
            </div>
            <p className="m-0 max-w-[52ch] font-mono text-[12.5px] leading-[1.75] text-ink-200 [text-wrap:pretty]">
              AI Lab UTEM es una comunidad de estudiantes e investigadores dedicada a la
              exploración y desarrollo de IA ética, accesible y de vanguardia. Cuestionamos la
              frontera tecnológica.
            </p>
            <div className="flex flex-wrap items-center gap-[20px] pt-[8px]">
              <a
                href="/proyectos"
                className="flex h-[48px] items-center gap-[14px] bg-smoky px-[22px] font-mono text-[12px] font-medium uppercase leading-none tracking-[0.14em] text-white no-underline hover:bg-cybergrape"
              >
                Explorar proyectos <span>↗</span>
              </a>
              <a
                href="#pilares"
                className="flex h-[48px] items-center gap-[14px] border border-smoky px-[22px] font-mono text-[12px] font-medium uppercase leading-none tracking-[0.14em] text-smoky no-underline hover:bg-smoky hover:text-white"
              >
                Ver manifesto <span>⛶</span>
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center py-[8px]">
            <div className="relative aspect-square w-[min(340px,90%)]">
              <Image
                src="/hero-cyborg.webp"
                alt="Render cyborg / IA"
                fill
                sizes="340px"
                className="rounded-full object-cover [filter:grayscale(1)_contrast(1.15)]"
              />
            </div>
          </div>
          <span className="absolute bottom-[12px] right-[20px] font-mono text-[11px] font-medium leading-none tracking-[0.1em] text-smoky">
            /SCN_01
          </span>
        </div>

        <aside className="flex flex-col gap-[28px] border-l border-ink-600 p-[20px]">
          <div className="flex flex-col gap-[12px]">
            <span className="font-mono text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-smoky">
              System status
            </span>
            <div className="flex h-[150px] w-full items-center justify-center border border-ink-600 bg-ink-600/20 [filter:grayscale(1)_contrast(1.2)]">
              <span className="px-[8px] text-center font-mono text-[11px] text-ink-400">
                Mapa nodo UTEM
              </span>
            </div>
            <span className="font-mono text-[11px] font-medium uppercase leading-none tracking-[0.1em] text-cybergrape">
              [Conexión segura]
            </span>
          </div>
          <div className="border border-ink-600 p-[14px] [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)]">
            <span className="block font-mono text-[11px] font-medium leading-[1.7] tracking-[0.06em] text-smoky">
              NODE: AiLAB_UTEM.LAT_
              <br />
              45.6827.LONG_9.1749
            </span>
          </div>
        </aside>
      </section>

      <section id="pilares" className="bg-smoky px-[32px] py-[22px] pb-[26px] text-white">
        <div className="flex items-baseline gap-[14px] pb-[18px]">
          <span className="font-mono text-[12px] font-medium leading-none tracking-[0.08em] text-limerick">
            /02
          </span>
          <span className="font-mono text-[12px] font-medium uppercase leading-none tracking-[0.2em] text-white">
            Pilares
          </span>
          <span className="h-px flex-1 bg-[#2A2A2A]" />
        </div>
        <div className="grid grid-cols-5 gap-[20px]">
          {pilares.map((p) => (
            <div key={p.title} className="flex flex-col gap-[8px]">
              <span className="font-mono text-[10px] font-medium leading-none text-ink-400">
                {p.n}
              </span>
              <div className="flex items-start gap-[10px]">
                <span
                  className={`grid h-[34px] w-[34px] flex-none place-items-center border border-[#4A4A4A] font-mono font-medium text-white ${
                    p.glyph === "HUD" ? "text-[9px] tracking-[0.06em]" : "text-[13px]"
                  }`}
                >
                  {p.glyph}
                </span>
                <div className="flex flex-col gap-[5px]">
                  <span className="font-mono text-[11px] font-medium uppercase leading-[1.35] tracking-[0.1em] text-lavender">
                    {p.title}
                  </span>
                  <span className="font-mono text-[11px] leading-[1.5] text-ink-500">
                    {p.desc}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="proyectos"
        className="grid grid-cols-2 border-b border-ink-600"
      >
        <div className="flex flex-col gap-[16px] px-[32px] py-[20px] pb-[32px]">
          <div className="flex items-baseline gap-[16px]">
            <span className="font-mono text-[11px] font-medium leading-none tracking-[0.08em] text-cybergrape">
              /03
            </span>
            <span className="font-mono text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-smoky">
              Estado del sistema
            </span>
          </div>
          <StatusBar label="Uso de CPU" percent={72} value="72%" />
          <StatusBar label="Memoria" percent={54} value="8.6 GB / 16 GB" />
          <StatusBar label="Uptime" percent={100} value="7D 14H 22M" tone="signal" />
          <StatusPill tone="signal" live>
            Todos los sistemas operativos
          </StatusPill>
        </div>
        <div
          id="contacto"
          className="flex flex-col gap-[16px] border-l border-ink-600 px-[32px] py-[20px] pb-[32px]"
        >
          <div className="flex items-baseline gap-[16px]">
            <span className="font-mono text-[11px] font-medium leading-none tracking-[0.08em] text-cybergrape">
              /04
            </span>
            <span className="font-mono text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-smoky">
              Unirse al lab
            </span>
          </div>
          <p className="m-0 font-mono text-[12px] leading-[1.6] text-ink-200">
            Talleres, convocatorias y experimentos del laboratorio.
          </p>
          <EmailCapture label="Correo UTEM" />
        </div>
      </section>

      <section className="flex items-center justify-between gap-[32px] px-[32px] py-[28px]">
        <span className="font-mono text-[10px] font-medium uppercase leading-none tracking-[0.14em] text-ink-400">
          //END_TRANSMISSION
        </span>
        <span className="h-px flex-1 bg-ink-600" />
        <span className="font-mono text-[10px] font-medium leading-none tracking-[0.08em] text-ink-300">
          © 2026 AiLAB UTEM
        </span>
      </section>
    </>
  );
}
