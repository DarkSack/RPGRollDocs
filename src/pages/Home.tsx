import { PageHeader, SectionHeading, Card, CardGrid, CodeBlock, Callout, PrevNext } from "../components/ui";

export function Home({ onNavigate }: { onNavigate: (slug: string) => void }) {
  return (
    <>
      <PageHeader title="RPGRoll">
        Un framework RPG estilo D&D para servidores Paper/Minecraft: razas, clases, atributos, salud y maná,
        habilidades con maná/cooldown, trabajos, y progresión por niveles — todo persistido en SQLite.
      </PageHeader>

      <p>
        RPGRoll agrega una capa de rol completa sobre un servidor Paper vanilla: cada jugador tiene una raza, una
        clase, seis atributos al estilo D&D, un pool de salud y maná independiente de los corazones de Minecraft,
        habilidades con costo de maná y cooldown, trabajos con recompensas, y un sistema de progresión que
        desbloquea contenido automáticamente al subir de nivel.
      </p>

      <SectionHeading id="para-quien-es">¿Para quién es esta documentación?</SectionHeading>
      <CardGrid>
        <Card>
          <h3 className="mb-1 font-semibold text-slate-800 dark:text-slate-100">Administradores de servidor</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Instalación, configuración de <code>gameplay.yml</code>, permisos, y cómo crear contenido nuevo
            (razas, clases, trabajos, habilidades) editando YAML.
          </p>
        </Card>
        <Card>
          <h3 className="mb-1 font-semibold text-slate-800 dark:text-slate-100">Desarrolladores de addons</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            La API pública (<code>RPGRollAPI</code>), los eventos disponibles, y la arquitectura de módulos
            Gradle (<code>api</code> / <code>common</code> / <code>core</code>).
          </p>
        </Card>
      </CardGrid>

      <SectionHeading id="stack">Stack técnico</SectionHeading>
      <ul>
        <li>Java 21, Gradle multi-módulo (<code>api</code>, <code>common</code>, <code>core</code>)</li>
        <li>Paper API 1.21.1 (Bukkit/Spigot compatible)</li>
        <li>SQLite embebido (sqlite-jdbc) con migraciones versionadas propias</li>
        <li>Vault (opcional, softdepend) para recompensas en dinero de los trabajos</li>
        <li>Empaquetado con Shadow en un único jar desplegable</li>
      </ul>

      <SectionHeading id="quick-start">Instalación rápida</SectionHeading>
      <ol>
        <li>
          Compilá el jar desplegable: <code>./gradlew build</code> — el archivo queda en{" "}
          <code>core/build/libs/core-&lt;version&gt;.jar</code> (no el que termina en <code>-plain.jar</code>).
        </li>
        <li>Copiá ese jar a la carpeta <code>plugins/</code> de tu servidor Paper.</li>
        <li>Iniciá el servidor una vez para que se generen los YAML de configuración por defecto.</li>
        <li>
          (Opcional) Instalá <a href="#" onClick={(e) => e.preventDefault()}>Vault</a> si querés que los trabajos
          paguen dinero real.
        </li>
      </ol>

      <CodeBlock language="bash" filename="build.sh" code={"./gradlew build\ncp core/build/libs/core-*.jar /ruta/al/servidor/plugins/"} />

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
        y después <button className="underline" onClick={() => onNavigate("api")}>
          API para addons
        </button>
        .
      </Callout>

      <PrevNext current="inicio" onNavigate={onNavigate} />
    </>
  );
}
