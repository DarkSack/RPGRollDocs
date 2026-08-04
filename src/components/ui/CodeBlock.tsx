import { CopyButton } from "./CopyButton";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

/**
 * Bloque de código simple con resaltado ligero manual (sin librería de
 * highlighting externa) para YAML/Java/bash/properties — suficiente para
 * los fragmentos cortos que usa esta documentación.
 */
export function CodeBlock({ code, language = "text", filename, className = "" }: CodeBlockProps) {
  return (
    <div
      className={
        "overflow-hidden rounded-xl border border-slate-200 bg-slate-50 " +
        "dark:border-slate-800 dark:bg-slate-900/60 " +
        className
      }
    >
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-100/80 px-4 py-2 dark:border-slate-800 dark:bg-slate-900">
        <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
          {filename ?? language}
        </span>
        <CopyButton text={code} />
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code className="font-mono text-slate-700 dark:text-slate-300">{highlight(code, language)}</code>
      </pre>
    </div>
  );
}

function highlight(code: string, language: string) {
  if (language !== "yaml" && language !== "java" && language !== "properties") {
    return code;
  }

  return code.split("\n").map((line, index) => (
    <span key={index} className="block">
      {renderLine(line, language)}
      {"\n"}
    </span>
  ));
}

function renderLine(line: string, language: string) {
  if (/^\s*#/.test(line) || /^\s*\/\//.test(line)) {
    return <span className="text-slate-400 dark:text-slate-500">{line}</span>;
  }

  if (language === "yaml") {
    const match = line.match(/^(\s*(?:-\s*)?)([\w.-]+)(:)(.*)$/);
    if (match) {
      const [, indent, key, colon, rest] = match;
      return (
        <>
          {indent}
          <span className="text-violet-600 dark:text-violet-400">{key}</span>
          {colon}
          <span className="text-emerald-600 dark:text-emerald-400">{rest}</span>
        </>
      );
    }
  }

  return line;
}
