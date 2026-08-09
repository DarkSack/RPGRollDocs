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

const sackEffectFields: YamlField[] = [
  { key: "id", label: "Id", type: "string", default: "nuevo_efecto", placeholder: "level_up" },
  { key: "display-name", label: "Nombre visible", type: "string", placeholder: "&6¡Subida de nivel!" },
  { key: "description", label: "Descripción", type: "string" },
];

export function SackEffects({ onNavigate }: { onNavigate: (slug: string) => void }) {
  return (
    <>
      <PageHeader title="SackEffects">
        Librería de efectos audiovisuales reusable — formas de partículas, sonidos, títulos/actionbar/bossbar y
        efectos de poción, todo secuenciable con delays. Independiente de RPGRollAPI a propósito, similar en
        espíritu a SCore de Ssomar: pensada para que cualquier addon (de RPGRoll o no) la use como su motor de
        "cómo se ve/suena esto", sin acoplarse a ningún otro sistema.
      </PageHeader>

      <Callout tone="info" title="No confundir con RPGRoll-Effects">
        SackEffects es la capa de <strong>renderizado</strong> (partículas/sonidos/pantalla) — no tiene noción de
        duración, stacking, condiciones ni buffs/debuffs. Para eso está{" "}
        <button type="button" onClick={() => onNavigate("rpgroll-effects")} className="text-violet-600 underline dark:text-violet-400">
          RPGRoll-Effects
        </button>
        , el motor de efectos de estado, que de hecho usa SackEffects por debajo para sus componentes visuales y
        de sonido.
      </Callout>

      <SectionHeading id="requisitos">Requisitos</SectionHeading>
      <CodeBlock language="yaml" code={"depend: [RPGRoll]"} />
      <p>
        La dependencia con RPGRoll es solo para reusar el framework de contenido (<code>ContentManager</code>) y de
        GUIs compartido — la lógica de partículas/sonidos en sí no toca ningún dato de RPGRollAPI.
      </p>

      <SectionHeading id="modelo">Un efecto es una secuencia de pasos</SectionHeading>
      <p>
        Un <code>EffectDefinition</code> (id, nombre, descripción) tiene una lista de <code>EffectStep</code> — cada
        uno con un <code>type</code>, un <code>delay</code> (en ticks, contado desde que se dispara toda la
        secuencia, no desde el paso anterior) y params libres. <code>EffectEngine</code> agenda cada paso con{" "}
        <code>Bukkit.getScheduler().runTaskLater</code> y los ejecuta de forma independiente — un error en un paso
        (partícula/sonido inválido) solo loguea un warning, no cancela el resto.
      </p>

      <SectionHeading id="tipos-de-paso">Tipos de paso</SectionHeading>
      <Table>
        <Thead>
          <Th>Tipo</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">PARTICLE</Td><Td>Spawnea una <code>Particle</code> vanilla siguiendo una forma geométrica (ver abajo).</Td></Tr>
          <Tr><Td className="font-mono text-xs">SOUND</Td><Td>Reproduce un <code>Sound</code> vanilla — personal (solo el jugador la escucha) o de mundo, según el <code>target</code>.</Td></Tr>
          <Tr><Td className="font-mono text-xs">TITLE</Td><Td>Título/subtítulo con fade-in/stay/fade-out configurables.</Td></Tr>
          <Tr><Td className="font-mono text-xs">ACTIONBAR</Td><Td>Texto en la barra de acción.</Td></Tr>
          <Tr><Td className="font-mono text-xs">BOSSBAR</Td><Td>Bossbar temporal (color/estilo/progreso/duración), se remueve sola al vencer.</Td></Tr>
          <Tr><Td className="font-mono text-xs">POTION</Td><Td>Aplica un <code>PotionEffect</code> vanilla real.</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="formas">Formas de partícula</SectionHeading>
      <p>
        El <code>shape</code> de un paso <code>PARTICLE</code> decide la geometría — pura matemática en{" "}
        <code>ParticleShapes</code>, sin ningún efecto colateral, así es fácil de razonar por separado del motor de
        ejecución.
      </p>
      <Table>
        <Thead>
          <Th>Forma</Th>
          <Th>Params relevantes</Th>
          <Th>Descripción</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">POINT</Td><Td className="font-mono text-xs">—</Td><Td>Un solo punto (default si no se especifica shape).</Td></Tr>
          <Tr><Td className="font-mono text-xs">CIRCLE</Td><Td className="font-mono text-xs">radius, points</Td><Td>Anillo plano horizontal.</Td></Tr>
          <Tr><Td className="font-mono text-xs">SPHERE</Td><Td className="font-mono text-xs">radius, points</Td><Td>Distribución pareja sobre una esfera (espiral áurea/Fibonacci).</Td></Tr>
          <Tr><Td className="font-mono text-xs">LINE</Td><Td className="font-mono text-xs">points, from/to (target)</Td><Td>Recta entre dos puntos — única forma que usa un segundo target.</Td></Tr>
          <Tr><Td className="font-mono text-xs">HELIX</Td><Td className="font-mono text-xs">radius, height, turns, points</Td><Td>Espiral ascendente.</Td></Tr>
          <Tr><Td className="font-mono text-xs">CONE</Td><Td className="font-mono text-xs">radius, length, points</Td><Td>Sale en la dirección hacia donde mira el origen (yaw/pitch), ensanchándose.</Td></Tr>
          <Tr><Td className="font-mono text-xs">CUBE_OUTLINE</Td><Td className="font-mono text-xs">radius (mitad del lado), points</Td><Td>Las 12 aristas de un cubo centrado en el origen.</Td></Tr>
          <Tr><Td className="font-mono text-xs">BURST</Td><Td className="font-mono text-xs">radius, points</Td><Td>Puntos aleatorios dentro de una esfera — explosión difusa.</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="targets">A quién/dónde apunta cada paso</SectionHeading>
      <p>
        <code>EffectTarget</code> resuelve la ubicación/destinatario de cada paso a partir del{" "}
        <code>EffectContext</code> (quién lo disparó y, opcionalmente, un objetivo):
      </p>
      <Table>
        <Thead>
          <Th>Target</Th>
          <Th>Resuelve a</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">SELF</Td><Td>El jugador que disparó el efecto (<code>caster</code>).</Td></Tr>
          <Tr><Td className="font-mono text-xs">TARGET</Td><Td>La entidad/ubicación objetivo, si el contexto tiene una — si no, cae a SELF.</Td></Tr>
          <Tr><Td className="font-mono text-xs">LOCATION</Td><Td>Todavía cae a la ubicación del caster (no tiene coordenadas propias configurables desde acá).</Td></Tr>
          <Tr><Td className="font-mono text-xs">ALL_NEARBY</Td><Td>Solo para SOUND/TITLE/ACTIONBAR/BOSSBAR — todos los jugadores dentro de <code>radius</code> alrededor de <code>around</code>.</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="formato-yaml">Ejemplos de archivo YAML</SectionHeading>
      <CodeBlock
        language="yaml"
        filename="effects/level_up.yml (plugins/SackEffects/effects/)"
        code={
          "id: level_up\n" +
          'display-name: "&6¡Subida de nivel!"\n' +
          'description: "Explosión de partículas doradas + sonido + título, para disparar desde otro addon al subir de nivel."\n' +
          "\n" +
          "steps:\n" +
          "  - type: PARTICLE\n" +
          "    delay: 0\n" +
          "    particle: TOTEM_OF_UNDYING\n" +
          "    shape: SPHERE\n" +
          "    target: SELF\n" +
          "    radius: 1.2\n" +
          "    points: 60\n" +
          "\n" +
          "  - type: SOUND\n" +
          "    delay: 0\n" +
          "    sound: ENTITY_PLAYER_LEVELUP\n" +
          "    target: SELF\n" +
          "    volume: 1.0\n" +
          "    pitch: 1.0\n" +
          "\n" +
          "  - type: TITLE\n" +
          "    delay: 2\n" +
          '    title: "&6&l¡NIVEL SUPERIOR!"\n' +
          '    subtitle: "&7Seguí así"\n' +
          "    target: SELF\n" +
          "    fade-in: 5\n" +
          "    stay: 40\n" +
          "    fade-out: 10\n" +
          "\n" +
          "  - type: PARTICLE\n" +
          "    delay: 10\n" +
          "    particle: FIREWORK\n" +
          "    shape: BURST\n" +
          "    target: SELF\n" +
          "    count: 40\n" +
          "    speed: 0.3\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="effects/frost_nova.yml"
        code={
          "id: frost_nova\n" +
          'display-name: "&b&lNova de Escarcha"\n' +
          'description: "Onda de partículas + sonido + bossbar temporal + lentitud para todos los que estén cerca — un hechizo de área."\n' +
          "\n" +
          "steps:\n" +
          "  - type: PARTICLE\n" +
          "    delay: 0\n" +
          "    particle: SNOWFLAKE\n" +
          "    shape: CIRCLE\n" +
          "    target: SELF\n" +
          "    radius: 0.5\n" +
          "    points: 30\n" +
          "\n" +
          "  - type: SOUND\n" +
          "    delay: 0\n" +
          "    sound: BLOCK_GLASS_BREAK\n" +
          "    target: LOCATION\n" +
          "    volume: 1.5\n" +
          "    pitch: 0.7\n" +
          "\n" +
          "  - type: PARTICLE\n" +
          "    delay: 3\n" +
          "    particle: SNOWFLAKE\n" +
          "    shape: CIRCLE\n" +
          "    target: SELF\n" +
          "    radius: 2.5\n" +
          "    points: 50\n" +
          "\n" +
          "  - type: BOSSBAR\n" +
          "    delay: 3\n" +
          '    title: "&b❄ Nova de Escarcha"\n' +
          "    color: AQUA\n" +
          "    duration: 60\n" +
          "    target: ALL_NEARBY\n" +
          "    around: SELF\n" +
          "    radius: 6\n" +
          "\n" +
          "  - type: POTION\n" +
          "    delay: 3\n" +
          "    potion: SLOWNESS\n" +
          "    duration: 60\n" +
          "    amplifier: 1\n" +
          "    target: ALL_NEARBY\n" +
          "    around: SELF\n" +
          "    radius: 6\n"
        }
      />

      <Callout tone="tip" title="Referencia completa: todos los campos en un solo archivo">
        <code>effects/reference_full.yml</code> (incluido en el jar) usa los 6 tipos de paso, las 8 formas de
        partícula (incluyendo <code>LINE</code>, <code>HELIX</code>, <code>CONE</code> y{" "}
        <code>CUBE_OUTLINE</code>, que los ejemplos de arriba no muestran) y los 4 targets, incluyendo{" "}
        <code>TARGET</code>.
      </Callout>

      <YamlBuilder
        title="Constructor visual: identidad del efecto"
        description="id/nombre/descripción. La lista de steps es demasiado variada para un formulario lineal (cada tipo tiene sus propios params) — copiá y adaptá uno de los ejemplos de arriba, o usá /sackeffects browser para armarlo paso a paso desde el chat en el juego."
        folder="effects"
        fields={sackEffectFields}
      />

      <SectionHeading id="gui">GUI: Effect Studio de SackEffects</SectionHeading>
      <p>
        <Kbd>/sackeffects browser</Kbd> abre un navegador con botón "Crear nueva". El editor muestra la lista de
        steps (tipo, delay, params resumidos) con soporte para quitarlos (shift-click) y agregar nuevos escribiendo
        en el chat con la sintaxis <code>{"TIPO delay clave=valor,clave2=valor2"}</code>, por ejemplo:
      </p>
      <CodeBlock language="text" code={"PARTICLE 0 particle=FLAME,shape=SPHERE,radius=1.5,points=40\nSOUND 5 sound=ENTITY_BLAZE_SHOOT,volume=1,pitch=1.2"} />
      <p>
        El botón "▶ Probar" dispara el efecto completo sobre vos mismo, ahí mismo, para ver/escuchar el resultado
        sin salir de la GUI.
      </p>

      <SectionHeading id="api">API para addons — EffectsAPI y EffectBuilder</SectionHeading>
      <p>
        Cualquier addon que declare <Kbd>softdepend: [SackEffects]</Kbd> puede disparar un efecto ya definido por
        su id:
      </p>
      <CodeBlock
        language="java"
        filename="OtroAddon.java"
        code={
          "if (SackEffectsAPI.isReady()) {\n" +
          '    SackEffectsAPI.get().play("level_up", player);\n' +
          "}\n"
        }
      />
      <p>
        O armar uno de una sola vez, sin declarar nada en YAML, con el constructor fluido{" "}
        <code>EffectBuilder</code> (mismo motor de ejecución por debajo, comportamiento idéntico):
      </p>
      <CodeBlock
        language="java"
        code={
          "SackEffectsAPI.get().builder()\n" +
          "    .particle(Particle.FLAME).shape(\"SPHERE\").radius(1.5).points(40)\n" +
          "    .then().sound(Sound.ENTITY_BLAZE_SHOOT).volume(1).pitch(1.2)\n" +
          "    .play(caster);\n"
        }
      />

      <SectionHeading id="comandos">Comandos</SectionHeading>
      <Table>
        <Thead>
          <Th>Comando</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">/sackeffects browser</Td><Td>Abre el navegador gráfico.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/sackeffects reload</Td><Td>Recarga las definiciones desde disco.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/sackeffects test <id> [jugador]"}</Td><Td>Dispara un efecto sobre vos mismo o sobre otro jugador.</Td></Tr>
        </tbody>
      </Table>
      <p>Todos requieren <Badge tone="amber">sackeffects.admin.*</Badge> (default: op).</p>

      <PrevNext current="sackeffects" onNavigate={onNavigate} />
    </>
  );
}
