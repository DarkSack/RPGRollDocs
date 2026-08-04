import { useMemo, useState } from "react";
import { CodeBlock } from "./CodeBlock";

export type YamlFieldType = "string" | "number" | "boolean" | "select" | "list" | "map" | "group";

export interface YamlField {
  /** Clave YAML tal cual se escribe en el archivo (ej. "display-name"). */
  key: string;
  /** Etiqueta legible mostrada en el formulario. */
  label: string;
  type: YamlFieldType;
  /** Valor inicial (como texto) — para "boolean" usar "true"/"false". */
  default?: string;
  /** Opciones para "select". */
  options?: string[];
  placeholder?: string;
  /** Texto de ayuda debajo del campo (ej. explicar el formato esperado). */
  help?: string;
  /** Subcampos, solo para type "group" — se anidan como un bloque YAML. */
  fields?: YamlField[];
}

interface YamlBuilderProps {
  title: string;
  description?: string;
  fields: YamlField[];
  /** Carpeta donde vive este tipo de contenido (ej. "affinities") — solo para mostrar el nombre de archivo. */
  folder: string;
  /** Qué campo usar como nombre de archivo. Por defecto "id". */
  idKey?: string;
}

/**
 * Constructor visual de YAML: arma un formulario a partir de un schema de
 * campos, genera una vista previa en vivo, y permite copiar/descargar el
 * resultado como archivo .yml. No escribe nada en ningún servidor — este
 * sitio es 100% estático — el archivo generado hay que copiarlo a mano a la
 * carpeta correspondiente del addon.
 */
