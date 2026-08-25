"use client";

type EmailCaptureProps = {
  label: string;
};

export function EmailCapture({ label }: EmailCaptureProps) {
  return (
    <form
      className="flex flex-col gap-[8px]"
      onSubmit={(e) => e.preventDefault()}
    >
      <label
        htmlFor="email-capture"
        className="font-mono font-medium text-[11px] leading-none tracking-[0.08em] uppercase text-smoky"
      >
        {label}
      </label>
      <div className="flex h-[48px] border border-smoky focus-within:border-cybergrape">
        <input
          id="email-capture"
          type="email"
          required
          placeholder="tu-correo@utem.cl"
          className="min-w-0 flex-1 bg-white px-[14px] font-mono text-[12px] text-smoky outline-none placeholder:text-ink-400"
        />
        <button
          type="submit"
          className="bg-smoky px-[18px] font-mono font-medium text-[11px] tracking-[0.14em] uppercase text-white hover:bg-cybergrape"
        >
          Enviar ↗
        </button>
      </div>
    </form>
  );
}
