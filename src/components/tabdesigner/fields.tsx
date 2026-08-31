import type { ReactNode } from "react";

const INPUT_CLASS =
  "w-full rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-800 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100";

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-slate-600 dark:text-slate-300">
        {label} {hint && <span className="font-normal text-slate-400">({hint})</span>}
      </span>
      {children}
    </label>
  );
}

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  hint,
  list,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
  list?: string;
}) {
  return (
    <Field label={label} hint={hint}>
      <input
        value={value}
        placeholder={placeholder}
        list={list}
        onChange={(e) => onChange(e.target.value)}
        className={INPUT_CLASS}
      />
    </Field>
  );
}

export function NumberField({
  label,
  value,
  onChange,
  min,
  max,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <Field label={label}>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={INPUT_CLASS}
      />
    </Field>
  );
}

export function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
}) {
  return (
    <Field label={label}>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={INPUT_CLASS}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </Field>
  );
}

export function CheckboxField({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
      <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 rounded accent-violet-600" />
      {label}
    </label>
  );
}

/** Un textarea, una línea = un elemento de string[] (para lines/frames/worlds, etc.). */
export function LinesField({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <Field label={label} hint="una por línea">
      <textarea
        value={value.join("\n")}
        placeholder={placeholder}
        rows={rows}
        onChange={(e) => onChange(e.target.value.split("\n"))}
        className={INPUT_CLASS + " font-mono"}
      />
    </Field>
  );
}

export function idListId(kind: string): string {
  return `tabdesigner-ids-${kind}`;
}

export function IdDataList({ kind, ids }: { kind: string; ids: string[] }) {
  return (
    <datalist id={idListId(kind)}>
      {ids.map((id) => (
        <option key={id} value={id} />
      ))}
    </datalist>
  );
}

export function PlaceholderDataList({ placeholders }: { placeholders: string[] }) {
  return (
    <datalist id="tabdesigner-placeholders">
      {placeholders.map((p) => (
        <option key={p} value={p} />
      ))}
    </datalist>
  );
}

export function SectionCard({ children }: { children: ReactNode }) {
  return <div className="space-y-3 rounded-lg border border-slate-200 bg-white/60 p-3 dark:border-slate-800 dark:bg-slate-950/40">{children}</div>;
}

export function RemoveButton({ onClick, label = "Quitar" }: { onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-md border border-red-200 px-2 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/30"
    >
      {label}
    </button>
  );
}

export function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 rounded-md border border-dashed border-violet-300 px-2.5 py-1 text-xs font-medium text-violet-600 transition-colors hover:bg-violet-50 dark:border-violet-700 dark:text-violet-400 dark:hover:bg-violet-950/30"
    >
      + {label}
    </button>
  );
}
