import Image from "next/image";
import { CornerBrackets } from "@/components/CornerBrackets";

export function NeuralBlob() {
  return (
    <div className="relative aspect-square w-[min(400px,88%)]">
      <div aria-hidden className="ail-glow absolute inset-[4%] rounded-full" />

      <div
        className="absolute inset-[9%] rounded-full p-[3px]"
        style={{
          background:
            "conic-gradient(from 180deg, #4DD9E8, #D4FF3D, #4DD9E8)",
        }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-full bg-surface-raised">
          <Image
            src="/hero-cyborg.webp"
            alt="Render cyborg / IA"
            width={340}
            height={340}
            sizes="400px"
            className="h-full w-full object-cover [transform:scale(1.12)]"
            style={{ objectPosition: "50% 30%" }}
          />
        </div>
      </div>

      <div className="absolute bottom-[2%] left-1/2 flex -translate-x-1/2 items-center rounded-[6px] border border-white/10 bg-smoky px-[12px] py-[5px] font-mono text-[10px] font-medium uppercase leading-none tracking-[0.16em] text-white">
        Ai.CORE <span aria-hidden>{"//"}</span> ACTIVE
      </div>

      <CornerBrackets alternate />
    </div>
  );
}