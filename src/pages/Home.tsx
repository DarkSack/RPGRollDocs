import { SectionHeading, Card, CardGrid, Callout, PrevNext, Badge, CodeBlock } from "../components/ui";
import { addons } from "../content/addons";
import {
  UsersIcon,
  WrenchIcon,
  CubeIcon,
  LayersIcon,
  DiceIcon,
  BookIcon,
  ArrowRightIcon,
  GithubIcon,
} from "../components/icons/Icon";

const STATS = [
  { label: "Addons oficiales", value: String(addons.length) },
  { label: "Java", value: "25" },
  { label: "Paper API", value: "26.1.1" },
  { label: "Persistencia", value: "SQLite" },
];

export function Home({ onNavigate }: { onNavigate: (slug: string) => void }) {
  return (
    <>
      <section className="-mt-2 mb-14 rounded-2xl border border-slate-200 bg-grid-fade px-6 py-14 text-center dark:border-slate-800 sm:px-10">
        <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-card">
          <DiceIcon size={28} />
        </span>
        <h1 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-slate-100">
          Un framework RPG completo para <span className="text-gradient-brand">Paper/Minecraft</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-slate-500 dark:text-slate-400">
          Razas, clases, atributos, salud y maná, habilidades, trabajos y progresión por niveles — con {addons.length}{" "}
          addons oficiales que agregan desde mazmorras hasta una economía dinámica completa.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate("configuracion")}
            className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white shadow-soft transition-colors hover:bg-violet-700"
          >
            Empezar a configurar
            <ArrowRightIcon size={16} />
          </button>
          <button
            type="button"
            onClick={() => onNavigate("arquitectura")}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Ver arquitectura
          </button>
          <a
            href="https://github.com/DarkSack/RPGRollSack"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <GithubIcon size={16} />
            GitHub
          </a>
        </div>

        <dl className="mx-auto mt-10 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-xl border border-slate-200/70 bg-white/60 py-3 dark:border-slate-800/70 dark:bg-slate-900/40">
              <dt className="text-xs text-slate-400 dark:text-slate-500">{s.label}</dt>
              <dd className="text-xl font-bold text-slate-800 dark:text-slate-100">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p>
        RPGRoll agrega una capa de rol completa sobre un servidor Paper vanilla: cada jugador tiene una raza, una
        clase, seis atributos al estilo D&amp;D, un pool de salud y maná independiente de los corazones de
        Minecraft, habilidades con costo de maná y cooldown, trabajos con recompensas, y un sistema de progresión
        que desbloquea contenido automáticamente al subir de nivel. El núcleo vive en un solo plugin
        (<code>RPGRoll.jar</code>); cada sistema adicional es un addon independiente que se instala aparte.
      </p>

      <SectionHeading id="para-quien-es">¿Para quién es esta documentación?</SectionHeading>
      <CardGrid>
        <Card>
          <div className="mb-2 flex items-center gap-2">
            <UsersIcon size={18} className="text-violet-500" />
            <h3 className="font-semibold text-slate-800 dark:text-slate-100">Administradores de servidor</h3>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Instalación, configuración de <code>gameplay.yml</code>, permisos, y cómo crear contenido nuevo (razas,
            clases, trabajos, habilidades) editando YAML.
          </p>
        </Card>
        <Card>
          <div className="mb-2 flex items-center gap-2">
            <WrenchIcon size={18} className="text-violet-500" />
            <h3 className="font-semibold text-slate-800 dark:text-slate-100">Desarrolladores de addons</h3>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            La API pública (<code>RPGRollAPI</code>), los eventos disponibles, y la arquitectura de módulos Gradle
            (<code>api</code> / <code>common</code> / <code>core</code>).
          </p>
        </Card>
      </CardGrid>

      <SectionHeading id="addons">Explorá los {addons.length} addons oficiales</SectionHeading>
      <p>
        Cada addon es un plugin separado que depende del núcleo (<code>depend: [RPGRoll]</code>) y se instala
        dejando su propio jar en <code>plugins/</code>. Ninguno es obligatorio — instalá solo los que necesite tu
        servidor.
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {addons.map((addon) => {
          const Icon = addon.icon;
          return (
            <Card key={addon.slug} onClick={() => onNavigate(addon.slug)}>
              <div className="flex items-start gap-3">
                <span className={iconWrapClass(addon.tone)}>
                  <Icon size={18} />
                </span>
                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-slate-800 group-hover:text-violet-600 dark:text-slate-100 dark:group-hover:text-violet-400">
                    {addonLabel(addon.slug)}
                  </h3>
                  <p className="mt-0.5 text-sm leading-snug text-slate-500 dark:text-slate-400">{addon.blurb}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <SectionHeading id="arquitectura-breve">Arquitectura en breve</SectionHeading>
      <p>
        El núcleo se organiza en tres módulos Gradle (<code>api</code> pública para addons, <code>common</code>{" "}
        utilidades compartidas, <code>core</code> la implementación real) y cada addon repite ese mismo patrón de
        soft-dependencia: comprueba con <code>Bukkit.getPluginManager().getPlugin(...)</code> antes de tocar
        cualquier clase de otro addon, así ninguno rompe si el otro no está instalado.
      </p>
      <Callout tone="info" title="¿Cómo se conectan los addons entre sí?">
        Casi todos exponen una API pública tipo singleton (<code>XxxAPI.get()</code>) más eventos de Bukkit propios
        — el patrón completo, con ejemplos reales, está en{" "}
        <button type="button" className="underline" onClick={() => onNavigate("arquitectura")}>
          Arquitectura
        </button>
        .
      </Callout>

      <SectionHeading id="quick-start">Instalación rápida</SectionHeading>
      <ol>
        <li>
          Compilá o descargá <code>RPGRoll.jar</code> (núcleo) y colocalo en <code>plugins/</code> de tu servidor
          Paper.
        </li>
        <li>Reiniciá el servidor — el núcleo genera sus archivos de configuración y contenido de ejemplo la primera vez que arranca.</li>
        <li>
          Editá <code>plugins/RPGRoll/gameplay.yml</code> y el contenido en <code>races/</code>, <code>classes/</code>,{" "}
          <code>jobs/</code> a gusto (ver{" "}
          <button type="button" className="underline" onClick={() => onNavigate("configuracion")}>
            Configuración
          </button>
          ).
        </li>
        <li>
          Sumá los addons que quieras dejando su jar junto al del núcleo — cada uno agrega sus propios comandos y
          contenido de ejemplo al reiniciar.
        </li>
      </ol>
      <CodeBlock
        language="bash"
        filename="plugins/"
        code={"plugins/\n  RPGRoll.jar\n  RPGRoll-Items.jar\n  RPGRoll-Quests.jar\n  # ...cualquier combinación de addons"}
      />

      <SectionHeading id="stack">Stack técnico</SectionHeading>
      <ul>
        <li>
          <LayersIcon size={14} className="mr-1 inline text-slate-400" />
          Java 25, Gradle multi-módulo (<code>api</code>, <code>common</code>, <code>core</code>)
        </li>
        <li>
          <CubeIcon size={14} className="mr-1 inline text-slate-400" />
          Paper API 26.1.1 (Bukkit/Spigot compatible)
        </li>
        <li>
          <BookIcon size={14} className="mr-1 inline text-slate-400" />
          SQLite embebido (sqlite-jdbc) con migraciones versionadas propias
        </li>
        <li>
          <Badge tone="amber">opcional</Badge> Vault (softdepend) para recompensas en dinero de los trabajos
        </li>
        <li>Empaquetado con Shadow en un único jar desplegable por módulo</li>
      </ul>

      <Callout tone="tip" title="¿Por dónde sigo?">
        Si administrás un servidor, andá directo a{" "}
        <button className="underline" onClick={() => onNavigate("configuracion")}>
          Configuración
        </button>{" "}
        o{" "}
        <button className="underline" onClick={() => onNavigate("comandos")}>
          Comandos
        </button>
        . Si vas a programar contra RPGRoll, empezá por{" "}
        <button className="underline" onClick={() => onNavigate("arquitectura")}>
          Arquitectura
        </button>{" "}
        y después{" "}
        <button className="underline" onClick={() => onNavigate("api")}>
          API para addons
        </button>
        .
      </Callout>

      <PrevNext current="inicio" onNavigate={onNavigate} />
    </>
  );
}

function iconWrapClass(tone: "violet" | "green" | "amber" | "red" | "blue" | "neutral"): string {
  const base = "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ";
  const tones: Record<typeof tone, string> = {
    violet: "bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300",
    green: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300",
    amber: "bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300",
    red: "bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-300",
    blue: "bg-sky-100 text-sky-600 dark:bg-sky-500/15 dark:text-sky-300",
    neutral: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  };
  return base + tones[tone];
}

/** content/nav.ts tiene el label "lindo" (con mayúsculas/paréntesis); acá solo necesitamos algo corto para la card. */
function addonLabel(slug: string): string {
  const OVERRIDES: Record<string, string> = {
    "rpgroll-effects": "RPGRoll-Effects",
    sackeffects: "SackEffects",
    sackresourcepack: "SackResourcePack",
    tab: "RPGRoll-TAB",
  };
  return OVERRIDES[slug] ?? slug.charAt(0).toUpperCase() + slug.slice(1);
}
