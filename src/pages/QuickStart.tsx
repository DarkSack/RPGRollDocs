import type { ReactNode } from "react";
import { PageHeader, SectionHeading, CodeBlock, Callout, Table, Thead, Th, Tr, Td, Badge, PrevNext } from "../components/ui";
import { SYSTEM_META } from "../content/site";
import { CompassIcon } from "../components/icons/Icon";

/**
 * Recorrido de puesta en marcha.
 *
 * El resto de la documentación está organizada por sistema, que sirve para
 * consultar pero no para empezar: alguien que llega por primera vez tiene que
 * deducir en qué orden leer. Esta página es el único lugar con un orden
 * impuesto, y cada paso delega en la página que tiene el detalle en vez de
 * duplicarlo.
 */
export function QuickStart({ onNavigate }: { onNavigate: (slug: string) => void }) {
  return (
    <>
      <PageHeader
        title="Primeros pasos"
        slug="primeros-pasos"
        icon={CompassIcon}
        meta={[
          { label: "Pasos", value: "06" },
          { label: "Plataforma", value: `${SYSTEM_META.platform} ${SYSTEM_META.paperApi}` },
          { label: "Java", value: SYSTEM_META.java },
        ]}
      >
        De un servidor Paper vacío a un personaje con raza, clase y atributos. Seguilo en orden la primera vez.
      </PageHeader>

      <Step n="01" id="requisitos" title="Confirmá los requisitos">
        <p>Antes de copiar nada, verificá que el servidor cumpla con esto:</p>
        <Table>
          <Thead>
            <Th>Componente</Th>
            <Th>Necesitás</Th>
            <Th>Cómo lo verificás</Th>
          </Thead>
          <tbody>
            <Tr>
              <Td>Servidor</Td>
              <Td className="font-mono text-xs">Paper {SYSTEM_META.paperApi}</Td>
              <Td>
                <code>/version</code> en la consola
              </Td>
            </Tr>
            <Tr>
              <Td>Java</Td>
              <Td className="font-mono text-xs">{SYSTEM_META.java}</Td>
              <Td>
                <code>java -version</code>
              </Td>
            </Tr>
            <Tr>
              <Td>Base de datos</Td>
              <Td className="font-mono text-xs">SQLite</Td>
              <Td>Embebida — no hay que instalar nada</Td>
            </Tr>
          </tbody>
        </Table>
        <p>
          Vault y PlaceholderAPI son <Badge>opcionales</Badge>: nada del núcleo los exige. El detalle completo está
          en{" "}
          <button type="button" className="underline" onClick={() => onNavigate("requisitos")}>
            Requisitos
          </button>
          .
        </p>
      </Step>

      <Step n="02" id="instalacion" title="Instalá el núcleo">
        <p>
          Todo el ecosistema se instala dejando jars en <code>plugins/</code>. Lo único obligatorio es el núcleo:
          los addons vienen después, y ninguno es necesario para arrancar.
        </p>
        <CodeBlock
          language="bash"
          filename="plugins/"
          code={"plugins/\n  RPGRoll.jar      # el núcleo — esto es todo lo que necesitás por ahora"}
        />
        <Callout tone="tip" title="Empezá solo con el núcleo">
          Es tentador copiar los 23 addons de una. No lo hagas en la primera vuelta: si algo falla, con un solo jar
          sabés exactamente dónde mirar. Los addons se suman en el paso 06.
        </Callout>
      </Step>

      <Step n="03" id="primer-arranque" title="Arrancá el servidor y verificá">
        <p>
          Iniciá el servidor como lo hacés siempre. En el primer arranque el núcleo crea sus archivos de
          configuración y el contenido de ejemplo (razas, clases y trabajos), así que no hay nada que configurar
          para que cargue.
        </p>
        <p>Para confirmar que quedó activo, dos comprobaciones:</p>
        <Table>
          <Thead>
            <Th>Comprobación</Th>
            <Th>Qué deberías ver</Th>
          </Thead>
          <tbody>
            <Tr>
              <Td className="font-mono text-xs">/plugins</Td>
              <Td>
                <code>RPGRoll</code> en la lista, en verde. Si aparece en rojo, no cargó.
              </Td>
            </Tr>
            <Tr>
              <Td className="font-mono text-xs">/rpg</Td>
              <Td>La ayuda con los comandos que tu rango tiene permiso de ver.</Td>
            </Tr>
          </tbody>
        </Table>
        <Callout tone="warning" title="Si no cargó">
          La consola del arranque nombra la causa — casi siempre una dependencia o la versión de Java. Los síntomas
          más frecuentes, con su causa y solución, están en{" "}
          <button type="button" className="underline" onClick={() => onNavigate("troubleshooting")}>
            Troubleshooting
          </button>
          .
        </Callout>
      </Step>

      <Step n="04" id="configuracion" title="Ajustá la configuración">
        <p>
          El núcleo genera tres archivos. Para una primera puesta en marcha solo vas a tocar el tercero, y solo si
          querés cambiar los valores por defecto:
        </p>
        <Table>
          <Thead>
            <Th>Archivo</Th>
            <Th>Qué controla</Th>
          </Thead>
          <tbody>
            <Tr>
              <Td className="font-mono text-xs">plugins/RPGRoll/config.yml</Td>
              <Td>Idioma de los mensajes y modo debug.</Td>
            </Tr>
            <Tr>
              <Td className="font-mono text-xs">plugins/RPGRoll/config/database.yml</Td>
              <Td>Conexión a la base de datos. El valor por defecto ya funciona.</Td>
            </Tr>
            <Tr>
              <Td className="font-mono text-xs">plugins/RPGRoll/config/gameplay.yml</Td>
              <Td>El archivo grande: experiencia, atributos, razas, clases, habilidades, trabajos y combate.</Td>
            </Tr>
          </tbody>
        </Table>
        <p>Las cuatro claves que más se cambian al empezar:</p>
        <CodeBlock
          language="yaml"
          filename="plugins/RPGRoll/config/gameplay.yml"
          code={
            "experience:\n" +
            "  base_exp: 100      # XP de la primera subida de nivel\n" +
            "  max_level: 100     # techo de nivel\n" +
            "\n" +
            "stats:\n" +
            "  base_value: 10     # valor inicial de cada atributo\n" +
            "  max_value: 20      # techo por atributo"
          }
        />
        <p>
          Después de editar cualquier YAML, aplicá los cambios sin reiniciar con <code>/rpg reload</code>. La
          referencia completa de cada clave, con tipo y valor por defecto, está en{" "}
          <button type="button" className="underline" onClick={() => onNavigate("configuracion")}>
            Configuración
          </button>
          .
        </p>
      </Step>

      <Step n="05" id="primer-personaje" title="Creá tu primer personaje">
        <p>
          Entrá al servidor como jugador. Este es el recorrido mínimo para comprobar que el ciclo completo funciona
          de punta a punta:
        </p>
        <Table>
          <Thead>
            <Th>Comando</Th>
            <Th>Qué hace</Th>
          </Thead>
          <tbody>
            <Tr>
              <Td className="font-mono text-xs">/rpg create</Td>
              <Td>Abre la creación de personaje: elegís raza y clase.</Td>
            </Tr>
            <Tr>
              <Td className="font-mono text-xs">/rpg stats</Td>
              <Td>Tus seis atributos al estilo D&amp;D.</Td>
            </Tr>
            <Tr>
              <Td className="font-mono text-xs">/rpg mystats</Td>
              <Td>Vista detallada: puntos sin gastar, salud y maná, armadura, evasión y crítico.</Td>
            </Tr>
            <Tr>
              <Td className="font-mono text-xs">/rpg skills</Td>
              <Td>Habilidades aprendidas, con su costo de maná y cooldown.</Td>
            </Tr>
          </tbody>
        </Table>
        <p>
          Para ver la progresión sin tener que farmear, usá los comandos de administrador —{" "}
          <code>/rpg addxp &lt;jugador&gt; &lt;cantidad&gt;</code> sube experiencia y <code>/rpg levelup</code>{" "}
          fuerza un intento de subida sobre vos mismo, que es la forma rápida de probar las recompensas de nivel.
          Con puntos disponibles, gastalos con <code>/rpg allocate</code>:
        </p>
        <CodeBlock language="bash" showLineNumbers={false} code={"/rpg allocate fuerza 3"} />
        <Callout tone="success" title="Si llegaste hasta acá, está funcionando">
          Tenés un personaje con raza, clase, atributos asignables y un pool de salud y maná independiente de los
          corazones de Minecraft. El resto es contenido y addons.
        </Callout>
      </Step>

      <Step n="06" id="siguientes-pasos" title="Próximos pasos" last>
        <p>Según lo que quieras hacer ahora:</p>
        <Table>
          <Thead>
            <Th>Si querés…</Th>
            <Th>Andá a</Th>
          </Thead>
          <tbody>
            <Tr>
              <Td>Crear razas, clases, trabajos o habilidades propias</Td>
              <Td>
                <button type="button" className="underline" onClick={() => onNavigate("razas-clases")}>
                  Razas y clases
                </button>{" "}
                — o el editor con GUI, <code>/rpg admincontent</code>
              </Td>
            </Tr>
            <Tr>
              <Td>Sumar addons (mazmorras, economía, misiones…)</Td>
              <Td>
                <button type="button" className="underline" onClick={() => onNavigate("integraciones")}>
                  Integraciones
                </button>{" "}
                — qué depende de qué antes de copiar jars
              </Td>
            </Tr>
            <Tr>
              <Td>Repartir permisos entre rangos</Td>
              <Td>
                <button type="button" className="underline" onClick={() => onNavigate("permisos")}>
                  Permisos
                </button>
              </Td>
            </Tr>
            <Tr>
              <Td>Mostrar datos del jugador en otros plugins</Td>
              <Td>
                <button type="button" className="underline" onClick={() => onNavigate("placeholders")}>
                  Placeholders
                </button>
              </Td>
            </Tr>
            <Tr>
              <Td>Programar contra RPGRoll</Td>
              <Td>
                <button type="button" className="underline" onClick={() => onNavigate("arquitectura")}>
                  Arquitectura
                </button>{" "}
                y{" "}
                <button type="button" className="underline" onClick={() => onNavigate("api")}>
                  API para addons
                </button>
              </Td>
            </Tr>
          </tbody>
        </Table>
      </Step>

      <PrevNext current="primeros-pasos" onNavigate={onNavigate} />
    </>
  );
}

/**
 * Un paso del recorrido. El número va en un riel a la izquierda unido por una
 * línea vertical: deja claro que hay un orden, que es justamente lo que el
 * resto de la documentación no impone.
 */
function Step({
  n,
  id,
  title,
  children,
  last = false,
}: {
  n: string;
  id: string;
  title: string;
  children: ReactNode;
  last?: boolean;
}) {
  return (
    <div className="relative pl-9 sm:pl-14">
      <span
        className="absolute left-0 top-9 flex h-6 w-6 items-center justify-center rounded-sm border font-mono text-[10px] font-semibold sm:h-7 sm:w-7 sm:text-[11px]"
        style={{ borderColor: "var(--line-strong)", backgroundColor: "var(--surface)", color: "var(--ruby)" }}
        aria-hidden="true"
      >
        {n}
      </span>
      {!last && (
        <span
          className="absolute bottom-0 left-[11px] top-[64px] w-px sm:left-[13px] sm:top-[68px]"
          style={{ backgroundColor: "var(--line)" }}
          aria-hidden="true"
        />
      )}
      <SectionHeading id={id}>{title}</SectionHeading>
      {children}
    </div>
  );
}
