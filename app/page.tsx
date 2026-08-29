import { CornerBrackets } from "@/components/CornerBrackets";
import { NeuralBackdrop } from "@/components/NeuralBackdrop";
import { NeuralBlob } from "@/components/NeuralBlob";
import { PageTransition } from "@/components/PageTransition";
import { Typewriter } from "@/components/Typewriter";

const gridTexture = `url('data:image/svg+xml,${encodeURIComponent(
  [
    "<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'>",
    "<pattern id='g' width='12' height='12' patternUnits='userSpaceOnUse'>",
    "<path d='M12 0H0V12' fill='none' stroke='#6E6E6E' stroke-opacity='.1'/>",
    "</pattern>",
    "<rect width='64' height='64' fill='url(#g)'/>",
    "<g fill='#6E6E6E' opacity='.14'>",
    "<rect x='4' y='16' width='10' height='14'/>",
    "<rect x='20' y='6' width='6' height='10'/>",
    "<rect x='36' y='12' width='12' height='6'/>",
    "<rect x='54' y='22' width='6' height='12'/>",
    "<rect x='8' y='38' width='12' height='10'/>",
    "<rect x='30' y='36' width='10' height='16'/>",
    "<rect x='48' y='46' width='12' height='14'/>",
    "</g>",
    "</svg>",
  ].join("")
)}')`;

const pilares = [
  { n: "01", glyph: "⌗", title: "Investigación ética", desc: "IA para la sociedad.", accent: "text-rose" },
  { n: "02", glyph: "●", title: "Código abierto", desc: "Colaboración radical.", accent: "text-cyan" },
  {
    n: "03",
    glyph: "HUD",
    title: "Desarrollo de hardware",
    desc: "No hay software sin fierros.",
    accent: "text-rose",
  },
  { n: "04", glyph: "+", title: "Ética algorítmica", desc: "IA con conciencia.", accent: "text-cyan" },
  { n: "05", glyph: "▮", title: "Revolución urbana", desc: "Impacto local.", accent: "text-rose" },
];

export default function HomePage() {
  return (
    <PageTransition>
      <section
        id="top"
        className="relative grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_300px] items-center border-b border-line"
      >
        <NeuralBackdrop />
        <div className="relative grid min-h-0 grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] items-center gap-[8px] py-[24px] pb-[28px] pl-[32px]">
          <div className="flex flex-col gap-[20px]">
            <span className="font-mono text-[12px] font-medium leading-none tracking-[0.08em] text-content">
              /01
            </span>
            <h1 className="m-0 font-hero text-[clamp(44px,5.6vw,80px)] font-black uppercase leading-[0.88] tracking-[-0.03em] text-content [text-wrap:balance]">
              Intelligencia
              <br />
              Artificial UTEM
            </h1>
            <div className="font-mono text-[12px] font-medium uppercase leading-none tracking-[0.06em] text-content">
              [High tech, low life]. [Open source]. M7-3F.
            </div>
            <p className="m-0 max-w-[52ch] font-mono text-[12.5px] leading-[1.75] text-muted [text-wrap:pretty]">
              <Typewriter
                text="AI Lab UTEM es una comunidad de estudiantes e investigadores dedicada a la exploración y desarrollo de IA ética, accesible y de vanguardia. Cuestionamos la frontera tecnológica."
                startDelay={700}
              />
            </p>
            <div className="flex flex-wrap items-center gap-[20px] pt-[8px]">
              <a
                href="/proyectos"
                className="flex h-[48px] items-center gap-[14px] rounded-[8px] bg-btn-bg px-[22px] font-mono text-[12px] font-medium uppercase leading-none tracking-[0.14em] text-btn-text no-underline hover:bg-cybergrape"
              >
                Explorar proyectos <span>↗</span>
              </a>
              <a
                href="#pilares"
                className="flex h-[48px] items-center gap-[14px] rounded-[8px] border border-content px-[22px] font-mono text-[12px] font-medium uppercase leading-none tracking-[0.14em] text-content no-underline hover:bg-content hover:text-surface"
              >
                Ver manifesto <span>⛶</span>
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center py-[8px]">
            <NeuralBlob />
          </div>
          <span className="absolute bottom-[12px] right-[20px] font-mono text-[11px] font-medium leading-none tracking-[0.1em] text-content">
            /SCN_01
          </span>
        </div>

        <aside className="relative z-10 flex flex-col gap-[28px] border-l border-line p-[20px]">
          <div className="relative flex flex-col gap-[12px] rounded-[10px] border border-line bg-surface-raised p-[14px] shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <span className="font-mono text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-content">
              System status
            </span>
            <div
              className="relative flex h-[150px] w-full items-center justify-center overflow-hidden rounded-[8px] border border-ink-300 bg-ink-600/20 [filter:grayscale(1)_contrast(1.2)]"
              style={{ backgroundImage: gridTexture }}
            >
              <span className="px-[8px] text-center font-mono text-[11px] text-muted-2">
                Mapa nodo UTEM
              </span>
              <CornerBrackets className="border-ink-400" />
            </div>
            <span className="flex w-fit items-center rounded-[6px] bg-cybergrape/10 px-[10px] py-[6px] font-mono text-[11px] font-medium uppercase leading-none tracking-[0.1em] text-cybergrape">
              [Conexión segura]
            </span>
            <CornerBrackets />
          </div>
          <div className="relative rounded-[10px] border border-line bg-surface-raised p-[14px] shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <span className="block font-mono text-[11px] font-medium leading-[1.7] tracking-[0.06em] text-content">
              NODE: AiLAB_UTEM.LAT_
              <br />
              33.4850.S / LONG_70.6518.W
            </span>
            <CornerBrackets />
          </div>
        </aside>
      </section>

      <section
        id="pilares"
        className="flex flex-col rounded-[45px] bg-smoky px-[32px] py-[22px] pb-[26px] text-white dark:border dark:border-white/15"
      >
        <div className="flex items-baseline gap-[14px] pb-[18px]">
          <span className="font-mono text-[12px] font-medium leading-none tracking-[0.08em] text-limerick">
            /02
          </span>
          <span className="font-mono text-[12px] font-medium uppercase leading-none tracking-[0.2em] text-white">
            Pilares
          </span>
          <span className="h-px flex-1 bg-[#2A2A2A]" />
        </div>
        <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-2 lg:grid-cols-5">
          {pilares.map((p) => (
            <div key={p.title} className="flex flex-col gap-[10px]">
              <span className="font-mono text-[10px] font-medium leading-none text-ink-400">
                {p.n}
              </span>
              <span
                className={`grid h-[34px] w-[34px] place-items-center border border-[#4A4A4A] font-mono font-medium ${p.accent} ${
                  p.glyph === "HUD" ? "text-[9px] tracking-[0.06em]" : "text-[13px]"
                }`}
              >
                {p.glyph}
              </span>
              <span
                className={`font-mono text-[12px] font-bold uppercase leading-[1.3] tracking-[0.08em] ${p.accent}`}
              >
                {p.title}
              </span>
              <span className="font-mono text-[11px] leading-[1.5] text-ink-400">
                {p.desc}
              </span>
            </div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
