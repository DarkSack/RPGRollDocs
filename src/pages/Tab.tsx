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
  Badge,
  PrevNext,
  YamlBuilder,
  type YamlField,
} from "../components/ui";

const profileFields: YamlField[] = [
  { key: "id", label: "Id", type: "string", default: "nuevo_perfil", placeholder: "default" },
  { key: "tablist", label: "Tablist (header/footer/playerlist)", type: "string", placeholder: "default" },
  { key: "scoreboard", label: "Scoreboard (sidebar)", type: "string", placeholder: "default" },
  { key: "nametag", label: "Nametag (multi-línea)", type: "string", placeholder: "default" },
  { key: "belowname", label: "BelowName", type: "string", placeholder: "default" },
  { key: "teams", label: "Teams (prefix/suffix/color)", type: "string", placeholder: "default" },
  { key: "sorting", label: "Sorting", type: "string", placeholder: "default" },
  { key: "bossbar", label: "BossBar (opcional)", type: "string", placeholder: "" },
  { key: "layout", label: "Layout preset (opcional)", type: "string", placeholder: "" },
];

const contextFields: YamlField[] = [
  { key: "id", label: "Id", type: "string", default: "nuevo_contexto", placeholder: "vip" },
  { key: "priority", label: "Prioridad (gana el número más alto)", type: "number", default: "0" },
  { key: "profile", label: "Perfil completo a aplicar (opcional)", type: "string", placeholder: "" },
  { key: "tablist", label: "Override: solo tablist (opcional)", type: "string", placeholder: "" },
  { key: "scoreboard", label: "Override: solo scoreboard (opcional)", type: "string", placeholder: "" },
  { key: "nametag", label: "Override: solo nametag (opcional)", type: "string", placeholder: "" },
  { key: "bossbar", label: "Override: solo bossbar (opcional)", type: "string", placeholder: "" },
];

