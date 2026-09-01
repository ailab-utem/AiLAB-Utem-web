import { NeuralBackdrop } from "@/components/NeuralBackdrop";
import { PageTransition } from "@/components/PageTransition";
import { TalleresExplorer } from "./TalleresExplorer";
import { talleres } from "./talleres-data";

export default function TalleresPage() {
  return (
    <PageTransition>
      <section className="relative flex min-h-0 flex-1 flex-col overflow-hidden px-[32px] py-[40px]">
        {/* Mismo grafo de nodos que el fondo del home. */}
        <NeuralBackdrop />

        {/* Posicionado para quedar por sobre el SVG del fondo. */}
        <div className="relative flex flex-1 flex-col gap-[20px]">
          <span className="font-mono text-[11px] font-medium leading-none tracking-[0.08em] text-cybergrape">
            /06
          </span>
          <h2 className="m-0 font-hero text-[32px] font-black uppercase leading-none tracking-[-0.03em] text-content">
            Talleres
          </h2>
          <span className="font-mono text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-muted-2">
            {"> PROGRAMA DE FORMACIÓN_"}
          </span>

          <TalleresExplorer talleres={talleres} />
        </div>
      </section>
    </PageTransition>
  );
}
