import { Fragment } from "react";
import { CopyButton } from "./CopyButton";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
  /** Oculta la numeración de línea — útil para fragmentos de una sola línea. */
  showLineNumbers?: boolean;
}

const LANGUAGE_LABELS: Record<string, string> = {
  yaml: "YAML",
  yml: "YAML",
  java: "Java",
  json: "JSON",
  properties: "Properties",
  bash: "Shell",
  sh: "Shell",
  xml: "XML",
  text: "Texto",
};

/**
 * Bloque de código con resaltado de sintaxis propio (sin librería externa):
 * un lexer liviano por lenguaje en vez de un highlighter genérico — cubre
 * exactamente los lenguajes que usa esta documentación (yaml/java/json/
 * properties), no un parser completo de cada gramática.
 */
export function CodeBlock({ code, language = "text", filename, className = "", showLineNumbers }: CodeBlockProps) {
  const lines = code.replace(/\n$/, "").split("\n");
  const withNumbers = showLineNumbers ?? lines.length > 1;

  return (
    <div
      className={
        "group/code overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-soft " +
        "dark:border-slate-800 dark:bg-slate-900/60 " +
        className
      }
    >
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-100/80 px-4 py-2 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
          </span>
          <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
            {filename ?? LANGUAGE_LABELS[language] ?? language}
          </span>
          {filename && (
            <span className="rounded border border-slate-200 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-slate-400 dark:border-slate-700 dark:text-slate-500">
              {LANGUAGE_LABELS[language] ?? language}
            </span>
          )}
        </div>
        <CopyButton text={code} />
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code className="grid font-mono text-slate-700 dark:text-slate-300">
          {lines.map((line, i) => (
            <span key={i} className="table-row">
              {withNumbers && (
                <span className="table-cell select-none pr-4 text-right text-slate-300 dark:text-slate-600">
                  {i + 1}
                </span>
              )}
              <span className="table-cell whitespace-pre">
                {line === "" ? " " : <CodeLine tokens={highlightLine(line, language)} />}
              </span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

/** Renderiza los tokens de UNA línea — la única función responsable de asignar `key`. */
function CodeLine({ tokens }: { tokens: Token[] }) {
  return (
    <>
      {tokens.map((t, i) =>
        t.cls ? (
          <span key={i} className={CLASS[t.cls]}>
            {t.text}
          </span>
        ) : (
          <Fragment key={i}>{t.text}</Fragment>
        ),
      )}
    </>
  );
}

/* ------------------------------------------------------------------------ */
/* Lexer — produce datos planos {text, cls?}, sin JSX, para que el único     */
/* lugar que asigna `key` sea CodeLine de arriba.                            */
/* ------------------------------------------------------------------------ */

interface Token {
  text: string;
  cls?: string;
}

const CLASS: Record<string, string> = {
  comment: "text-slate-400 italic dark:text-slate-500",
  key: "text-violet-600 dark:text-violet-400",
  string: "text-emerald-600 dark:text-emerald-400",
  number: "text-amber-600 dark:text-amber-400",
  boolean: "text-sky-600 dark:text-sky-400",
  keyword: "text-violet-600 font-medium dark:text-violet-400",
  type: "text-sky-600 dark:text-sky-400",
  annotation: "text-amber-600 dark:text-amber-400",
  punctuation: "text-slate-400 dark:text-slate-500",
  placeholder: "text-fuchsia-600 dark:text-fuchsia-400",
  tag: "text-violet-600 dark:text-violet-400",
  attr: "text-sky-600 dark:text-sky-400",
  variable: "text-sky-600 dark:text-sky-400",
};

function tok(text: string, cls?: string): Token {
  return { text, cls };
}

function highlightLine(line: string, language: string): Token[] {
  switch (language) {
    case "yaml":
    case "yml":
      return highlightYaml(line);
    case "java":
      return highlightJava(line);
    case "json":
      return highlightJson(line);
    case "properties":
      return highlightProperties(line);
    case "bash":
    case "sh":
      return highlightBash(line);
    case "xml":
      return highlightXml(line);
    default:
      return [tok(line)];
  }
}

/** Tokeniza fragmentos genéricos (strings/números/booleans/placeholders) — reusado por varios lenguajes. */
function lexGeneric(text: string, extra: { re: RegExp; cls: string }[] = []): Token[] {
  const rules = [
    { re: /"(?:[^"\\]|\\.)*"/y, cls: "string" },
    { re: /'(?:[^'\\]|\\.)*'/y, cls: "string" },
    { re: /\b\d+\.?\d*\b/y, cls: "number" },
    { re: /\b(true|false|null|~)\b/y, cls: "boolean" },
    { re: /%[\w-]+%|\{[\w.-]+\}/y, cls: "placeholder" },
    ...extra,
  ];

  const out: Token[] = [];
  let i = 0;
  let plain = "";

  const flushPlain = () => {
    if (plain) {
      out.push(tok(plain));
      plain = "";
    }
  };

  outer: while (i < text.length) {
    for (const rule of rules) {
      rule.re.lastIndex = i;
      const m = rule.re.exec(text);
      if (m && m.index === i) {
        flushPlain();
        out.push(tok(m[0], rule.cls));
        i += m[0].length;
        continue outer;
      }
    }
    plain += text[i];
    i++;
  }
  flushPlain();
  return out;
}

function highlightYaml(line: string): Token[] {
  if (/^\s*#/.test(line)) {
    return [tok(line, "comment")];
  }

  const commentIdx = findUnquotedHash(line);
  const code = commentIdx >= 0 ? line.slice(0, commentIdx) : line;
  const comment = commentIdx >= 0 ? line.slice(commentIdx) : "";

  const match = code.match(/^(\s*(?:-\s*)+)?([\w][\w.-]*)(:)(.*)$/);
  const nodes: Token[] = [];

  if (match) {
    const [, dash, key, colon, rest] = match;
    if (dash) nodes.push(tok(dash));
    nodes.push(tok(key, "key"));
    nodes.push(tok(colon, "punctuation"));
    nodes.push(...lexGeneric(rest));
  } else {
    nodes.push(...lexGeneric(code));
  }

  if (comment) nodes.push(tok(comment, "comment"));
  return nodes;
}

function findUnquotedHash(line: string): number {
  let inSingle = false;
  let inDouble = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === "'" && !inDouble) inSingle = !inSingle;
    else if (c === '"' && !inSingle) inDouble = !inDouble;
    else if (c === "#" && !inSingle && !inDouble && (i === 0 || /\s/.test(line[i - 1]))) return i;
  }
  return -1;
}

const JAVA_KEYWORDS =
  /\b(public|private|protected|static|final|abstract|class|interface|enum|record|extends|implements|new|return|if|else|for|while|do|switch|case|default|break|continue|try|catch|finally|throw|throws|import|package|void|this|super|instanceof|var|null|true|false)\b/;

function highlightJava(line: string): Token[] {
  return lexGeneric(line, [
    { re: /\/\/.*/y, cls: "comment" },
    { re: /@[A-Za-z_][\w]*/y, cls: "annotation" },
    { re: new RegExp(JAVA_KEYWORDS.source, "y"), cls: "keyword" },
    { re: /\b[A-Z][A-Za-z0-9_]*\b/y, cls: "type" },
  ]);
}

function highlightJson(line: string): Token[] {
  const trimmed = line.trimStart();
  const isKeyLine = /^"(?:[^"\\]|\\.)*"\s*:/.test(trimmed);

  if (isKeyLine) {
    const idx = line.indexOf(":");
    return [tok(line.slice(0, idx), "key"), tok(":", "punctuation"), ...lexGeneric(line.slice(idx + 1))];
  }
  return lexGeneric(line);
}

