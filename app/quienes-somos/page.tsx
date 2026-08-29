import { PageTransition } from "@/components/PageTransition";

const secciones = [
  { titulo: "Misión", cuerpo: "Próximamente." },
  { titulo: "Objetivos", cuerpo: "Próximamente." },
  { titulo: "Equipo", cuerpo: "Próximamente." },
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
          <div key={s.titulo} className="flex flex-col gap-[8px]">
            <h3 className="m-0 font-mono text-[12px] font-bold uppercase leading-none tracking-[0.14em] text-content">
              {s.titulo}
            </h3>
            <p className="m-0 max-w-[64ch] font-mono text-[12px] leading-[1.7] text-muted-3">
              {s.cuerpo}
            </p>
          </div>
        ))}
      </section>
    </PageTransition>
  );
}
