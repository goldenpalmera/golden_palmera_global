type LogoProps = {
  light?: boolean;
};

export default function Logo({ light = false }: LogoProps) {
  return (
    <div
      className={`flex items-center gap-2 select-none ${
        light ? "text-white" : "text-[#173f2b]"
      }`}
      aria-label="Golden Palmera Global"
    >
      <div className="relative flex h-10 items-center">
        <span className="text-3xl font-black tracking-[-0.12em]">G</span>
        <span className="relative -ml-1 text-3xl font-black tracking-[-0.12em]">
          P
        </span>
        <span className="relative -ml-1 text-3xl font-black tracking-[-0.12em]">
          G
        </span>
      </div>

      <div className="hidden border-l border-current/20 pl-3 sm:block">
        <div className="text-[11px] font-bold uppercase tracking-[0.22em]">
          Golden Palmera
        </div>
        <div className="text-[9px] uppercase tracking-[0.3em] opacity-60">
          Global
        </div>
      </div>
    </div>
  );
}