export function Tab({ onNavigate }: { onNavigate: (slug: string) => void }) {
  return (
    <>
      <PageHeader title="RPGRoll-TAB">
        Personalización avanzada de TabList, Scoreboard, Nametags, BelowName y BossBars. El addon más grande del
        ecosistema — no tiene ni una línea de lógica de RPG hardcodeada: todo lo que muestra sobre nivel, clase,
        guild, job, etc. le llega vía <code>{"{placeholder}"}</code> registrado por el addon dueño de esa
        información.
      </PageHeader>

      <SectionHeading id="requisitos">Requisitos</SectionHeading>
      <CodeBlock language="yaml" code={"depend: [RPGRoll]\nsoftdepend: [ProtocolLib, PlaceholderAPI]"} />
      <p>
        Funciona completo sin ProtocolLib (header/footer, sorting, teams, nametag multi-línea, belowname,
        sidebar, bossbars — todo vía API nativa de Paper/Adventure). Con ProtocolLib instalado se suma el control
        de visibilidad del tablist <em>independiente</em> de la visibilidad real de la entidad (playerlist por
        mundo a nivel de entradas, no solo de header/footer). Sin PlaceholderAPI, los placeholders internos (
        <code>{"{player}"}</code>, <code>{"{ping}"}</code>, <code>{"{health}"}</code>...) y los que registre
        cualquier addon vía la API pública siguen funcionando — solo se pierde el puente a expansiones{" "}
        <code>{"%addon_x%"}</code> ya existentes de PlaceholderAPI.
      </p>

      <SectionHeading id="filosofia">Filosofía: cero lógica de RPG hardcodeada</SectionHeading>
      <p>
        RPGRoll-TAB no sabe qué es una "guild" ni un "job". Todo concepto específico de otro addon se expresa como
        un placeholder: internos vía <code>TABPlaceholderRegistry</code> (registro Java directo, funciona sin
        PlaceholderAPI), o externos vía el puente automático a expansiones de PlaceholderAPI ya existentes
        (Economy, Ascension, Mobs...). El único lugar donde esto se nota en el YAML es el Context Engine: las
        condiciones "nativas" (<code>world</code>/<code>permission</code>/<code>gamemode</code>/
        <code>dimension</code>/<code>weather</code>) se resuelven directo contra Bukkit; todo lo demás — guild,
        party, dungeon, quest, región, combate — se expresa como condición <code>placeholder</code> genérica.
      </p>
      <CodeBlock
        language="yaml"
        code={
          "conditions:\n" +
          "  - type: world\n" +
          "    value: dungeon_world\n" +
          "  - type: placeholder\n" +
          '    placeholder: "{dungeon_id}"\n' +
          "    operator: NOT_EMPTY\n" +
          "  - type: placeholder\n" +
          '    placeholder: "{guild_name}"\n' +
          "    operator: EQUALS\n" +
          "    value: Knights\n"
        }
      />

      <SectionHeading id="arquitectura">Arquitectura</SectionHeading>
      <p>
        Cada jugador online tiene su propio <code>Scoreboard</code> individual (Bukkit no permite más de uno
        activo por jugador a la vez, y ese único objeto determina tanto los colores de nametag que ve —vía
        Teams— como su sidebar/belowname). Los Teams de <em>todos</em> los jugadores se espejan en el tablero de
        cada viewer para que nadie pierda los colores de nametag del resto solo por tener su propio sidebar.
      </p>
      <Table>
        <Thead>
          <Th>Elemento</Th>
          <Th>Mecanismo</Th>
          <Th>Requiere ProtocolLib</Th>
        </Thead>
        <tbody>
          <Tr><Td>Header/Footer</Td><Td>Adventure <code>Player#sendPlayerListHeaderAndFooter</code></Td><Td><Badge tone="green">No</Badge></Td></Tr>
          <Tr><Td>Nombre en el tablist</Td><Td><code>Player#playerListName</code></Td><Td><Badge tone="green">No</Badge></Td></Tr>
          <Tr><Td>Orden visual + prefix/suffix/color</Td><Td>Team por jugador, nombre del Team codifica el rango (truco estándar de sorting)</Td><Td><Badge tone="green">No</Badge></Td></Tr>
          <Tr><Td>Nametag multi-línea</Td><Td>Entidades <code>TextDisplay</code> montadas como pasajero, con offset por <code>Transformation</code></Td><Td><Badge tone="green">No</Badge></Td></Tr>
          <Tr><Td>Nametag distinto para staff</Td><Td><code>Entity#setVisibleByDefault(false)</code> + <code>showEntity</code>/<code>hideEntity</code> por-viewer</Td><Td><Badge tone="green">No</Badge></Td></Tr>
          <Tr><Td>BelowName</Td><Td><code>DisplaySlot.BELOW_NAME</code> en el tablero individual</Td><Td><Badge tone="green">No</Badge></Td></Tr>
          <Tr><Td>Sidebar con líneas largas</Td><Td>Entradas invisibles (<code>§0</code>-<code>§f</code>) + Team prefix/suffix por línea</Td><Td><Badge tone="green">No</Badge></Td></Tr>
          <Tr><Td>BossBars múltiples</Td><Td>Adventure <code>BossBar</code> nativo, uno por definición mostrado simultáneamente</Td><Td><Badge tone="green">No</Badge></Td></Tr>
          <Tr><Td>Visibilidad del tablist por-viewer</Td><Td>Flag <code>UPDATE_LISTED</code> del paquete <code>PLAYER_INFO</code> — separa "aparece en la lista" de "existe en el mundo"</Td><Td><Badge tone="amber">Sí</Badge></Td></Tr>
        </tbody>
      </Table>
      <Callout tone="warning" title="Sobre 'Layout' y columnas">
        El cliente vanilla decide por su cuenta en cuántas columnas mostrar el tablist (según cantidad de
        jugadores y tamaño de ventana) — <strong>ningún plugin de servidor puede forzar un número de columnas
        distinto</strong>, es puramente client-side. Lo que sí es 100% controlable es el <em>orden</em> (Sorting +
        Teams) y agrupar visualmente por rango — los "layouts predefinidos" (classic/ranked/guild/dungeon/...) son
        presets de Sorting + Teams, no una grilla arbitraria.
      </Callout>

      <SectionHeading id="motor-de-contexto">Context Engine y resolución de perfil</SectionHeading>
      <p>
        En cada evento relevante (join, cambio de mundo, comando admin, o cualquier addon llamando a{" "}
        <code>TABAPI.get().player(p).refresh()</code>) se recorren los contextos de mayor a menor{" "}
        <code>priority</code> y se aplica el primero cuyas condiciones se cumplan TODAS. Un contexto puede
        reemplazar el <code>TABProfile</code> completo (<code>profile: dungeon</code>) o solo una parte (dejar{" "}
        <code>profile</code> vacío y poner, por ejemplo, solo <code>scoreboard: combat</code> para cambiar
        únicamente el sidebar durante combate, conservando tablist/nametag/belowname del perfil base). Nunca se
        re-evalúa por tick — solo cuando algo pudo haber cambiado el resultado.
      </p>

      <SectionHeading id="perfiles">Profiles</SectionHeading>
      <p>
        Un <code>TABProfile</code> agrupa referencias por id a cada sub-configuración. <strong>Siempre debe
        existir un perfil con id <code>default</code></strong> — es el fallback final si ningún contexto matchea.
      </p>
      <CodeBlock
        language="yaml"
        filename="profiles/default.yml"
        code={
          "id: default\n" +
          "tablist: default\n" +
          "scoreboard: default\n" +
          "nametag: default\n" +
          "belowname: default\n" +
          "teams: default\n" +
          "sorting: default\n"
        }
      />
      <YamlBuilder
        title="Constructor visual: Profile"
        description="Cada campo es el id de una definición del tipo correspondiente — dejalo vacío para no aplicar nada de ese tipo."
        folder="profiles"
        fields={profileFields}
      />

      <SectionHeading id="contextos">Contexts</SectionHeading>
      <CodeBlock
        language="yaml"
        filename="contexts/vip.yml"
        code={
          "id: vip\n" +
          "priority: 10\n" +
          "\n" +
          "conditions:\n" +
          "  - type: permission\n" +
          "    value: rpgrolltab.vip\n" +
          "\n" +
          "# profile vacío = override PARCIAL sobre lo que ya haya resuelto\n" +
          "tablist: vip\n"
        }
      />
      <YamlBuilder
        title="Constructor visual: Context"
        description="Las condiciones (conditions) no están en este formulario simplificado — copiá y adaptá el ejemplo de arriba, o usá /tabadmin browser."
        folder="contexts"
        fields={contextFields}
      />

      <SectionHeading id="tablist">TabList: header, footer y playerlist</SectionHeading>
      <p>
        <code>header.animation</code>/<code>footer.animation</code> referencian una <code>AnimationDefinition</code>{" "}
        (frames que ciclan cada <code>interval</code> ticks) — si se omiten, <code>lines</code> se muestra
        estático. <code>player-format</code> resuelve <code>{"{prefix}"}</code>/<code>{"{suffix}"}</code> desde el
        Team activo, <code>{"{ping_formatted}"}</code> desde los tramos de <code>ping</code>, y{" "}
        <code>{"{gamemode_formatted}"}</code> si <code>gamemode.enabled: true</code>.
      </p>
      <CodeBlock
        language="yaml"
        filename="tablists/default.yml"
        code={
          "id: default\n" +
          "\n" +
          "header:\n" +
          "  animation: rpgroll_title\n" +
          "  lines:\n" +
          '    - "&6&lRPGRoll"\n' +
          '    - "&7Bienvenido, &f{player}"\n' +
          '    - ""\n' +
          "\n" +
          "footer:\n" +
          "  lines:\n" +
          '    - ""\n' +
          '    - "&7Jugadores: &f{online}&7/&f{max}"\n' +
          '    - "&6play.example.com"\n' +
          "\n" +
          'player-format: "{prefix}{player}{suffix} &8- {ping_formatted}"\n' +
          "\n" +
          "ping:\n" +
          '  - format: "&a{ping}ms"\n' +
          "    max: 50\n" +
          '  - format: "&e{ping}ms"\n' +
          "    max: 100\n" +
          '  - format: "&c{ping}ms"\n' +
          "\n" +
          "worlds: []  # vacío = sin restricción de mundo\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="animations/rpgroll_title.yml"
        code={
          "id: rpgroll_title\n" +
          "type: FRAME\n" +
          "interval: 10\n" +
          "frames:\n" +
          '  - "&6&lRPGRoll"\n' +
          '  - "&e&lRPGRoll"\n' +
          '  - "&f&lRPGRoll"\n' +
          '  - "&e&lRPGRoll"\n'
        }
      />
      <p>
        Además de <code>FRAME</code>: <code>SCROLL</code> (ventana deslizante sobre un <code>text</code> largo,
        precalculada a frames en el parseo) y <code>BLINK</code> (alterna <code>text</code>/vacío). El header/footer
        animado se re-renderiza cada 10 ticks vía un scheduler dedicado y liviano — nunca recalcula sorting/teams
        en esa pasada, eso sigue siendo estrictamente event-driven.
      </p>

      <SectionHeading id="sorting">Sorting</SectionHeading>
      <p>
        Forma corta (<code>priority</code>): una palabra por línea. <code>permission</code>/<code>ping</code>/
        <code>world</code>/<code>online-time</code> son nativos; cualquier otra palabra se interpreta como el
        nombre de un placeholder ya registrado por otro addon. Forma explícita (<code>rules</code>): mismo
        resultado, pero permite <code>values</code> (lista de permisos ordenada) para <code>permission</code>, y{" "}
        <code>numeric</code> para comparar placeholders como número en vez de texto.
      </p>
      <CodeBlock
        language="yaml"
        filename="sortings/default.yml"
        code={
          "id: default\n" +
          "priority:\n" +
          "  - permission\n" +
          "  - ping\n" +
          "  - name\n" +
          "\n" +
          "# equivalente explícito:\n" +
          "# rules:\n" +
          '#   - field: permission\n' +
          '#     values: ["rpgrolltab.staff", "rpgrolltab.vip"]\n' +
          "#     order: DESC\n" +
          '#   - placeholder: "{rpgroll_level}"\n' +
          "#     order: DESC\n" +
          "#     numeric: true\n" +
          "#   - field: name\n" +
          "#     order: ASC\n"
        }
      />

      <SectionHeading id="teams-nametag">Teams y Nametag</SectionHeading>
      <CodeBlock
        language="yaml"
        filename="teams/default.yml"
        code={
          "id: default\n" +
          'prefix: ""\n' +
          'suffix: ""\n' +
          "color: white\n" +
          "friendly-fire: true\n" +
          "see-friendly-invisibles: true\n" +
          "collision: ALWAYS\n" +
          "nametag-visibility: ALWAYS\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="nametags/default.yml"
        code={
          "id: default\n" +
          "lines:\n" +
          '  - "&8[&f{world}&8]"\n' +
          '  - "{player}"\n' +
          "\n" +
          "# Sección 11: nametag distinto según quién mira\n" +
          "staff-override:\n" +
          '  permission: "rpgrolltab.staff"\n' +
          "  lines:\n" +
          '    - "&c&l[STAFF]"\n' +
          '    - "{player}"\n'
        }
      />
      <Callout tone="tip" title="¿Por qué solo un override de 'staff' y no 'mismo guild'?">
        "¿Tiene el viewer permiso X?" se resuelve sin conocer a ningún otro addon. "¿Están el viewer y el subject
        en la misma guild?" es una relación entre DOS jugadores — no algo que un placeholder de un solo jugador
        pueda expresar. Para ese caso, el addon dueño de esa relación (ej. RPGRoll-Guilds) puede llamar
        directamente a <code>NametagEngine</code> vía la API pública.
      </Callout>

      <SectionHeading id="belowname">BelowName</SectionHeading>
      <p>
        Limitación de Minecraft, no del addon: solo se puede mostrar un <strong>número</strong> debajo del
        nombre. <code>score</code> debe resolver a algo numérico, <code>label</code> es el texto/ícono que
        aparece junto al número.
      </p>
      <CodeBlock
        language="yaml"
        filename="belownames/default.yml"
        code={'id: default\nscore: "{health}"\nlabel: "&c❤"\n'}
      />

      <SectionHeading id="scoreboard">Scoreboard (sidebar)</SectionHeading>
      <p>
        Cada línea es <code>{"{text, condition}"}</code> — <code>condition</code> es opcional (soporta{" "}
        <code>==</code>/<code>!=</code>/<code>&gt;</code>/<code>&gt;=</code>/<code>&lt;</code>/<code>&lt;=</code>,
        compara numérico si ambos lados parsean como número). <code>extends</code> + <code>replacements</code>{" "}
        implementan templates reutilizables: el hijo hereda <code>title</code>/<code>lines</code> del padre y
        reemplaza placeholders literales del padre por sus propios valores.
      </p>
      <CodeBlock
        language="yaml"
        filename="scoreboards/rpg_template.yml"
        code={
          "id: rpg_template\n" +
          'title: "&6&lRPGRoll"\n' +
          "lines:\n" +
          '  - text: "&7Jugador: &f{player}"\n' +
          '  - text: "&7Ping: &a{ping}ms"\n' +
          '  - text: "&c❤ Vida: &f{health}"\n' +
          '    condition: "{health} < 10"\n' +
          '  - text: "&a❤ Vida: &f{health}"\n' +
          '    condition: "{health} >= 10"\n' +
          '  - text: "&6{server}"\n' +
          "priority: 0\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="scoreboards/default.yml"
        code={
          "id: default\n" +
          "extends: rpg_template\n" +
          "replacements:\n" +
          '  server: "play.example.com"\n' +
          "priority: 0\n"
        }
      />
      <p>
        Varios scoreboards pueden coexistir (default/combat/dungeon/boss/...) — el Context Engine decide cuál
        está activo vía <code>profile.scoreboard</code> o un override parcial de contexto; <code>priority</code>{" "}
        entra en juego cuando la resolución de contexto es ambigua.
      </p>

      <SectionHeading id="bossbars">BossBars</SectionHeading>
      <CodeBlock
        language="yaml"
        filename="bossbars/example_event.yml"
        code={
          "id: example_event\n" +
          'title: "&4&l{player} &7— &cEvento de temporada"\n' +
          'progress: "100"\n' +
          "color: RED\n" +
          "style: SEGMENTED_10\n" +
          "priority: 10\n"
        }
      />
      <p>
        No está activado por defecto (ningún perfil ni contexto lo referencia todavía) — sirve de plantilla. Un
        jugador puede tener varias bossbars simultáneas si distintas fuentes (perfil + API de otro addon) las
        muestran a la vez; cada una se identifica por su id y se puede ocultar individualmente.
      </p>

      <SectionHeading id="api">API pública</SectionHeading>
      <CodeBlock
        language="java"
        code={
          "TABAPI tab = TABAPI.get();\n\n" +
          "// Refrescar / forzar perfil de un jugador\n" +
          "tab.player(player).refresh();\n" +
          'tab.player(player).setProfile("dungeon");\n\n' +
          "// Registrar un placeholder — sin conocer PlaceholderAPI\n" +
          'tab.placeholders().register("guild_name", p -> guildService.getGuild(p).name());\n\n' +
          "// Perfil de evento temporal, servidor completo\n" +
          'tab.registerProfile("summer_event", profile);\n' +
          'tab.activateProfile("summer_event");\n' +
          "// ... más tarde:\n" +
          "tab.deactivateEventProfile();\n"
        }
      />
      <p>Eventos disponibles (todos en <code>com.sack.rpgroll.tab.event</code>):</p>
      <Table>
        <Thead>
          <Th>Evento</Th>
          <Th>Cuándo</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">TabProfileChangeEvent</Td><Td>El perfil activo de un jugador cambió.</Td></Tr>
          <Tr><Td className="font-mono text-xs">ScoreboardChangeEvent</Td><Td>El sidebar activo cambió.</Td></Tr>
          <Tr><Td className="font-mono text-xs">NametagUpdateEvent</Td><Td>Se re-renderizó el nametag de un jugador.</Td></Tr>
          <Tr><Td className="font-mono text-xs">PlayerVisibilityEvent</Td><Td>Cancelable — antes de mostrar/ocultar a alguien en un tablist ajeno.</Td></Tr>
          <Tr><Td className="font-mono text-xs">PlaceholderRequestEvent</Td><Td>Informativo — un placeholder desconocido (ni interno ni registrado).</Td></Tr>
          <Tr><Td className="font-mono text-xs">LayoutChangeEvent</Td><Td>Cambió el layout/orden aplicado.</Td></Tr>
          <Tr><Td className="font-mono text-xs">BossBarCreateEvent / BossBarRemoveEvent</Td><Td>Se mostró/ocultó una bossbar.</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="comandos">Comandos</SectionHeading>
      <Table>
        <Thead>
          <Th>Comando</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">/tabadmin reload</Td><Td>Recarga todo el contenido YAML (9 tipos) y refresca a todos los jugadores online.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/tabadmin list</Td><Td>Lista los perfiles definidos.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/tabadmin profile <jugador> <perfil>"}</Td><Td>Fuerza un perfil específico, ignorando el Context Engine hasta el próximo refresh real.</Td></Tr>
        </tbody>
      </Table>
      <p>Todos requieren <Badge tone="amber">rpgrolltab.admin.*</Badge> (default: op), y funcionan desde consola.</p>

      <Callout tone="warning" title="Sin GUI Studio en esta versión">
        A diferencia de otros addons, RPGRoll-TAB todavía no tiene un editor gráfico (browser/editor por cada uno
        de los 9 tipos de contenido) — es 100% YAML + API por ahora, como el resto de plugins de tablist del
        ecosistema Minecraft. El motor completo (los 9 engines, Context Engine, API pública, eventos) está
        implementado y compila; el Studio queda como trabajo a futuro.
      </Callout>

      <PrevNext current="tab" onNavigate={onNavigate} />
    </>
  );
}
