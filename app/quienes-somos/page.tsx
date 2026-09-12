import Image from "next/image";
import { IconObjetivo } from "@/components/IconObjetivo";
import { MascotPedestal } from "@/components/MascotPedestal";
import { PageTransition } from "@/components/PageTransition";
import { Typewriter } from "@/components/Typewriter";

type Seccion = { titulo: string; parrafo?: string; items?: string[] };

const secciones: Seccion[] = [
  {
    titulo: "Misión",
    parrafo:
      "Democratizar el acceso a la inteligencia artificial y tecnologías open source en la comunidad estudiantil de la UTEM. Impulsamos la formación práctica de nivel industrial, conectando a los estudiantes con certificaciones, proyectos aplicados y redes del ecosistema tecnológico nacional.",
  },
  {
    titulo: "Objetivos",
    items: [
      "Acercar formación certificada de la industria y herramientas en IA y open source para potenciar la empleabilidad estudiantil.",
      "Activar el acceso a plataformas y convenios internacionales (como Red Hat Academy) para toda la comunidad universitaria.",
      "Generar comunidad y espacios de colaboración mediante talleres prácticos, hackathons, eventos y proyectos tecnológicos.",
      "Fomentar el liderazgo estudiantil a través de la gestión directa de proyectos y la vinculación activa con la industria.",
    ],
  },
  { titulo: "Equipo", parrafo: "Próximamente." },
];

export default function QuienesSomosPage() {
  return (
    <PageTransition>
      <section className="relative flex min-h-0 flex-1 flex-col gap-[28px] px-[32px] pt-[48px] pb-[24px]">
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 -bottom-[26px] right-[16%] z-0 w-[min(460px,44%)]"
        >
          <div className="ail-mascot h-full w-full">
            <div
              className="absolute inset-0 z-[2]"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to left, black 30%, transparent 85%)",
                maskImage: "linear-gradient(to left, black 30%, transparent 85%)",
              }}
            >
              <Image
                src="/mascota-pose3.webp"
                alt=""
                width={1024}
                height={1536}
                sizes="(min-width: 768px) 460px, 46vw"
                quality={80}
                className="relative z-[1] h-full w-full object-contain object-right"
                priority
              />
              <span className="ail-mascot-layer ail-mascot-red z-[2]" />
              <span className="ail-mascot-layer ail-mascot-cyan z-[2]" />
            </div>
            <MascotPedestal />
          </div>
        </div>

        <div className="relative z-10 flex max-w-[760px] flex-col gap-[26px]">
          <div className="flex flex-col gap-[14px]">
            <span className="font-mono text-[13px] font-medium leading-none tracking-[0.08em] text-cybergrape">
              /03
            </span>
            <h2 className="m-0 font-hero text-[40px] font-black uppercase leading-none tracking-[-0.03em] text-content">
              Quiénes somos
            </h2>
            <span className="font-mono text-[13px] font-medium uppercase leading-none tracking-[0.14em] text-muted-2">
              {"> IDENTIDAD DEL NODO_"}
            </span>
          </div>

          {secciones.map((s) => (
            <div key={s.titulo} className="flex flex-col gap-[12px]">
              <h3 className="m-0 font-mono text-[14px] font-bold uppercase leading-none tracking-[0.14em] text-content">
                {s.titulo}
              </h3>
              {s.items ? (
                <ul className="m-0 flex flex-col gap-[10px] p-0">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-start gap-[10px]">
                      <IconObjetivo className="mt-[5px] w-[18px] shrink-0 text-cybergrape" />
                      <span className="max-w-[68ch] font-mono text-[14px] leading-[1.7] text-muted-3">
                        {it}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="m-0 max-w-[68ch] font-mono text-[14px] leading-[1.7] text-muted-3">
                  <Typewriter text={s.parrafo ?? ""} />
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
