import { PageHeader, SectionHeading, Table, Thead, Th, Tr, Td, Badge, Callout, CodeBlock, PrevNext } from "../components/ui";
import { REQUIREMENTS, SYSTEM_META } from "../content/site";
import { addonDependencies } from "../content/integrations";
import { ServerIcon } from "../components/icons/Icon";

/**
 * Requisitos del sistema.
 *
 * Consolida lo que hasta ahora estaba repartido entre la introducción (stack
 * técnico) y la sección "Requisitos" de cada addon. Solo lista lo que el repo
 * documenta: no se declara una versión de Minecraft porque la determina el
 * build de Paper, y no está fijada en ningún lado del proyecto.
 */
export function Requirements({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const hardThirdParty = addonDependencies.filter((a) =>
    a.hard.some((d) => d !== "RPGRoll" && !d.startsWith("RPGRoll-")),
  );

  return (
    <>
      <PageHeader
        title="Requisitos"
        slug="requisitos"
        icon={ServerIcon}
        meta={[
          { label: "Plataforma", value: SYSTEM_META.platform },
          { label: "Paper API", value: SYSTEM_META.paperApi },
          { label: "Java", value: SYSTEM_META.java },
        ]}
      >
        Lo que necesita un servidor para correr el núcleo y los addons, y qué es obligatorio contra qué es opcional.
      </PageHeader>

      <SectionHeading id="core">Núcleo</SectionHeading>
      <p>
        Estos son los requisitos de <code>RPGRoll.jar</code>, el núcleo. Cada addon agrega los suyos, siempre sobre
        esta base.
      </p>
      <Table>
        <Thead>
          <Th>Componente</Th>
          <Th>Versión</Th>
          <Th>Tipo</Th>
          <Th>Para qué</Th>
        </Thead>
        <tbody>
          {REQUIREMENTS.map((req) => (
            <Tr key={req.label}>
              <Td className="font-medium">{req.label}</Td>
              <Td className="font-mono text-xs">{req.value}</Td>
              <Td>
                {req.requirement === "required" ? (
                  <Badge tone="violet">requerido</Badge>
                ) : (
                  <Badge>opcional</Badge>
                )}
              </Td>
              <Td>{req.detail ?? "—"}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <Callout tone="info" title="Sobre la versión de Minecraft">
        El proyecto fija la versión de la <strong>Paper API</strong> ({SYSTEM_META.paperApi}), no una versión de
        Minecraft concreta: la determina el build de Paper contra el que compiles y corras el servidor. Esta
        documentación no afirma compatibilidad con ninguna otra plataforma que no esté verificada en el repo.
      </Callout>

      <SectionHeading id="plataforma">Plataforma</SectionHeading>
      <p>
        El destino verificado es <strong>Paper</strong>. La API usada es compatible con Bukkit/Spigot, pero lo que el
        proyecto compila y documenta es Paper —incluidas piezas que dependen de Paper/Adventure, como el motor de
        texto y el TAB nativo—, así que es la plataforma sobre la que conviene desplegar.
      </p>

      <SectionHeading id="instalacion">Qué se instala</SectionHeading>
      <p>
        Todo se instala dejando jars en <code>plugins/</code>. El núcleo es obligatorio; cada addon es independiente
        y opcional.
      </p>
      <CodeBlock
        language="bash"
        filename="plugins/"
        code={
          "plugins/\n" +
          "  RPGRoll.jar            # núcleo — obligatorio\n" +
          "  RPGRoll-Items.jar      # addons — cualquier combinación\n" +
          "  RPGRoll-Quests.jar\n" +
          "  ProtocolLib.jar        # requerido SOLO si usás RPGRoll-NPCs\n" +
          "  Vault.jar              # opcional\n" +
          "  PlaceholderAPI.jar     # opcional"
        }
      />
      <p>
        En el primer arranque el núcleo genera su configuración y contenido de ejemplo. El detalle de cada archivo
        está en{" "}
        <button type="button" className="underline" onClick={() => onNavigate("configuracion")}>
          Configuración
        </button>
        .
      </p>

      <SectionHeading id="dependencias-duras">Dependencias duras de terceros</SectionHeading>
      <p>
        Casi todas las dependencias de terceros son <code>softdepend</code>: si el plugin no está, el addon carga
        igual y solo se apaga la función puntual. Las únicas excepciones —addons que directamente no cargan sin un
        plugin de terceros— son estas:
      </p>
      <Table>
        <Thead>
          <Th>Addon</Th>
          <Th>Requiere</Th>
        </Thead>
        <tbody>
          {hardThirdParty.map((addon) => (
            <Tr key={addon.slug}>
              <Td>
                <button type="button" className="underline" onClick={() => onNavigate(addon.slug)}>
                  {addon.slug}
                </button>
              </Td>
              <Td className="font-mono text-xs">
                {addon.hard.filter((d) => d !== "RPGRoll" && !d.startsWith("RPGRoll-")).join(", ")}
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <p>
        El grafo completo —qué addon depende de qué otro addon, y con qué fuerza— está en{" "}
        <button type="button" className="underline" onClick={() => onNavigate("integraciones")}>
          Integraciones
        </button>
        .
      </p>

      <SectionHeading id="persistencia">Persistencia</SectionHeading>
      <p>
        SQLite embebido vía <code>sqlite-jdbc</code>, con migraciones versionadas propias. No hace falta levantar
        ningún servidor de base de datos aparte. El esquema y el sistema de migraciones están en{" "}
        <button type="button" className="underline" onClick={() => onNavigate("base-de-datos")}>
          Base de datos
        </button>
        .
      </p>

      <PrevNext current="requisitos" onNavigate={onNavigate} />
    </>
  );
}
