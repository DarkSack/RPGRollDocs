import type { ReactNode } from "react";
import { SectionHeading, Card, CardGrid, Callout, PrevNext, Badge, CodeBlock } from "../components/ui";
import { Logo } from "../components/ui/Logo";
import { addons } from "../content/addons";
import { REPO_URL } from "../content/site";
import { pageTitle } from "../content/nav";
import { useI18n, fill, localizedBlurb, localizedPageLabel, type Locale } from "../i18n";
import { HOME_COPY } from "./copy/home";
import {
  UsersIcon,
  WrenchIcon,
  CubeIcon,
  LayersIcon,
  BookIcon,
  ArrowRightIcon,
  GithubIcon,
} from "../components/icons/Icon";

const pageLabel = (slug: string, locale: Locale) => localizedPageLabel(slug, pageTitle(slug), locale);

export function Home({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { t, locale } = useI18n();
  const c = HOME_COPY[locale];

  const stats = [
    { label: c.statAddons, value: String(addons.length) },
    { label: t.meta.java, value: "25" },
    { label: "Paper API", value: "26.1.1" },
    { label: c.statPersistence, value: "SQLite" },
  ];

  const Go = ({ to, children }: { to: string; children: ReactNode }) => (
    <button type="button" className="underline" onClick={() => onNavigate(to)}>
      {children}
    </button>
  );

  return (
    <>
      {/* Cabecera de la consola. A propósito NO es un hero: una línea de
          contexto, el título, la bajada y la metadata del sistema — el primer
          contenido útil tiene que entrar en la primera pantalla. */}
      <section className="-mt-1 mb-12 border-b pb-6" style={{ borderColor: "var(--line)" }}>
        <p className="fui-label mb-3">{t.meta.system} // RPGRoll</p>

        <div className="flex items-start gap-3">
          <Logo size={38} className="mt-1" />
          <h1 className="text-[30px] font-bold leading-tight tracking-tight" style={{ color: "var(--text)" }}>
            {c.title}
          </h1>
        </div>

        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
          {fill(c.intro, { n: addons.length })}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate("configuracion")}
            className="inline-flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--ruby)" }}
          >
            {c.ctaConfigure}
            <ArrowRightIcon size={14} />
          </button>
          <button
            type="button"
            onClick={() => onNavigate("arquitectura")}
            className="inline-flex items-center gap-1.5 rounded-sm border px-3 py-1.5 text-[13px] font-medium transition-colors"
            style={{ borderColor: "var(--line)", color: "var(--text-dim)" }}
          >
            {c.ctaArchitecture}
          </button>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="no-prose inline-flex items-center gap-1.5 rounded-sm border px-3 py-1.5 text-[13px] font-medium no-underline transition-colors"
            style={{ borderColor: "var(--line)", color: "var(--text-dim)" }}
          >
            <GithubIcon size={14} />
            GitHub
          </a>
        </div>

        {/* Metadata del sistema: una fila de datos, no tarjetas. */}
        <dl
          className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 border-t pt-4"
          style={{ borderColor: "var(--line)" }}
        >
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="fui-label">{s.label}</dt>
              <dd className="mt-0.5 font-mono text-[15px] font-semibold" style={{ color: "var(--text)" }}>
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <p>{fill(c.lead, { jar: <code>RPGRoll.jar</code> })}</p>

      <SectionHeading id="para-quien-es">{c.audienceTitle}</SectionHeading>
      <CardGrid>
        <Card>
          <div className="mb-2 flex items-center gap-2">
            <UsersIcon size={16} style={{ color: "var(--ruby)" }} />
            <h3 className="font-semibold" style={{ color: "var(--text)" }}>
              {c.adminsTitle}
            </h3>
          </div>
          <p className="text-sm" style={{ color: "var(--text-dim)" }}>
            {fill(c.adminsBody, { file: <code>gameplay.yml</code> })}
          </p>
        </Card>
        <Card>
          <div className="mb-2 flex items-center gap-2">
            <WrenchIcon size={16} style={{ color: "var(--ruby)" }} />
            <h3 className="font-semibold" style={{ color: "var(--text)" }}>
              {c.devsTitle}
            </h3>
          </div>
          <p className="text-sm" style={{ color: "var(--text-dim)" }}>
            {fill(c.devsBody, {
              api: <code>RPGRollAPI</code>,
              modules: (
                <>
                  <code>api</code> / <code>common</code> / <code>core</code>
                </>
              ),
            })}
          </p>
        </Card>
      </CardGrid>

      <SectionHeading id="addons">{fill(c.addonsTitle, { n: addons.length })}</SectionHeading>
      <p>
        {fill(c.addonsLead, {
          depend: <code>depend: [RPGRoll]</code>,
          dir: <code>plugins/</code>,
        })}
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {addons.map((addon) => {
          const Icon = addon.icon;
          return (
            <Card key={addon.slug} onClick={() => onNavigate(addon.slug)}>
              <div className="flex items-start gap-3">
                <span className={iconWrapClass(addon.tone)}>
                  <Icon size={16} />
                </span>
                <div className="min-w-0">
                  <h3
                    className="truncate font-semibold group-hover:text-violet-600 dark:group-hover:text-violet-400"
                    style={{ color: "var(--text)" }}
                  >
                    {addonLabel(addon.slug)}
                  </h3>
                  <p className="mt-0.5 text-sm leading-snug" style={{ color: "var(--text-dim)" }}>
                    {localizedBlurb(addon.slug, addon.blurb, locale)}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <SectionHeading id="arquitectura-breve">{c.archTitle}</SectionHeading>
      <p>
        {fill(c.archBody, {
          api: <code>api</code>,
          common: <code>common</code>,
          core: <code>core</code>,
          check: <code>Bukkit.getPluginManager().getPlugin(...)</code>,
        })}
      </p>
      <Callout tone="info" title={c.archCalloutTitle}>
        {fill(c.archCalloutBody, { singleton: <code>XxxAPI.get()</code> })}{" "}
        <Go to="arquitectura">{pageLabel("arquitectura", locale)}</Go>.
      </Callout>

      <SectionHeading id="quick-start">{c.quickTitle}</SectionHeading>
      <ol>
        <li>{fill(c.step1, { jar: <code>RPGRoll.jar</code>, dir: <code>plugins/</code> })}</li>
        <li>{c.step2}</li>
        <li>
          {fill(c.step3, {
            file: <code>plugins/RPGRoll/gameplay.yml</code>,
            dirs: (
              <>
                <code>races/</code>, <code>classes/</code>, <code>jobs/</code>
              </>
            ),
          })}{" "}
          <Go to="configuracion">{pageLabel("configuracion", locale)}</Go>).
        </li>
        <li>{c.step4}</li>
      </ol>
      <CodeBlock
        language="bash"
        filename="plugins/"
        code={`plugins/\n  RPGRoll.jar\n  RPGRoll-Items.jar\n  RPGRoll-Quests.jar\n  # ${c.quickComment}`}
      />

      <SectionHeading id="stack">{c.stackTitle}</SectionHeading>
      <ul>
        <li>
          <LayersIcon size={13} className="mr-1 inline" style={{ color: "var(--text-faint)" }} />
          {fill(c.stackGradle, {
            modules: (
              <>
                <code>api</code>, <code>common</code>, <code>core</code>
              </>
            ),
          })}
        </li>
        <li>
          <CubeIcon size={13} className="mr-1 inline" style={{ color: "var(--text-faint)" }} />
          {c.stackPaper}
        </li>
        <li>
          <BookIcon size={13} className="mr-1 inline" style={{ color: "var(--text-faint)" }} />
          {c.stackDb}
        </li>
        <li>
          <Badge tone="amber">{t.meta.optional}</Badge> {c.stackVault}
        </li>
        <li>{c.stackShadow}</li>
      </ul>

      <Callout tone="tip" title={c.nextTitle}>
        {c.nextAdmin} <Go to="configuracion">{pageLabel("configuracion", locale)}</Go> {c.nextOr}{" "}
        <Go to="comandos">{pageLabel("comandos", locale)}</Go>. {c.nextDev}{" "}
        <Go to="arquitectura">{pageLabel("arquitectura", locale)}</Go> {c.nextThen}{" "}
        <Go to="api">{pageLabel("api", locale)}</Go>.
      </Callout>

      <PrevNext current="inicio" onNavigate={onNavigate} />
    </>
  );
}

function iconWrapClass(tone: "violet" | "green" | "amber" | "red" | "blue" | "neutral"): string {
  const base = "flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border ";
  const tones: Record<typeof tone, string> = {
    violet:
      "border-violet-200 bg-violet-50 text-violet-600 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-300",
    green:
      "border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300",
    amber:
      "border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300",
    red: "border-red-200 bg-red-50 text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300",
    blue: "border-sky-200 bg-sky-50 text-sky-600 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-300",
    neutral: "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300",
  };
  return base + tones[tone];
}

/** content/nav.ts tiene el label "lindo"; acá solo necesitamos algo corto para la card. */
function addonLabel(slug: string): string {
  const OVERRIDES: Record<string, string> = {
    "rpgroll-effects": "RPGRoll-Effects",
    "rpgroll-particles": "RPGRoll-FX",
    sackresourcepack: "SackResourcePack",
    tab: "RPGRoll-TAB",
  };
  return OVERRIDES[slug] ?? slug.charAt(0).toUpperCase() + slug.slice(1);
}
