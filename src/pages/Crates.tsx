import {
  PageHeader,
  SectionHeading,
  Callout,
  CodeBlock,
  Table,
  Thead,
  Th,
  Tr,
  Td,
  Kbd,
  Badge,
  PrevNext,
  YamlBuilder,
  type YamlField,
} from "../components/ui";

const crateFields: YamlField[] = [
  { key: "id", label: "Id", type: "string", default: "nuevo_crate", placeholder: "comun" },
  { key: "display-name", label: "Nombre visible", type: "string", placeholder: "&eCrate Común" },
  { key: "gui-title", label: "Título de la ruleta", type: "string", placeholder: "&6Abriendo Crate Común" },
  { key: "require-key", label: "Requiere llave", type: "boolean", default: "true" },
  {
    key: "key",
    label: "Llave",
    type: "group",
    fields: [
      { key: "material", label: "Material", type: "string", default: "TRIPWIRE_HOOK" },
      { key: "name", label: "Nombre de la llave", type: "string", placeholder: "&eLlave de Crate Común" },
      { key: "lore", label: "Lore de la llave", type: "list", placeholder: "Úsala en un Crate Común." },
    ],
  },
  {
    key: "hologram",
    label: "Líneas del holograma",
    type: "list",
    placeholder: "&6&lCRATE COMÚN, &7Necesitas una llave",
    help: "Requiere DecentHolograms instalado — sin él, estas líneas se ignoran.",
  },
];

