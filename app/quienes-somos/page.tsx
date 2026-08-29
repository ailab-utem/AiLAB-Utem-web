import { IconObjetivo } from "@/components/IconObjetivo";
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
      <section className="flex flex-col gap-[24px] px-[32px] py-[40px]">
        <div className="flex flex-col gap-[12px]">
          <span className="font-mono text-[11px] font-medium leading-none tracking-[0.08em] text-cybergrape">
            /03
          </span>
          <h2 className="m-0 font-hero text-[32px] font-black uppercase leading-none tracking-[-0.03em] text-content">
            Quiénes somos
          </h2>
          <span className="font-mono text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-muted-2">
            {"> IDENTIDAD DEL NODO_"}
          </span>
        </div>

        {secciones.map((s) => (
          <div key={s.titulo} className="flex flex-col gap-[10px]">
            <h3 className="m-0 font-mono text-[12px] font-bold uppercase leading-none tracking-[0.14em] text-content">
              {s.titulo}
            </h3>
            {s.items ? (
              <ul className="m-0 flex flex-col gap-[10px] p-0">
                {s.items.map((it) => (
                  <li key={it} className="flex items-start gap-[10px]">
                    <IconObjetivo className="mt-[5px] w-[16px] shrink-0 text-cybergrape" />
                    <span className="max-w-[64ch] font-mono text-[12px] leading-[1.7] text-muted-3">
                      {it}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="m-0 max-w-[64ch] font-mono text-[12px] leading-[1.7] text-muted-3">
                <Typewriter text={s.parrafo ?? ""} />
              </p>
            )}
          </div>
        ))}
      </section>
    </PageTransition>
  );
}
