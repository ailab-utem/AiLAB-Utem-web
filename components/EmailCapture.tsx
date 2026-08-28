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
        className="font-mono font-medium text-[11px] leading-none tracking-[0.08em] uppercase text-content"
      >
        {label}
      </label>
      <div className="flex h-[48px] border border-content focus-within:border-cybergrape">
        <input
          id="email-capture"
          type="email"
          required
          placeholder="tu-correo@utem.cl"
          className="min-w-0 flex-1 bg-transparent px-[14px] font-mono text-[12px] text-content outline-none placeholder:text-muted-2"
        />
        <button
          type="submit"
          className="bg-btn-bg px-[18px] font-mono font-medium text-[11px] tracking-[0.14em] uppercase text-btn-text hover:bg-cybergrape"
        >
          Enviar ↗
        </button>
      </div>
    </form>
  );
}