export function Crates({ onNavigate }: { onNavigate: (slug: string) => void }) {
  return (
    <>
      <PageHeader title="Crates (RPGRoll-Crates)">
        Crates físicos con animación de ruleta y recompensas ponderadas — llave opcional, holograma flotante vía
        DecentHolograms, y anuncio global para el premio mayor.
      </PageHeader>

      <SectionHeading id="requisitos">Requisitos</SectionHeading>
      <CodeBlock language="yaml" code={"depend: [RPGRoll]\nsoftdepend: [DecentHolograms]"} />
      <p>
        Sin DecentHolograms, los crates funcionan igual (click derecho, ruleta, recompensas) — simplemente no hay
        ningún texto flotante sobre el bloque.
      </p>

      <SectionHeading id="modelo">Tipo de crate vs. ubicación física</SectionHeading>
      <p>
        <code>Crate</code> es la <strong>definición</strong> (nombre, llave, recompensas) — no un bloque en el
        mundo. La ubicación física es un objeto separado (<code>PlacedCrate</code>, gestionado por{" "}
        <Kbd>{"/crate setlocation <id>"}</Kbd>, no cargado desde YAML de contenido). Varios bloques distintos
        pueden apuntar al mismo <code>Crate</code> — todos comparten las mismas recompensas, llave y holograma.
      </p>

      <SectionHeading id="recompensas">Recompensas ponderadas</SectionHeading>
      <p>
        Cada <code>CrateReward</code> tiene un <code>weight</code> — la probabilidad de salir sorteada es{" "}
        <code>weight</code> dividido por la suma de todos los weights del crate. No hace falta que sumen 100, pero
        ayuda a la legibilidad si lo hacen. <code>announce: true</code> anuncia esa recompensa a todo el servidor
        cuando sale (pensado para el premio mayor).
      </p>
      <Callout tone="warning" title="Un crate necesita al menos 1 recompensa">
        El compacto constructor de <code>Crate</code> tira <code>IllegalArgumentException</code> si{" "}
        <code>rewards</code> está vacío — no se puede guardar (ni desde YAML ni desde el editor gráfico) un crate
        sin ninguna recompensa.
      </Callout>
      <p>
        Cada recompensa ejecuta su propia lista de <code>actions</code> al salir sorteada — mismo sistema de
        acciones simples que otros addons (<code>GIVE_ITEM</code>, <code>MESSAGE</code>, <code>SOUND</code>,{" "}
        <code>COMMAND</code>).
      </p>

      <SectionHeading id="formato-yaml">Ejemplos de archivo YAML</SectionHeading>
      <CodeBlock
        language="yaml"
        filename="crates/comun.yml"
        code={
          "id: comun\n" +
          'display-name: "&eCrate Común"\n' +
          'gui-title: "&6Abriendo Crate Común"\n' +
          "require-key: true\n" +
          "\n" +
          "key:\n" +
          "  material: TRIPWIRE_HOOK\n" +
          '  name: "&eLlave de Crate Común"\n' +
          "  lore:\n" +
          '    - "&7Úsala en un Crate Común."\n' +
          "\n" +
          "hologram:\n" +
          '  - "&6&lCRATE COMÚN"\n' +
          '  - "&7Necesitas una llave"\n' +
          '  - "&7Click derecho para abrir"\n' +
          "\n" +
          "rewards:\n" +
          "  - id: manzanas\n" +
          '    display-name: "&f8 Manzanas Doradas"\n' +
          "    icon: GOLDEN_APPLE\n" +
          "    weight: 30\n" +
          "    actions:\n" +
          "      - type: GIVE_ITEM\n" +
          '        value: "GOLDEN_APPLE,8"\n' +
          "      - type: MESSAGE\n" +
          '        value: "&aGanaste 8 Manzanas Doradas."\n' +
          "\n" +
          "  - id: diamantes\n" +
          '    display-name: "&b3 Diamantes"\n' +
          "    icon: DIAMOND\n" +
          "    lore:\n" +
          '      - "&7No está nada mal."\n' +
          "    weight: 3\n" +
          "    announce: true\n" +
          "    actions:\n" +
          "      - type: GIVE_ITEM\n" +
          '        value: "DIAMOND,3"\n' +
          "      - type: SOUND\n" +
          '        value: "ENTITY_PLAYER_LEVELUP,1.0,1.5"\n' +
          "      - type: MESSAGE\n" +
          '        value: "&b¡Ganaste 3 Diamantes!"\n' +
          "\n" +
          "  # ...+ hierro, oro, esmeraldas y experiencia (6 recompensas en total, pesos suman 100)\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="crates/legendario.yml"
        code={
          "id: legendario\n" +
          'display-name: "&6&lCrate Legendario"\n' +
          'gui-title: "&4&lAbriendo Crate Legendario"\n' +
          "require-key: true\n" +
          "\n" +
          "key:\n" +
          "  material: NETHER_STAR\n" +
          '  name: "&6&lLlave del Crate Legendario"\n' +
          "  lore:\n" +
          '    - "&7Una llave que brilla con poder."\n' +
          '    - "&7Úsala en un Crate Legendario."\n' +
          "\n" +
          "hologram:\n" +
          '  - "&4&l☠ CRATE LEGENDARIO ☠"\n' +
          '  - "&7Solo para los más valientes"\n' +
          '  - "&eNecesitas una llave legendaria"\n' +
          "\n" +
          "rewards:\n" +
          "  - id: netherite_scrap\n" +
          '    display-name: "&f4 Fragmentos de Netherita"\n' +
          "    icon: NETHERITE_SCRAP\n" +
          "    weight: 35\n" +
          "    actions:\n" +
          "      - type: GIVE_ITEM\n" +
          '        value: "NETHERITE_SCRAP,4"\n' +
          "      - type: MESSAGE\n" +
          '        value: "&aGanaste 4 Fragmentos de Netherita."\n' +
          "\n" +
          "  - id: totem\n" +
          '    display-name: "&6&l¡TOTEM DE LA INMORTALIDAD!"\n' +
          "    icon: TOTEM_OF_UNDYING\n" +
          "    lore:\n" +
          '      - "&7El premio mayor."\n' +
          '      - "&e¡Extremadamente raro!"\n' +
          "    weight: 1\n" +
          "    announce: true\n" +
          "    actions:\n" +
          "      - type: GIVE_ITEM\n" +
          '        value: "TOTEM_OF_UNDYING,1"\n' +
          "      - type: COMMAND\n" +
          '        value: "title {player} title \\"¡PREMIO MAYOR!\\""\n' +
          "      - type: SOUND\n" +
          '        value: "ENTITY_ENDER_DRAGON_GROWL,1.0,1.0"\n' +
          "      - type: MESSAGE\n" +
          '        value: "&6&l¡¡¡GANASTE UN TOTEM DE LA INMORTALIDAD!!!"\n' +
          "\n" +
          "  # ...+ diamantes, espada de netherita, élitro y xp grande (6 recompensas en total)\n"
        }
      />

      <YamlBuilder
        title="Constructor visual: Crate"
        description="Identidad, llave y holograma. Las recompensas (rewards) son una lista de objetos con sus propias acciones — copiá y adaptá las de un ejemplo de arriba, o usá /crate browser para agregarlas de a una."
        folder="crates"
        fields={crateFields}
      />

      <SectionHeading id="gui">GUI: navegador, editor y ruleta</SectionHeading>
      <p>
        <Kbd>/crate browser</Kbd> abre un navegador con botón "Crear nuevo". El editor cubre identidad, llave y
        holograma, más alta/actualización rápida de recompensas por chat (
        <code>{"id;nombre;material;peso;item-material,cantidad"}</code>). Al abrir un crate físico (click derecho
        sobre el bloque registrado), <code>CrateSpinGUI</code> anima la ruleta y termina en la recompensa
        sorteada.
      </p>

      <SectionHeading id="comandos">Comandos</SectionHeading>
      <Table>
        <Thead>
          <Th>Comando</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">{"/crate setlocation <id>"}</Td><Td>Registra el bloque que estás mirando como ubicación física de ese tipo de crate.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/crate removelocation</Td><Td>Quita el registro del bloque que estás mirando.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/crate givekey <jugador> <id> [cantidad]"}</Td><Td>Entrega llaves de ese crate.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/crate list</Td><Td>Lista los crates definidos y cuántas ubicaciones físicas tiene cada uno.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/crate browser</Td><Td>Abre el navegador gráfico.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/crate reload</Td><Td>Recarga definiciones y vuelve a crear los hologramas de todas las ubicaciones.</Td></Tr>
        </tbody>
      </Table>
      <p>Todos requieren <Badge tone="amber">rpgrollcrates.admin.*</Badge> (default: op) y solo pueden ejecutarse como jugador.</p>

      <PrevNext current="crates" onNavigate={onNavigate} />
    </>
  );
}