export function YamlBuilder({ title, description, fields, folder, idKey = "id" }: YamlBuilderProps) {
  const [values, setValues] = useState<Record<string, string>>(() => defaultValues(fields));

  function setValue(path: string, value: string) {
    setValues((prev) => ({ ...prev, [path]: value }));
  }

  function reset() {
    setValues(defaultValues(fields));
  }

  const yaml = useMemo(() => buildYaml(fields, values), [fields, values]);

  const rawId = values[idKey] ?? "";
  const slug = rawId.trim().toLowerCase().replace(/[^a-z0-9_-]+/g, "_").replace(/^_+|_+$/g, "") || "mi_archivo";
  const filename = `${folder}/${slug}.yml`;

  function download() {
    const blob = new Blob([yaml], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${slug}.yml`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="not-prose my-6 rounded-xl border border-slate-200 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-900/40">
      <div className="mb-4">
        <p className="font-semibold text-slate-800 dark:text-slate-100">{title}</p>
        {description && <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</div>}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {fields.map((field) => (
          <FieldRow key={field.key} field={field} path={field.key} values={values} setValue={setValue} />
        ))}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="text-xs text-slate-400 underline decoration-slate-300 underline-offset-2 hover:text-slate-600 dark:decoration-slate-600 dark:hover:text-slate-300"
        >
          Restablecer valores
        </button>
      </div>

      <div className="mt-4">
        <CodeBlock language="yaml" filename={filename} code={yaml} />
        <button
          type="button"
          onClick={download}
          className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-violet-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-violet-500"
        >
          <DownloadIcon />
          Descargar {slug}.yml
        </button>
      </div>
    </div>
  );
}

function FieldRow({
  field,
  path,
  values,
  setValue,
}: {
  field: YamlField;
  path: string;
  values: Record<string, string>;
  setValue: (path: string, value: string) => void;
}) {
  if (field.type === "group") {
    return (
      <fieldset className="col-span-full rounded-lg border border-slate-200 p-3 dark:border-slate-700/60">
        <legend className="px-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {field.label}
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {(field.fields ?? []).map((sub) => (
            <FieldRow key={sub.key} field={sub} path={`${path}.${sub.key}`} values={values} setValue={setValue} />
          ))}
        </div>
      </fieldset>
    );
  }

  const value = values[path] ?? "";
  const inputClass =
    "w-full rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-800 " +
    "focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400 " +
    "dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100";

  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-slate-600 dark:text-slate-300">{field.label}</span>

      {field.type === "boolean" && (
        <select className={inputClass} value={value} onChange={(e) => setValue(path, e.target.value)}>
          <option value="false">false</option>
          <option value="true">true</option>
        </select>
      )}

      {field.type === "select" && (
        <select className={inputClass} value={value} onChange={(e) => setValue(path, e.target.value)}>
          {(field.options ?? []).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {(field.type === "string" || field.type === "number" || field.type === "list" || field.type === "map") && (
        <input
          className={inputClass}
          type={field.type === "number" ? "number" : "text"}
          value={value}
          placeholder={field.placeholder}
          onChange={(e) => setValue(path, e.target.value)}
        />
      )}

      {field.help && <span className="mt-1 block text-xs text-slate-400 dark:text-slate-500">{field.help}</span>}
    </label>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3v12m0 0-4-4m4 4 4-4" />
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
  );
}

function defaultValues(fields: YamlField[], prefix = ""): Record<string, string> {
  const out: Record<string, string> = {};

  for (const field of fields) {
    const path = prefix ? `${prefix}.${field.key}` : field.key;

    if (field.type === "group") {
      Object.assign(out, defaultValues(field.fields ?? [], path));
      continue;
    }

    if (field.type === "boolean") {
      out[path] = field.default ?? "false";
    } else if (field.type === "select") {
      out[path] = field.default ?? field.options?.[0] ?? "";
    } else {
      out[path] = field.default ?? "";
    }
  }

  return out;
}

function isNumeric(raw: string): boolean {
  return /^-?\d+(\.\d+)?$/.test(raw);
}

function quoteIfNeeded(raw: string): string {
  if (raw === "") return '""';

  const needsQuote =
    /[:#{}[\]&"'|>]/.test(raw) || /^\s|\s$/.test(raw) || /^(true|false|null|~)$/i.test(raw) || isNumeric(raw);

  if (!needsQuote) return raw;

  return `"${raw.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function appendField(lines: string[], field: YamlField, values: Record<string, string>, indent: number, path: string) {
  const pad = "  ".repeat(indent);
  const raw = (values[path] ?? "").trim();

  switch (field.type) {
    case "boolean": {
      lines.push(`${pad}${field.key}: ${raw === "true" ? "true" : "false"}`);
      return;
    }

    case "number": {
      if (raw === "") return;
      lines.push(`${pad}${field.key}: ${raw}`);
      return;
    }

    case "select": {
      if (raw === "") return;
      lines.push(`${pad}${field.key}: ${raw}`);
      return;
    }

    case "string": {
      if (raw === "") return;
      lines.push(`${pad}${field.key}: ${quoteIfNeeded(raw)}`);
      return;
    }

    case "list": {
      const items = raw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      if (items.length === 0) return;

      lines.push(`${pad}${field.key}:`);
      for (const item of items) {
        lines.push(`${pad}  - ${quoteIfNeeded(item)}`);
      }
      return;
    }

    case "map": {
      const entries = raw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .map((entry) => entry.split("=").map((s) => s.trim()))
        .filter((pair): pair is [string, string] => pair.length === 2 && pair[0].length > 0);

      if (entries.length === 0) return;

      lines.push(`${pad}${field.key}:`);
      for (const [key, value] of entries) {
        lines.push(`${pad}  ${key}: ${isNumeric(value) ? value : quoteIfNeeded(value)}`);
      }
      return;
    }

    case "group": {
      const subLines: string[] = [];

      for (const sub of field.fields ?? []) {
        appendField(subLines, sub, values, indent + 1, `${path}.${sub.key}`);
      }

      if (subLines.length === 0) return;

      lines.push(`${pad}${field.key}:`);
      lines.push(...subLines);
      return;
    }
  }
}

function buildYaml(fields: YamlField[], values: Record<string, string>): string {
  const lines: string[] = [];

  for (const field of fields) {
    appendField(lines, field, values, 0, field.key);
  }

  return lines.join("\n") + "\n";
}
