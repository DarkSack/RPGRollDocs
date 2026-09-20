export function Kbd({ children }: { children: string }) {
  return (
    <kbd
      className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-sm border px-1 font-mono text-[10px] font-medium leading-none"
      style={{ borderColor: "var(--line-strong)", backgroundColor: "var(--surface-2)", color: "var(--text-dim)" }}
    >
      {children}
    </kbd>
  );
}
