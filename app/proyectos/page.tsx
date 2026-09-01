import { NeuralBackdrop } from "@/components/NeuralBackdrop";
import { PageTransition } from "@/components/PageTransition";
import { BloqueProyectos } from "./ProyectosLista";
import { proyectosPorEstado } from "./proyectos-data";

export default function ProyectosPage() {
  // El codigo correlativo (P01, P02, ...) lo asigna el agrupador, por bloque.
  const enCurso = proyectosPorEstado("in_progress");
  const terminados = proyectosPorEstado("completed");

  return (
    <PageTransition>
      <section className="relative flex min-h-0 flex-1 flex-col overflow-hidden px-[32px] py-[40px]">
        {/* Mismo grafo de nodos que el fondo de talleres y del home. */}
        <NeuralBackdrop />

        {/* Posicionado para quedar por sobre el SVG del fondo. */}
        <div className="relative flex flex-1 flex-col gap-[20px]">
          <span className="font-mono text-[11px] font-medium leading-none tracking-[0.08em] text-cybergrape">
            /05
          </span>
          <h2 className="m-0 font-hero text-[32px] font-black uppercase leading-none tracking-[-0.03em] text-content">
            Proyectos
          </h2>
          <span className="font-mono text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-muted-2">
            {"> REGISTRO DE DESARROLLO_"}
          </span>

          <BloqueProyectos
            titulo="Proyectos en curso_"
            vacio="// NO HAY PROYECTOS EN CURSO_"
            items={enCurso}
          />

          <BloqueProyectos
            titulo="Proyectos terminados_"
            vacio="// NO HAY PROYECTOS TERMINADOS_"
            items={terminados}
          />
        </div>
      </section>
    </PageTransition>
  );
}
