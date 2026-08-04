import { PageHeader, SectionHeading, Callout, CodeBlock, Table, Thead, Th, Tr, Td, PrevNext } from "../components/ui";

export function RacesClasses({ onNavigate }: { onNavigate: (slug: string) => void }) {
  return (
    <>
      <PageHeader title="Razas y clases">
        Contenido cargado dinámicamente desde YAML — agregar una raza o clase nueva es tan simple como agregar un
        archivo.
      </PageHeader>

      <SectionHeading id="donde-viven">Dónde viven los archivos</SectionHeading>
      <Table>
        <Thead>
          <Th>Carpeta</Th>
          <Th>Registradas por defecto</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">plugins/RPGRoll/races/*.yml</Td><Td>draconido, elfo, enano, gigante</Td></Tr>
          <Tr><Td className="font-mono text-xs">plugins/RPGRoll/classes/*.yml</Td><Td>guerrero</Td></Tr>
        </tbody>
      </Table>
      <p>
        Se cargan con <code>RaceManagerImpl</code>/<code>ClassManagerImpl</code>, ambos sobre el framework
        genérico de <code>common</code> (<code>ContentManager</code>). Un archivo inválido se descarta con un
        warning en consola — no tumba el resto de la carga.
      </p>

      <SectionHeading id="formato-raza">Formato de un archivo de raza</SectionHeading>
      <CodeBlock
        language="yaml"
        filename="races/elfo.yml"
        code={
          "id: elfo\n" +
          'display-name: "Elfo"\n' +
          'description: "Ágiles y conectados con la naturaleza."\n' +
          "base-attributes:\n" +
          "  dexterity: 3\n" +
          "  wisdom: 2\n" +
          "  strength: -1\n" +
          "passive-traits:\n" +
          "  - vision_nocturna\n" +
          'icon: "<textura base64 de minecraft-heads.com>"\n' +
          "lore:\n" +
          '  - "Habitantes ancestrales del bosque."\n' +
          "physical:\n" +
          "  scale: 0.95\n" +
          "  movement-speed-percent: 0.05\n" +
          "  extra-health: 0.0\n" +
          "  knockback-resistance: 0.0\n"
        }
      />

      <SectionHeading id="formato-clase">Formato de un archivo de clase</SectionHeading>
      <p>Igual, pero sin la sección <code>physical</code> (las clases no modifican el cuerpo del jugador):</p>
      <CodeBlock
        language="yaml"
        filename="classes/guerrero.yml"
        code={
          "id: guerrero\n" +
          'display-name: "Guerrero"\n' +
          'description: "Maestro del combate cuerpo a cuerpo."\n' +
          "base-attributes:\n" +
          "  strength: 4\n" +
          "  constitution: 3\n" +
          "passive-traits: []\n" +
          'icon: "<textura base64>"\n' +
          "lore:\n" +
          '  - "Forjado en mil batallas."\n'
        }
      />

      <SectionHeading id="campos">Referencia de campos</SectionHeading>
      <Table>
        <Thead>
          <Th>Campo</Th>
          <Th>Tipo</Th>
          <Th>Obligatorio</Th>
          <Th>Descripción</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">id</Td><Td>string</Td><Td>Sí</Td><Td>Identificador único. Si falta o está vacío, el archivo se rechaza.</Td></Tr>
          <Tr><Td className="font-mono text-xs">display-name</Td><Td>string</Td><Td>No (usa id)</Td><Td>Nombre mostrado al jugador.</Td></Tr>
          <Tr><Td className="font-mono text-xs">description</Td><Td>string</Td><Td>No</Td><Td>Descripción corta.</Td></Tr>
          <Tr><Td className="font-mono text-xs">base-attributes</Td><Td>mapa stat→int</Td><Td>No</Td><Td>Bonos/penalizaciones sumados a los stats base (10) al crear personaje.</Td></Tr>
          <Tr><Td className="font-mono text-xs">passive-traits</Td><Td>lista de string</Td><Td>No</Td><Td>IDs de traits — se cargan pero <strong>no se otorgan automáticamente todavía</strong> (ver nota abajo).</Td></Tr>
          <Tr><Td className="font-mono text-xs">icon</Td><Td>string (base64)</Td><Td>No</Td><Td>Textura de cabeza de jugador para las GUIs de selección.</Td></Tr>
          <Tr><Td className="font-mono text-xs">lore</Td><Td>lista de string</Td><Td>No</Td><Td>Líneas de lore mostradas en la GUI.</Td></Tr>
          <Tr><Td className="font-mono text-xs">physical</Td><Td>objeto (solo razas)</Td><Td>No</Td><Td>scale, movement-speed-percent, extra-health, knockback-resistance.</Td></Tr>
        </tbody>
      </Table>

      <Callout tone="warning" title="passive-traits no se aplica solo">
        El campo <code>passive-traits</code> se parsea y queda disponible en el objeto <code>Race</code>/
        <code>PlayerClass</code>, pero nada en el código actual llama automáticamente a{" "}
        <code>rpgPlayer.acquireTrait(...)</code> con esos IDs al crear personaje. Si lo necesitás, es la primera
        extensión natural de <code>CharacterCreationFlow.saveCharacter()</code>.
      </Callout>

      <SectionHeading id="modificadores-fisicos">Modificadores físicos (solo razas)</SectionHeading>
      <p>
        <code>RaceAttributeApplier</code> traduce <code>physical</code> en <code>AttributeModifier</code> reales de
        Bukkit sobre el jugador (escala, velocidad, vida extra, resistencia a knockback). Como Bukkit no persiste
        estos modificadores entre reinicios del servidor, se reaplican automáticamente en cada login. Usa claves
        (<code>NamespacedKey</code>) fijas por atributo, así que cambiar de raza limpia primero los modificadores
        de la raza anterior antes de aplicar los nuevos — no se acumulan.
      </p>

      <SectionHeading id="bonos-de-atributo">Cómo se aplican los bonos de atributo</SectionHeading>
      <p>
        Al terminar <code>/rpg create</code>, <code>CharacterCreationFlow</code> parte de{" "}
        <code>PlayerStats.createDefault()</code> (10 en todo), suma <code>base-attributes</code> de la raza
        elegida, después los de la clase, y recorta cada valor a [{"1"}, {"20"}]. La salud/maná inicial también se
        deriva de esos stats finales (Constitución → salud, Inteligencia → maná) — ver{" "}
        <button className="underline" onClick={() => onNavigate("stats-combate")}>
          Stats, salud y maná
        </button>
        .
      </p>

      <SectionHeading id="cambio-raza-clase">Cambiar de raza o clase después de creado</SectionHeading>
      <p>
        Por defecto los jugadores <strong>no</strong> pueden cambiar de raza/clase ellos mismos (
        <code>gameplay.yml</code>: <code>races.allow_race_change</code> / <code>classes.allow_class_change</code>,
        ambos en <code>false</code> — aunque estas banderas son informativas, ningún comando de jugador las
        consulta todavía). Solo un admin puede hacerlo, con{" "}
        <button className="underline" onClick={() => onNavigate("comandos")}>
          <code>/rpg setrace</code> / <code>/rpg setclass</code>
        </button>
        , con la opción <code>--recalc</code> para recalcular stats y salud/maná desde cero.
      </p>

      <PrevNext current="razas-clases" onNavigate={onNavigate} />
    </>
  );
}
