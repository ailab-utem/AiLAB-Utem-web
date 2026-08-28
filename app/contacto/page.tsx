import { ContactForm } from "@/components/ContactForm";
import { CornerBrackets } from "@/components/CornerBrackets";

export default function ContactoPage() {
  return (
    <section className="flex min-h-0 flex-1 flex-col gap-[20px] px-[32px] py-[40px]">
      <span className="font-mono text-[11px] font-medium leading-none tracking-[0.08em] text-cybergrape">
        /08
      </span>
      <h2 className="m-0 font-hero text-[32px] font-black uppercase leading-none tracking-[-0.03em] text-content">
        Contacto
      </h2>
      <span className="font-mono text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-muted-2">
        {"> CANAL DE TRANSMISIÓN DIRECTA_"}
      </span>

      <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <ContactForm />

        <aside className="relative flex flex-col gap-[12px] rounded-[10px] border border-line bg-surface-raised p-[14px] shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
          <span className="font-mono text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-content">
            System contact
          </span>
          <span className="block font-mono text-[11px] font-medium leading-[1.7] tracking-[0.06em] text-content">
            NODE: AiLAB_UTEM.LAT_
            <br />
            33.4850.S / LONG_70.6518.W
          </span>
          <div className="h-px bg-line" />
          <div className="flex flex-col gap-[8px] font-mono text-[11px] leading-[1.6] tracking-[0.06em] text-muted-2">
            <span>
              {">"} EMAIL_ <span className="text-content">comunidad@ailab-utem.cl</span>
            </span>
            <span>
              {">"} GITHUB_ <span className="text-content">github.com/ailab-utem</span>
            </span>
            <span>
              {">"} DISCORD_ <span className="text-content">/ailab-utem</span>
            </span>
          </div>
          <span className="flex w-fit items-center gap-[8px] rounded-[6px] bg-cybergrape/10 px-[10px] py-[6px] font-mono text-[11px] font-medium uppercase leading-none tracking-[0.1em] text-cybergrape">
            <span className="h-[6px] w-[6px] rounded-full bg-limerick animate-[ail-blink_1.1s_linear_infinite]" />
            [Transmisión abierta]
          </span>
          <CornerBrackets />
        </aside>
      </div>
    </section>
  );
}