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

const effectFields: YamlField[] = [
  {
    key: "id",
    label: "Id",
    type: "string",
    default: "nuevo_efecto",
    placeholder: "bleeding",
  },
  {
    key: "display-name",
    label: "Nombre visible",
    type: "string",
    placeholder: "&cSangrado",
  },
  {
    key: "icon",
    label: "Ícono (Material)",
    type: "string",
    default: "NETHER_STAR",
  },
  { key: "color", label: "Color", type: "string", default: "WHITE" },
  {
    key: "category",
    label: "Categoría",
    type: "select",
    options: [
      "COMBAT",
      "SURVIVAL",
      "MAGIC",
      "ELEMENTAL",
      "PROFESSION",
      "SOCIAL",
      "EVENTS",
      "OTHER",
    ],
    default: "OTHER",
  },
  {
    key: "rarity",
    label: "Rareza",
    type: "select",
    options: ["COMMON", "UNCOMMON", "RARE", "EPIC", "LEGENDARY"],
    default: "COMMON",
  },
  { key: "description", label: "Descripción", type: "string" },
  {
    key: "duration",
    label: "Duración (ticks, 0 = permanente)",
    type: "number",
    default: "100",
  },
  { key: "priority", label: "Prioridad", type: "number", default: "0" },
  { key: "visible", label: "Visible en HUD", type: "boolean", default: "true" },
  { key: "tags", label: "Tags", type: "list", placeholder: "bleed, debuff" },
  {
    key: "conflicts",
    label: "Conflictos (ids de otros efectos)",
    type: "list",
    placeholder: "burning",
  },
];