function highlightProperties(line: string): Token[] {
  if (/^\s*[#!]/.test(line)) return [tok(line, "comment")];

  const match = line.match(/^([\w.-]+)([:=])(.*)$/);
  if (match) {
    const [, key, sep, rest] = match;
    return [tok(key, "key"), tok(sep, "punctuation"), ...lexGeneric(rest)];
  }
  return lexGeneric(line);
}

const BASH_KEYWORDS = /\b(if|then|else|fi|for|do|done|while|case|esac|function|export|return)\b/;

function highlightBash(line: string): Token[] {
  if (/^\s*#/.test(line)) return [tok(line, "comment")];

  return lexGeneric(line, [
    { re: new RegExp(BASH_KEYWORDS.source, "y"), cls: "keyword" },
    { re: /\$\{?[\w-]+\}?/y, cls: "variable" },
  ]);
}

function highlightXml(line: string): Token[] {
  const out: Token[] = [];
  const re = /<\/?[\w:-]+|[\w:-]+(?==)|"(?:[^"\\]|\\.)*"|\/?>/g;
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(line))) {
    if (m.index > last) out.push(tok(line.slice(last, m.index)));
    const t = m[0];
    if (t.startsWith("<")) out.push(tok(t, "tag"));
    else if (t.startsWith('"')) out.push(tok(t, "string"));
    else if (t === ">" || t === "/>") out.push(tok(t, "tag"));
    else out.push(tok(t, "attr"));
    last = m.index + t.length;
  }
  if (last < line.length) out.push(tok(line.slice(last)));
  return out;
}