export function Effects({
  onNavigate,
}: {
  onNavigate: (slug: string) => void;
}) {
  return (
    <>
      <PageHeader title="Effects (RPGRoll-Effects)">
        Motor de efectos de estado — buffs, debuffs, auras, maldiciones,
        bendiciones — construidos a partir de componentes combinables, con
        condiciones para aplicarse, reglas de acumulación, conflictos e
        inmunidades por tag. Pensado para que items, encantamientos, hechizos,
        mobs, dungeons o cualquier otro addon lo use como su motor central de
        "qué le pasa a esta entidad ahora".
      </PageHeader>

      <Callout tone="info" title="No son PotionEffects vanilla">
        Un efecto de RPGRoll-Effects es un objeto compuesto: metadata,
        condiciones para aplicarse, una lista de <code>components</code> (qué
        hace mientras está activo, cada uno con su propio trigger), reglas de
        stacking, conflictos y tags de inmunidad. Los <code>PotionEffect</code>{" "}
        vanilla siguen existiendo — de hecho un componente{" "}
        <code>POTION_VANILLA</code> puede aplicar uno real, para que se vea el
        ícono clásico — pero son solo una herramienta más entre varias.
      </Callout>

      <SectionHeading id="requisitos">Requisitos</SectionHeading>
      <CodeBlock
        language="yaml"
        code={"depend: [RPGRoll]\nsoftdepend: [SackEffects, RPGRoll-Guilds]"}
      />
      <p>
        Sin{" "}
        <button
          type="button"
          onClick={() => onNavigate("sackeffects")}
          className="text-violet-600 underline dark:text-violet-400"
        >
          SackEffects
        </button>{" "}
        instalado, los componentes <code>VISUAL</code> simplemente no hacen nada
        (el resto del efecto funciona igual). Sin RPGRoll-Guilds, las
        condiciones <code>GUILD</code>/<code>TEAM</code> nunca se cumplen.
      </p>

      <SectionHeading id="modelo">Anatomía de un efecto</SectionHeading>
      <p>
        Un <code>EffectDefinition</code> combina identidad (nombre, ícono,
        color, categoría, rareza, descripción, duración, prioridad, visibilidad)
        con cuatro listas independientes:
      </p>
      <Table>
        <Thead>
          <Th>Parte</Th>
          <Th>Responde a</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className="font-mono text-xs">conditions</Td>
            <Td>
              ¿Se puede aplicar? Se evalúa una sola vez, al aplicar — no se
              re-chequea mientras sigue activo.
            </Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">components</Td>
            <Td>
              ¿Qué hace? Cada uno dispara en su propio momento (trigger)
              mientras el efecto está activo.
            </Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">stacking / conflicts / tags</Td>
            <Td>
              ¿Qué pasa si se reaplica, o si choca con otro efecto activo?
            </Td>
          </Tr>
        </tbody>
      </Table>

      <SectionHeading id="categorias">Categorías</SectionHeading>
      <p>
        Puramente organizativas — usadas para filtrar en el navegador del Effect
        Studio.
      </p>
      <Table>
        <Thead>
          <Th>Categoría</Th>
          <Th>Pensada para</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className="font-mono text-xs">COMBAT</Td>
            <Td>Sangrado, aturdimiento, escudos.</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">SURVIVAL</Td>
            <Td>Veneno, hambre, agotamiento.</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">MAGIC</Td>
            <Td>Bendiciones, maldiciones, silencios.</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">ELEMENTAL</Td>
            <Td>Fuego, hielo, electricidad.</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">PROFESSION</Td>
            <Td>Bonos temporales de un job/profesión.</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">SOCIAL</Td>
            <Td>Auras de guild/team.</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">EVENTS</Td>
            <Td>Efectos de temporada/evento especial.</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">OTHER</Td>
            <Td>Cualquier cosa que no encaje arriba (default).</Td>
          </Tr>
        </tbody>
      </Table>

      <SectionHeading id="componentes">
        Componentes — qué hace el efecto
      </SectionHeading>
      <p>
        Cada <code>EffectComponent</code> tiene un <code>type</code>, un{" "}
        <code>trigger</code> (cuándo dispara) y params libres — mismo patrón
        "tipo + params" que <code>ItemAction</code>/<code>MobAction</code> en el
        resto del proyecto.
      </p>
      <Table>
        <Thead>
          <Th>Tipo</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className="font-mono text-xs">ATTRIBUTE_MODIFIER</Td>
            <Td>
              Sube/baja cualquier atributo vanilla (ej.{" "}
              <code>GENERIC_ARMOR</code>, <code>GENERIC_ATTACK_DAMAGE</code>).
            </Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">MOVEMENT_MODIFIER</Td>
            <Td>
              Atajo de ATTRIBUTE_MODIFIER específico para velocidad de
              movimiento.
            </Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">
              PERIODIC_DAMAGE / PERIODIC_HEAL
            </Td>
            <Td>
              Daño/curación periódicos — <code>amount</code> +{" "}
              <code>amount-per-stack</code> opcional para que escale con los
              stacks.
            </Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">POTION_VANILLA</Td>
            <Td>
              Aplica un <code>PotionEffect</code> vanilla real (ícono clásico en
              el HUD de Minecraft).
            </Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">VISUAL</Td>
            <Td>
              Dispara un efecto de SackEffects por id
              (partículas/sonido/título/bossbar) — solo funciona sobre
              jugadores.
            </Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">SOUND</Td>
            <Td>Un sonido vanilla suelto, sin necesitar SackEffects.</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">MESSAGE</Td>
            <Td>Mensaje de chat o actionbar al titular.</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">SHIELD</Td>
            <Td>
              Otorga absorción (vida de escudo, se descuenta antes que la vida
              real).
            </Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">SILENCE / CONFUSION</Td>
            <Td>
              Banderas puras — no hacen nada por sí solas, otros addons
              consultan <code>EffectsAPI#isSilenced/isConfused</code> antes de
              permitir lanzar un hechizo, etc.
            </Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">AURA</Td>
            <Td>
              Reaplica un efecto (el mismo u otro por id) a las entidades vivas
              dentro de <code>radius</code>.
            </Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">COMMAND</Td>
            <Td>
              Ejecuta un comando de consola con el placeholder{" "}
              <code>%target%</code>.
            </Td>
          </Tr>
        </tbody>
      </Table>
      <Callout
        tone="tip"
        title="ATTRIBUTE_MODIFIER/MOVEMENT_MODIFIER ignoran su propio trigger"
      >
        Necesitan correr tanto al aplicar (agregar el modifier) como al
        expirar/remover (sacarlo) — por eso, sin importar qué{" "}
        <code>trigger</code> les pongas en el YAML, siempre disparan en esos 3
        momentos del ciclo de vida del efecto. El resto de los tipos sí respeta
        el trigger tal cual se configura.
      </Callout>

      <SectionHeading id="triggers">
        Triggers — cuándo dispara cada componente
      </SectionHeading>
      <Table>
        <Thead>
          <Th>Trigger</Th>
          <Th>Dispara cuando...</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className="font-mono text-xs">ON_APPLY</Td>
            <Td>El efecto se aplica por primera vez.</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">ON_TICK</Td>
            <Td>
              Cada tick del servidor mientras está activo — usar con cuidado, es
              costoso.
            </Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">ON_SECOND</Td>
            <Td>
              Cada 20 ticks (1 segundo) mientras está activo — el más usado para
              daño/curación periódicos.
            </Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">
              ON_DAMAGE_TAKEN / ON_DAMAGE_DEALT
            </Td>
            <Td>El titular recibe daño / el titular ataca a alguien.</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">ON_DEATH / ON_HEAL</Td>
            <Td>El titular muere / se cura (por cualquier motivo).</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">ON_FOOD_CONSUME</Td>
            <Td>El titular consume un ítem de comida.</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">ON_EXPIRE / ON_REMOVE</Td>
            <Td>
              Se acabó la duración de forma natural / se removió antes de tiempo
              (comando, conflicto, upgrade).
            </Td>
          </Tr>
        </tbody>
      </Table>
      <Callout
        tone="warning"
        title="REGION_ENTER, REGION_EXIT, COMBAT_START y SPELL_CAST todavía no tienen listener"
      >
        Existen en el enum para que YAML y otros addons ya puedan escribirlos,
        pero no hay ningún evento propio de este módulo que los dispare — Quests
        (regiones) y un futuro addon de magia (hechizos) no exponen todavía una
        API pública estable para engancharse. Cualquier addon puede dispararlos
        igual a mano vía{" "}
        <code>EffectsAPI.get().fireTrigger(tipo, entidad)</code> — quedan para
        una próxima pasada de integración.
      </Callout>

      <SectionHeading id="condiciones">
        Condiciones — requisitos para aplicarse
      </SectionHeading>
      <Table>
        <Thead>
          <Th>Tipo</Th>
          <Th>Chequea</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className="font-mono text-xs">LEVEL_MIN / LEVEL_MAX</Td>
            <Td>Nivel del jugador (vía RPGRollAPI).</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">RACE / CLASS / JOB</Td>
            <Td>Raza / clase / profesión actual.</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">WORLD / WEATHER / TIME_RANGE</Td>
            <Td>
              Mundo, clima (CLEAR/RAIN/STORM) u hora del mundo — vanilla,
              aplican a cualquier entidad.
            </Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">HEALTH_BELOW / HEALTH_ABOVE</Td>
            <Td>Porcentaje de vida actual vs. máxima.</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">MANA_BELOW / MANA_ABOVE</Td>
            <Td>
              Porcentaje de maná actual (<code>CombatStats</code> de
              RPGRollAPI).
            </Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">GUILD / TEAM</Td>
            <Td>
              Pertenencia a un guild (opcionalmente uno específico por id) / a
              un team — vía GuildsAPI.
            </Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">PERMISSION</Td>
            <Td>Nodo de permiso de Bukkit.</Td>
          </Tr>
        </tbody>
      </Table>
      <Callout
        tone="info"
        title="Todas menos WORLD/WEATHER/TIME_RANGE/HEALTH_* solo aplican a jugadores"
      >
        Sobre cualquier otro <code>LivingEntity</code> (mobs) esas condiciones
        se consideran automáticamente satisfechas — no tiene sentido gatear el
        efecto propio de un mob según "nivel de jugador". REGION y DUNGEON{" "}
        <strong>no</strong> están disponibles todavía como tipo de condición: ni
        Quests ni Dungeons exponen una API pública estable (tipo{" "}
        <code>GuildsAPI</code>) para consultarlas desde otro addon.
      </Callout>

      <SectionHeading id="stacking">Acumulación (stacking)</SectionHeading>
      <Table>
        <Thead>
          <Th>Modo</Th>
          <Th>Al reaplicar sobre un objetivo que ya lo tiene...</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className="font-mono text-xs">NONE</Td>
            <Td>Solo reinicia la duración. Sin stacks.</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">INDEPENDENT</Td>
            <Td>
              Cada aplicación crea una instancia nueva que corre en paralelo con
              su propia duración (ej. varias fuentes de daño distintas).
            </Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">REFRESH</Td>
            <Td>
              Un único contador de stacks (tope <code>max-stacks</code>) que
              sube y reinicia la duración.
            </Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">UPGRADE</Td>
            <Td>
              Igual que REFRESH, pero al llegar al tope se reemplaza por
              completo por <code>upgrade-to</code> (otro efecto por id).
            </Td>
          </Tr>
        </tbody>
      </Table>
      <p>
        El ejemplo incluido <code>bleeding</code> usa <code>UPGRADE</code> con{" "}
        <code>max-stacks: 3</code> y <code>upgrade-to: hemorrhage</code> — al
        tercer stack, Sangrado se remueve solo y se aplica Hemorragia en su
        lugar (más daño, además frena el movimiento).
      </p>

      <SectionHeading id="conflictos-inmunidades">
        Conflictos e inmunidades
      </SectionHeading>
      <p>
        <code>conflicts</code> es una lista de ids de otros efectos — al aplicar
        uno, se remueve cualquier efecto activo que esté en conflicto en
        cualquiera de los dos sentidos (no hace falta que ambos se declaren
        mutuamente). Los ejemplos <code>frozen</code>/<code>burning</code> se
        declaran en conflicto entre sí: aplicar uno mientras el otro está activo
        lo remueve.
      </p>
      <p>
        Las inmunidades son por <em>tag</em> (texto libre, ej. <code>fire</code>
        , <code>cold</code>, <code>curse</code>), no por id de efecto — así una
        raza "Elemental de Hielo" puede ser inmune a <code>cold</code> sin
        importar cuántos efectos distintos usen ese tag. No hay ningún sistema
        de razas cableado automáticamente: cualquier addon llama a{" "}
        <code>EffectsAPI.get().addImmunity(entity, "fire")</code> cuando
        corresponda (ej. al aplicar la raza Demonio).
      </p>

      <SectionHeading id="formato-yaml">
        Ejemplos de archivo YAML
      </SectionHeading>
      <p>
        Los 7 efectos incluidos por defecto demuestran las dos mecánicas más
        particulares del sistema: stacking <code>UPGRADE</code> (sangrado →
        hemorragia) y <code>conflicts</code> (congelado × quemadura).
      </p>
      <CodeBlock
        language="yaml"
        filename="effects/bleeding.yml (plugins/RPGRoll-Effects/effects/)"
        code={
          "id: bleeding\n" +
          'display-name: "&cSangrado"\n' +
          "icon: REDSTONE\n" +
          "color: RED\n" +
          "category: COMBAT\n" +
          "rarity: COMMON\n" +
          'description: "Daño periódico que escala con los stacks. Al llegar a 3 stacks se transforma en Hemorrhage."\n' +
          "duration: 100\n" +
          "\n" +
          "tags: [bleed, debuff]\n" +
          "\n" +
          "stacking:\n" +
          "  mode: UPGRADE\n" +
          "  max-stacks: 3\n" +
          "  upgrade-to: hemorrhage\n" +
          "\n" +
          "components:\n" +
          "  - type: PERIODIC_DAMAGE\n" +
          "    trigger: ON_SECOND\n" +
          "    amount: 1\n" +
          "    amount-per-stack: 0.5\n" +
          "\n" +
          "  - type: SOUND\n" +
          "    trigger: ON_APPLY\n" +
          "    sound: ENTITY_PLAYER_HURT\n" +
          "    volume: 0.6\n" +
          "    pitch: 1.6\n" +
          "\n" +
          "  - type: MESSAGE\n" +
          "    trigger: ON_APPLY\n" +
          '    text: "&c¡Estás sangrando!"\n'
        }
      />
      <CodeBlock
        language="yaml"
        filename="effects/frozen.yml"
        code={
          "id: frozen\n" +
          'display-name: "&bCongelado"\n' +
          "icon: ICE\n" +
          "category: ELEMENTAL\n" +
          'description: "Reduce velocidad y ataque. Se rompe si te aplican Burning (y viceversa)."\n' +
          "duration: 100\n" +
          "\n" +
          "tags: [cold, debuff]\n" +
          "conflicts: [burning]\n" +
          "\n" +
          "components:\n" +
          "  - type: MOVEMENT_MODIFIER\n" +
          "    trigger: ON_APPLY\n" +
          "    amount: -0.4\n" +
          "    operation: ADD_SCALAR\n" +
          "\n" +
          "  - type: ATTRIBUTE_MODIFIER\n" +
          "    trigger: ON_APPLY\n" +
          "    attribute: GENERIC_ATTACK_DAMAGE\n" +
          "    amount: -1\n" +
          "    operation: ADD_NUMBER\n" +
          "\n" +
          "  - type: MESSAGE\n" +
          "    trigger: ON_APPLY\n" +
          '    text: "&b¡Estás congelado!"\n'
        }
      />
      <p>
        También incluidos: <code>hemorrhage</code> (el estado final del
        sangrado), <code>burning</code> (conflicto recíproco de{" "}
        <code>frozen</code>, stacking <code>REFRESH</code>), <code>poison</code>{" "}
        (daño periódico que escala con stacks), <code>blessing</code> (curación
        periódica + armadura) y <code>shield</code> (absorción, stacking{" "}
        <code>REFRESH</code>) — todos en <code>effects/</code> dentro de la
        carpeta de datos del plugin.
      </p>

      <Callout
        tone="tip"
        title="Referencia completa: todos los campos en un solo archivo"
      >
        <code>effects/reference_full.yml</code> (incluido en el jar) usa las 15
        condiciones, los 13 tipos de componente, los 14 triggers (incluidos los
        4 sin listener todavía) y stacking <code>UPGRADE</code> — todo en un
        solo archivo.
      </Callout>

      <YamlBuilder
        title="Constructor visual: identidad del efecto"
        description="Metadata, tags y conflictos. Conditions, components y stacking son demasiado variados para un formulario lineal — el editor in-game los separa en pantallas propias (EffectConditionsEditorGUI, EffectComponentsEditorGUI, EffectStackingEditorGUI); acá lo más práctico es copiar y adaptar uno de los ejemplos de arriba."
        folder="effects"
        fields={effectFields}
      />

      <SectionHeading id="gui">GUI: Effect Studio</SectionHeading>
      <p>
        <Kbd>/rpgeffects browser</Kbd> abre el navegador — busca por substring
        de id/nombre, filtra por categoría (ciclando con click), y duplica un
        efecto existente con shift-click. Cada efecto abre un hub con la
        identidad completa
        (ícono/color/categoría/rareza/nombre/descripción/duración/prioridad/visible)
        más 3 accesos a pantallas dedicadas:
      </p>
      <Table>
        <Thead>
          <Th>Pantalla</Th>
          <Th>Edita</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td>Condiciones</Td>
            <Td>
              Lista de requisitos, agregados por chat con{" "}
              <code>{"TIPO clave=valor,clave2=valor2"}</code>.
            </Td>
          </Tr>
          <Tr>
            <Td>Componentes</Td>
            <Td>
              Lista de componentes, agregados por chat con{" "}
              <code>{"TIPO TRIGGER clave=valor,clave2=valor2"}</code>.
            </Td>
          </Tr>
          <Tr>
            <Td>Stacking / Tags / Conflictos</Td>
            <Td>
              Modo de acumulación, tope de stacks, a qué efecto se transforma,
              tags y conflictos (listas separadas por comas).
            </Td>
          </Tr>
        </tbody>
      </Table>
      <p>
        El botón "▶ Probar en vos mismo" del hub aplica el efecto directamente,{" "}
        <strong>ignorando las condiciones</strong> — es una previsualización, no
        un uso real.
      </p>

      <SectionHeading id="api">API para addons — EffectsAPI</SectionHeading>
      <CodeBlock
        language="java"
        filename="OtroAddon.java"
        code={
          "// Aplicar un efecto ya definido — chequea condiciones/inmunidad/conflictos/stacking solo.\n" +
          'boolean applied = EffectsAPI.get().apply("poison", target, source);\n' +
          "\n" +
          "// Consultar antes de aplicar, para mostrarle al jugador por qué no se pudo.\n" +
          'List<String> reasons = EffectsAPI.get().checkConditions("poison", target);\n' +
          "\n" +
          "// Consultas de estado — útil desde un futuro addon de hechizos.\n" +
          "if (EffectsAPI.get().isSilenced(caster)) {\n" +
          '    caster.sendMessage("No podés lanzar hechizos, estás silenciado.");\n' +
          "    return;\n" +
          "}\n" +
          "\n" +
          "// Inmunidades manuales (ej. al aplicar una raza).\n" +
          'EffectsAPI.get().addImmunity(player, "fire");\n'
        }
      />

      <SectionHeading id="comandos">Comandos</SectionHeading>
      <Table>
        <Thead>
          <Th>Comando</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className="font-mono text-xs">/rpgeffects browser</Td>
            <Td>Abre el Effect Studio.</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">/rpgeffects reload</Td>
            <Td>Recarga las definiciones desde disco.</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">
              {"/rpgeffects apply <id> <jugador>"}
            </Td>
            <Td>
              Aplica un efecto, respetando condiciones (muestra los motivos de
              rechazo si no se puede).
            </Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">
              {"/rpgeffects remove <id> <jugador>"}
            </Td>
            <Td>Remueve un efecto activo.</Td>
          </Tr>
          <Tr>
            <Td className="font-mono text-xs">
              {"/rpgeffects list [jugador]"}
            </Td>
            <Td>Lista los efectos activos (stacks, tiempo restante).</Td>
          </Tr>
        </tbody>
      </Table>
      <p>
        Todos requieren <Badge tone="amber">rpgrolleffects.admin.*</Badge>{" "}
        (default: op).
      </p>
      <PrevNext current="rpgroll-effects" onNavigate={onNavigate} />
    </>
  );
}
