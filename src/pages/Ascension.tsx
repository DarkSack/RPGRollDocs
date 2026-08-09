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

const requirementsGroup: YamlField = {
  key: "requirements",
  label: "Requisitos",
  type: "group",
  fields: [
    { key: "level", label: "Nivel mínimo", type: "number", default: "0" },
    { key: "prestige", label: "Prestigio mínimo", type: "number", default: "0" },
    { key: "trait", label: "Trait requerido", type: "string", placeholder: "arcane_affinity" },
    {
      key: "completed-quests",
      label: "Misiones completadas",
      type: "list",
      placeholder: "trial_of_ashes, dragon_hunt",
      help: "Ids separados por coma (requiere RPGRoll-Quests).",
    },
    {
      key: "reputation",
      label: "Reputación mínima",
      type: "map",
      placeholder: "reino=50, orden_arcana=20",
      help: "facción=cantidad separado por coma.",
    },
  ],
};

const raceEvolutionFields: YamlField[] = [
  { key: "id", label: "Id", type: "string", default: "nueva_evolucion", placeholder: "alto_elfo" },
  { key: "base-race", label: "Raza base", type: "string", placeholder: "elfo" },
  { key: "display-name", label: "Nombre visible", type: "string", placeholder: "&bAlto Elfo" },
  requirementsGroup,
  { key: "stats", label: "Bono de stats", type: "map", placeholder: "intelligence=8, magic_power=10" },
  { key: "affinities", label: "Bono de afinidades", type: "map", placeholder: "light=20" },
  { key: "resistances", label: "Resistencias", type: "map", placeholder: "magic=15" },
  { key: "weaknesses", label: "Debilidades", type: "map", placeholder: "fire=10" },
  { key: "traits", label: "Traits otorgados", type: "list", placeholder: "arcane_affinity" },
  { key: "skills", label: "Skills otorgadas", type: "list", placeholder: "arcane_bolt" },
  { key: "professions", label: "Profesiones exclusivas", type: "list", placeholder: "alquimista" },
];

const classSpecializationFields: YamlField[] = [
  { key: "id", label: "Id", type: "string", default: "nueva_especializacion", placeholder: "berserker" },
  { key: "base-class", label: "Clase base", type: "string", placeholder: "guerrero" },
  { key: "display-name", label: "Nombre visible", type: "string", placeholder: "&4Berserker" },
  requirementsGroup,
  { key: "stats", label: "Bono de stats", type: "map", placeholder: "damage=4" },
  { key: "restrictions", label: "Restricciones", type: "list", placeholder: "no-shield" },
  { key: "exclusive-equipment", label: "Equipo exclusivo", type: "list", placeholder: "berserker_axe" },
];

const prestigeFields: YamlField[] = [
  { key: "id", label: "Id (número de rango)", type: "string", default: "1", placeholder: "1" },
  { key: "required-level", label: "Nivel requerido", type: "number", default: "100" },
  { key: "exp-bonus-percent", label: "Bono de XP (%)", type: "number", default: "5" },
  { key: "skills", label: "Skills otorgadas", type: "list", placeholder: "prestige_aura_1" },
];

const affinityFields: YamlField[] = [
  { key: "id", label: "Id", type: "string", default: "nueva_afinidad", placeholder: "fuego" },
  { key: "display-name", label: "Nombre visible", type: "string", placeholder: "&6Fuego" },
  { key: "opposing", label: "Afinidad opuesta", type: "string", placeholder: "agua" },
  { key: "resist-causes", label: "Causas de daño resistidas", type: "list", placeholder: "FIRE, FIRE_TICK, LAVA" },
];

const legacyFields: YamlField[] = [
  { key: "id", label: "Id (número de tier)", type: "string", default: "1", placeholder: "1" },
  { key: "required-prestige", label: "Prestigio requerido", type: "number", default: "3" },
  { key: "permanent-exp-bonus-percent", label: "Bono de XP permanente (%)", type: "number", default: "5" },
  { key: "bonus-stat-points", label: "Puntos de stat de regalo", type: "number", default: "5" },
];

const achievementFields: YamlField[] = [
  { key: "id", label: "Id", type: "string", default: "nuevo_logro", placeholder: "maestro_espadachin" },
  { key: "display-name", label: "Nombre visible", type: "string", placeholder: "&fMaestro Espadachín" },
  {
    key: "description",
    label: "Descripción",
    type: "string",
    placeholder: "+3% daño con espadas (informativo)",
  },
];

const titleFields: YamlField[] = [
  { key: "id", label: "Id", type: "string", default: "nuevo_titulo", placeholder: "el_elegido" },
  { key: "display-name", label: "Nombre visible", type: "string", placeholder: "&6El Elegido" },
];

const factionFields: YamlField[] = [
  { key: "id", label: "Id", type: "string", default: "nueva_faccion", placeholder: "kingdom" },
  { key: "display-name", label: "Nombre visible", type: "string", placeholder: "&6Reino" },
];

const jobEvolutionFields: YamlField[] = [
  { key: "id", label: "Id", type: "string", default: "nueva_evolucion_job", placeholder: "master_miner" },
  { key: "base-job", label: "Job base", type: "string", placeholder: "minero" },
  { key: "display-name", label: "Nombre visible", type: "string", placeholder: "&7Master Miner" },
  { key: "required-job-level", label: "Nivel de job requerido", type: "number", default: "25" },
  { key: "unlocked-recipes", label: "Recetas desbloqueadas", type: "list", placeholder: "reinforced_pickaxe" },
  { key: "unlocked-tools", label: "Herramientas desbloqueadas", type: "list", placeholder: "efficiency_drill" },
  { key: "unlocked-quests", label: "Misiones desbloqueadas", type: "list" },
];

const secretUnlockFields: YamlField[] = [
  { key: "id", label: "Id", type: "string", default: "nuevo_secreto", placeholder: "dragon_blood_unlock" },
  { key: "target-type", label: "Tipo de objetivo", type: "select", options: ["RACE", "CLASS", "TRAIT"] },
  { key: "target-id", label: "Id real en :core", type: "string", placeholder: "dragon_blood" },
  requirementsGroup,
];

export function Ascension({ onNavigate }: { onNavigate: (slug: string) => void }) {
  return (
    <>
      <PageHeader title="Ascension (RPGRoll-Ascension)">
        Expansión de progresión avanzada por encima del sistema base de razas/clases/niveles: evolución de raza,
        especialización de clase con árbol de talentos, prestigio, afinidades elementales, y una serie de
        sistemas de datos (logros, títulos, facciones, legado) para que otros addons construyan mecánicas encima.
      </PageHeader>

      <Callout tone="info" title="4 pilares con mecánica real + 6 sistemas de datos">
        Race Evolution, Class Specialization (+talentos), Prestigio y Afinidades tienen efecto real en el
        jugador. Job Evolutions, Secretos, Facciones, Logros y Títulos son deliberadamente capas de{" "}
        <em>datos y consulta</em> — la mecánica automática que los aplique queda para otro addon (o para vos).
        Legado es la excepción: vive junto a los sistemas de datos pero sí tiene un reset real.
      </Callout>

      <SectionHeading id="requisitos">Requisitos</SectionHeading>
      <CodeBlock language="yaml" code={"depend: [RPGRoll]\nsoftdepend: [RPGRoll-Enchantments, RPGRoll-Quests, PlaceholderAPI]"} />
      <p>Sin ninguno de los dos, Ascension funciona igual: un talento que otorgaría un encantamiento simplemente no lo aplica, y un requisito de "quest completada" nunca bloquea.</p>

      <SectionHeading id="race-evolution">Evolución de raza</SectionHeading>
      <p>
        Una <code>RaceEvolution</code> es una variante de la raza base del jugador (ej. Elfo → Alto Elfo): conserva
        su raza real, pero suma bonos de stats, afinidades, resistencias/debilidades, traits, skills y
        profesiones desbloqueadas exclusivas.
      </p>
      <CodeBlock
        language="yaml"
        filename="evolutions/alto_elfo.yml"
        code={
          "id: alto_elfo\n" +
          "base-race: elfo\n" +
          'display-name: "&bAlto Elfo"\n' +
          "\n" +
          "requirements:\n" +
          "  level: 40\n" +
          "\n" +
          "stats:\n" +
          "  intelligence: 8\n" +
          "  magic_power: 10\n" +
          "\n" +
          "affinities:\n" +
          "  light: 20\n" +
          "\n" +
          "resistances:\n" +
          "  magic: 15\n" +
          "\n" +
          "traits:\n" +
          "  - arcane_affinity\n" +
          "\n" +
          "skills:\n" +
          "  - arcane_bolt\n" +
          "\n" +
          "professions:\n" +
          "  - alquimista\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="evolutions/enano_ancestral.yml"
        code={
          "id: enano_ancestral\n" +
          "base-race: enano\n" +
          'display-name: "&6Enano Ancestral"\n' +
          "\n" +
          "requirements:\n" +
          "  level: 40\n" +
          "\n" +
          "stats:\n" +
          "  strength: 8\n" +
          "  constitution: 10\n" +
          "\n" +
          "affinities:\n" +
          "  earth: 20\n" +
          "\n" +
          "resistances:\n" +
          "  physical: 15\n" +
          "\n" +
          "traits:\n" +
          "  - stoneskin\n" +
          "\n" +
          "skills:\n" +
          "  - earthquake_slam\n" +
          "\n" +
          "professions:\n" +
          "  - minero\n"
        }
      />
      <p><Kbd>{"/ascend race <id>"}</Kbd> falla si la evolución no corresponde a tu raza base, o si no cumplís sus <code>requirements</code>.</p>

      <YamlBuilder
        title="Constructor visual: Race Evolution"
        description="Armá el YAML de una evolución de raza y descargalo en evolutions/<id>.yml. El árbol de talentos no aplica acá — es de Class Specialization."
        folder="evolutions"
        fields={raceEvolutionFields}
      />

      <SectionHeading id="specialization">Especialización de clase y árbol de talentos</SectionHeading>
      <p>
        Una <code>ClassSpecialization</code> (ej. Guerrero → Berserker) trae su propio bono de stats y un árbol de
        talentos propio. <code>restrictions</code> y <code>exclusive-equipment</code> son{" "}
        <strong>solo informativos</strong> — otro addon (como RPGRoll-Items) puede leerlos para hacerlos cumplir,
        pero Ascension no los aplica por sí sola.
      </p>
      <CodeBlock
        language="yaml"
        filename="specializations/berserker.yml"
        code={
          "id: berserker\n" +
          "base-class: guerrero\n" +
          'display-name: "&4Berserker"\n' +
          "\n" +
          "requirements:\n" +
          "  level: 20\n" +
          "\n" +
          "stats:\n" +
          "  damage: 4\n" +
          "\n" +
          "restrictions:\n" +
          '  - "no-shield"\n' +
          "\n" +
          "talents:\n" +
          "  inicio:\n" +
          '    display-name: "&7Inicio"\n' +
          "    cost: 1\n" +
          "    stats: { health: 5 }\n" +
          "\n" +
          "  ataque:\n" +
          '    display-name: "&cFuria de Batalla"\n' +
          "    cost: 2\n" +
          "    requires: [inicio]\n" +
          "    stats: { damage: 3 }\n" +
          "\n" +
          "  ataque_2:\n" +
          '    display-name: "&cGolpe Devastador"\n' +
          "    cost: 3\n" +
          "    requires: [ataque]\n" +
          "    skill: devastating_blow\n" +
          "\n" +
          "  defensa:\n" +
          '    display-name: "&7Piel de Hierro"\n' +
          "    cost: 2\n" +
          "    requires: [inicio]\n" +
          "    stats: { defense: 4 }\n" +
          "\n" +
          "  defensa_2:\n" +
          '    display-name: "&7Furia Inquebrantable"\n' +
          "    cost: 3\n" +
          "    requires: [defensa]\n" +
          "    trait: unbreakable_will\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="specializations/archmage.yml"
        code={
          "id: archmage\n" +
          "base-class: mago\n" +
          'display-name: "&9Archimago"\n' +
          "\n" +
          "requirements:\n" +
          "  level: 20\n" +
          "\n" +
          "stats:\n" +
          "  magic_power: 5\n" +
          "\n" +
          "restrictions:\n" +
          '  - "no-heavy-armor"\n' +
          "\n" +
          "talents:\n" +
          "  inicio:\n" +
          '    display-name: "&7Inicio"\n' +
          "    cost: 1\n" +
          "    stats:\n" +
          "      mana: 10\n" +
          "\n" +
          "  arcano:\n" +
          '    display-name: "&9Dominio Arcano"\n' +
          "    cost: 2\n" +
          "    requires: [inicio]\n" +
          "    stats:\n" +
          "      magic_power: 4\n" +
          "\n" +
          "  arcano_2:\n" +
          '    display-name: "&9Sobrecarga Arcana"\n' +
          "    cost: 3\n" +
          "    requires: [arcano]\n" +
          "    skill: arcane_overload\n" +
          "\n" +
          "  proteccion:\n" +
          '    display-name: "&7Escudo de Maná"\n' +
          "    cost: 2\n" +
          "    requires: [inicio]\n" +
          "    stats:\n" +
          "      magic_resistance: 4\n" +
          "\n" +
          "  proteccion_2:\n" +
          '    display-name: "&7Barrera Inquebrantable"\n' +
          "    cost: 3\n" +
          "    requires: [proteccion]\n" +
          "    trait: mana_barrier\n"
        }
      />
      <p>
        Cada nodo (<code>TalentNode</code>) tiene un <code>cost</code> en puntos de talento, requisitos de nodos
        previos (<code>requires</code>), un bono de stats aditivo, y opcionalmente otorga una skill, un trait o un
        encantamiento (uno solo, en general) al desbloquearse. <Kbd>{"/ascend talent <id>"}</Kbd> valida en este
        orden: tenés especialización activa → el nodo existe → no lo desbloqueaste ya → tenés todos sus
        prerrequisitos → tenés puntos suficientes.
      </p>
      <Callout tone="warning" title="Cambiar de especialización borra el árbol de talentos">
        <code>{"/ascend specialize <id>"}</code> limpia por completo los talentos ya desbloqueados — no hay forma
        de conservarlos al cambiar de rama.
      </Callout>

      <Callout tone="tip" title="Referencia completa: todos los campos en un solo archivo">
        <code>specializations/reference_full.yml</code> (incluido en el jar) agrega los campos que los dos ejemplos
        de arriba no muestran: <code>requirements.prestige</code>, <code>requirements.completed-quests</code>,{" "}
        <code>requirements.reputation</code>, <code>exclusive-equipment</code>, y un nodo con dos prerrequisitos y
        recompensa de encantamiento.
      </Callout>

      <YamlBuilder
        title="Constructor visual: Class Specialization"
        description="Arma la identidad, requisitos, bono de stats, restricciones y equipo exclusivo. El árbol de talentos (talents:) es demasiado anidado para este formulario — copialo de un ejemplo de arriba y editalo a mano."
        folder="specializations"
        fields={classSpecializationFields}
      />

      <SectionHeading id="prestige">Prestigio</SectionHeading>
      <p>
        Al alcanzar el nivel requerido, <Kbd>/ascend prestige</Kbd> resetea tu nivel a 1 (conservando evolución,
        especialización y talentos) a cambio de un bono de experiencia acumulativo entre rangos, más las skills
        que ese rango otorgue.
      </p>
      <CodeBlock
        language="yaml"
        filename="prestige/1.yml + prestige/2.yml"
        code={
          'id: "1"\n' +
          "required-level: 100\n" +
          "exp-bonus-percent: 5\n" +
          "skills: [prestige_aura_1]\n" +
          "\n" +
          '# --- 2.yml ---\n' +
          'id: "2"\n' +
          "required-level: 100\n" +
          "exp-bonus-percent: 10\n" +
          "skills: [prestige_aura_2]\n"
        }
      />

      <YamlBuilder
        title="Constructor visual: Prestige Level"
        description="El id es el número de rango como texto (ej. '1', '2')."
        folder="prestige"
        fields={prestigeFields}
      />

      <SectionHeading id="affinities">Afinidades elementales</SectionHeading>
      <p>
        La única mecánica automática real de este sistema: cada afinidad mapea a una lista de{" "}
        <code>DamageCause</code> de Bukkit, y el nivel de afinidad del jugador (experiencia ÷ 100, tope nivel 100)
        reduce ese daño hasta un <strong>20% como máximo</strong>. El resto de bonos (a hechizos, ítems,
        encantamientos) quedan expuestos por API para que otro addon los consulte.
      </p>
      <CodeBlock
        language="yaml"
        filename="affinities/fuego.yml"
        code={
          "id: fuego\n" +
          'display-name: "&6Fuego"\n' +
          "opposing: agua\n" +
          "resist-causes:\n" +
          "  - FIRE\n" +
          "  - FIRE_TICK\n" +
          "  - LAVA\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="affinities/agua.yml"
        code={"id: agua\n" + 'display-name: "&9Agua"\n' + "opposing: fuego\n" + "resist-causes:\n" + "  - DROWNING\n"}
      />
      <p>Hay 8 afinidades de ejemplo: fuego, agua, hielo, electricidad, luz, oscuridad, naturaleza, veneno — cada una opcionalmente con una <code>opposing</code> (afinidad contraria, sin efecto mecánico propio, solo referencia).</p>

      <YamlBuilder
        title="Constructor visual: Affinity"
        folder="affinities"
        fields={affinityFields}
      />

      <SectionHeading id="legacy">Legado: el reset definitivo</SectionHeading>
      <p>
        Al llegar al prestigio mínimo de un <code>LegacyTier</code>, <Kbd>/ascend legacy</Kbd> hace un reset total:
        nivel, prestigio, evolución de raza, especialización y todos los talentos vuelven a cero — a cambio de un
        bono de experiencia <strong>permanente y acumulativo entre legados</strong> más puntos de stat de regalo.
      </p>
      <CodeBlock
        language="yaml"
        filename="legacy/1.yml"
        code={
          'id: "1"\n' +
          "required-prestige: 3\n" +
          "permanent-exp-bonus-percent: 5\n" +
          "bonus-stat-points: 5\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="legacy/2.yml"
        code={
          'id: "2"\n' +
          "required-prestige: 6\n" +
          "permanent-exp-bonus-percent: 10\n" +
          "bonus-stat-points: 10\n"
        }
      />

      <YamlBuilder
        title="Constructor visual: Legacy Tier"
        description="El id es el número de tier como texto (ej. '1', '2')."
        folder="legacy"
        fields={legacyFields}
      />

      <SectionHeading id="datos">Sistemas de datos: logros, títulos, facciones, job evolutions, secretos</SectionHeading>
      <p>Estos cinco quedan deliberadamente sin mecánica automática — son consulta + otorgar/activar manual, para que se construya encima:</p>
      <Table>
        <Thead>
          <Th>Sistema</Th>
          <Th>Representa</Th>
          <Th>Cómo se otorga/activa</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">Achievements</Td><Td>Logro a nivel de personaje, con una descripción del bono que <em>debería</em> dar (aplicarlo queda pendiente).</Td><Td><Kbd>{"/ascendadmin achievement grant <j> <id>"}</Kbd></Td></Tr>
          <Tr><Td className="font-mono text-xs">Titles</Td><Td>Título cosmético.</Td><Td>Otorgado por admin, activado por el jugador con <Kbd>{"/ascend title <id|clear>"}</Kbd></Td></Tr>
          <Tr><Td className="font-mono text-xs">Factions</Td><Td>Facción/reino con la que acumulás reputación.</Td><Td><Kbd>{"/ascendadmin reputation add <j> <facción> <cant>"}</Kbd> (no valida que la facción exista)</Td></Tr>
          <Tr><Td className="font-mono text-xs">Job Evolutions</Td><Td>Rango evolutivo de un trabajo (ej. Minero → Master Miner) que desbloquea recetas/herramientas/quests.</Td><Td>Solo consulta vía API — sin comando ni mecánica que lo active.</Td></Tr>
          <Tr><Td className="font-mono text-xs">Secret Unlocks</Td><Td>Requisitos para desbloquear una raza/clase/trait "secreta" que ya vive en el core.</Td><Td>Solo consulta vía <code>find(tipo, id)</code> — nada en el código actual lo dispara.</Td></Tr>
        </tbody>
      </Table>
      <Callout tone="tip">
        <code>factions/reino.yml</code> es un buen recordatorio de que el <strong>id interno</strong> manda sobre
        el nombre de archivo: el archivo se llama <code>reino.yml</code> pero su campo <code>id</code> es{" "}
        <code>kingdom</code> — el sistema indexa por ese campo, no por el nombre del YAML.
      </Callout>

      <SectionHeading id="achievements" level={3}>Achievement</SectionHeading>
      <CodeBlock
        language="yaml"
        filename="achievements/maestro_espadachin.yml"
        code={
          "id: maestro_espadachin\n" +
          'display-name: "&fMaestro Espadachín"\n' +
          'description: "+3% daño con espadas (bono informativo — la mecánica queda para otro addon la aplique)"\n'
        }
      />
      <CodeBlock
        language="yaml"
        filename="achievements/explorador_incansable.yml"
        code={
          "id: explorador_incansable\n" +
          'display-name: "&aExplorador Incansable"\n' +
          'description: "+5% velocidad de descubrimiento (bono informativo — la mecánica queda para otro addon la aplique)"\n'
        }
      />
      <YamlBuilder title="Constructor visual: Achievement" folder="achievements" fields={achievementFields} />

      <SectionHeading id="titles-format" level={3}>Title</SectionHeading>
      <CodeBlock
        language="yaml"
        filename="titles/el_elegido.yml"
        code={"id: el_elegido\n" + 'display-name: "&6El Elegido"\n'}
      />
      <CodeBlock
        language="yaml"
        filename="titles/portador_de_leyenda.yml"
        code={"id: portador_de_leyenda\n" + 'display-name: "&ePortador de Leyenda"\n'}
      />
      <YamlBuilder title="Constructor visual: Title" folder="titles" fields={titleFields} />

      <SectionHeading id="factions-format" level={3}>Faction</SectionHeading>
      <CodeBlock
        language="yaml"
        filename="factions/reino.yml"
        code={"id: kingdom\n" + 'display-name: "&6Reino"\n'}
      />
      <CodeBlock
        language="yaml"
        filename="factions/orden_arcana.yml"
        code={"id: orden_arcana\n" + 'display-name: "&5Orden Arcana"\n'}
      />
      <YamlBuilder title="Constructor visual: Faction" folder="factions" fields={factionFields} />

      <SectionHeading id="job-evolutions-format" level={3}>Job Evolution</SectionHeading>
      <CodeBlock
        language="yaml"
        filename="job-evolutions/master_miner.yml"
        code={
          "id: master_miner\n" +
          "base-job: minero\n" +
          'display-name: "&7Master Miner"\n' +
          "required-job-level: 25\n" +
          "unlocked-recipes:\n" +
          "  - reinforced_pickaxe\n" +
          "unlocked-tools:\n" +
          "  - efficiency_drill\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="job-evolutions/master_alchemist.yml"
        code={
          "id: master_alchemist\n" +
          "base-job: alquimista\n" +
          'display-name: "&dMaster Alchemist"\n' +
          "required-job-level: 25\n" +
          "unlocked-recipes:\n" +
          "  - greater_healing_potion\n" +
          "unlocked-tools:\n" +
          "  - alchemist_cauldron\n"
        }
      />
      <YamlBuilder title="Constructor visual: Job Evolution" folder="job-evolutions" fields={jobEvolutionFields} />

      <SectionHeading id="secrets-format" level={3}>Secret Unlock Requirement</SectionHeading>
      <CodeBlock
        language="yaml"
        filename="secrets/dragon_blood.yml"
        code={
          "id: dragon_blood_unlock\n" +
          "target-type: TRAIT\n" +
          "target-id: dragon_blood\n" +
          "\n" +
          "requirements:\n" +
          "  level: 80\n" +
          "  completed-quests:\n" +
          "    - dragon_hunt\n"
        }
      />
      <CodeBlock
        language="yaml"
        filename="secrets/phoenix_rebirth.yml"
        code={
          "id: phoenix_rebirth_unlock\n" +
          "target-type: CLASS\n" +
          "target-id: archmage\n" +
          "\n" +
          "requirements:\n" +
          "  level: 60\n" +
          "  completed-quests:\n" +
          "    - trial_of_ashes\n"
        }
      />
      <YamlBuilder title="Constructor visual: Secret Unlock Requirement" folder="secrets" fields={secretUnlockFields} />

      <SectionHeading id="integraciones">Integraciones</SectionHeading>
      <ul>
        <li><strong>RPGRoll-Enchantments</strong> — si un talento tiene <code>enchantment: &lt;id&gt;</code>, al desbloquearlo se aplica ese encantamiento al ítem en tu mano principal (si el addon está instalado; si no, no pasa nada).</li>
        <li><strong>RPGRoll-Quests</strong> — un requisito <code>completed-quests</code> en evoluciones/especializaciones/secretos se valida contra el estado real de misiones del jugador, si el addon está presente. Sin él, ese requisito nunca bloquea.</li>
      </ul>

      <SectionHeading id="gui">GUI: navegador y editor para los 10 tipos de contenido</SectionHeading>
      <p>
        <Kbd>{"/ascendadmin browser <tipo>"}</Kbd> abre un navegador gráfico con botón "Crear nuevo" para cada uno
        de los 10 tipos de esta página — <code>evolution</code>, <code>specialization</code>, <code>prestige</code>,{" "}
        <code>affinity</code>, <code>jobevolution</code>, <code>secret</code>, <code>faction</code>,{" "}
        <code>achievement</code>, <code>title</code>, <code>legacy</code> (por defecto, sin argumento, abre{" "}
        <code>evolution</code>). Click sobre un ítem abre su editor: campos simples se editan con click derecho/
        izquierdo o un prompt de chat; los mapas (stats, afinidades, resistencias, debilidades, reputación) usan
        una sintaxis compacta <code>clave=valor,clave2=valor2</code> por chat.
      </p>
      <Callout tone="warning" title="El árbol de talentos no tiene grilla visual">
        <code>ClassSpecialization</code> edita sus talentos con una línea de chat compacta (
        <code>{"id;nombre;costo;requiere1,requiere2;stat=val;skill;trait;encantamiento"}</code>) en vez de un editor
        de árbol — igual que el constructor web de esta página, que directamente no lo expone y te manda a copiar un
        ejemplo YAML a mano para esa parte.
      </Callout>

      <SectionHeading id="comandos-jugador">Comandos de jugador — /ascend</SectionHeading>
      <Table>
        <Thead>
          <Th>Comando</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">{"/ascend race <id>"}</Td><Td>Evoluciona tu raza si cumplís los requisitos.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/ascend specialize <id>"}</Td><Td>Elegí una especialización de tu clase (borra talentos previos).</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/ascend talent <id>"}</Td><Td>Desbloquea un nodo del árbol de talentos de tu especialización.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/ascend prestige</Td><Td>Reinicia tu nivel a cambio de bono de exp acumulativo.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/ascend affinity</Td><Td>Lista tu experiencia y nivel en cada afinidad.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/ascend reputation</Td><Td>Lista tu reputación con cada facción.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/ascend title <id|clear>"}</Td><Td>Activa un título ya desbloqueado, o lo quita.</Td></Tr>
          <Tr><Td className="font-mono text-xs">/ascend legacy</Td><Td>Reset total a cambio de bono permanente (si alcanzás el prestigio mínimo).</Td></Tr>
          <Tr><Td className="font-mono text-xs">/ascend info</Td><Td>Resumen de tu evolución, especialización, talentos, prestigio, legado y bono de exp total.</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="comandos-admin">Comandos de administrador — /ascendadmin</SectionHeading>
      <Table>
        <Thead>
          <Th>Comando</Th>
          <Th>Qué hace</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">{"/ascendadmin achievement grant <j> <id>"}</Td><Td>Otorga un logro.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/ascendadmin title grant <j> <id>"}</Td><Td>Otorga un título.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/ascendadmin reputation add <j> <facción> <cant>"}</Td><Td>Suma reputación (acepta cualquier id de facción).</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"/ascendadmin browser [tipo]"}</Td><Td>Abre el navegador gráfico de uno de los 10 tipos de contenido (ver sección GUI arriba).</Td></Tr>
          <Tr><Td className="font-mono text-xs">/ascendadmin reload</Td><Td>Recarga los 10 tipos de contenido: evoluciones, especializaciones, prestigio, legado, logros, títulos, afinidades, job evolutions, secretos y facciones.</Td></Tr>
        </tbody>
      </Table>
      <p>Ambos comandos administrativos requieren <Badge tone="amber">rpgrollascension.admin.*</Badge> (default: op).</p>

      <SectionHeading id="placeholders">Placeholders (PlaceholderAPI)</SectionHeading>
      <p>Expansión <Badge tone="violet">rpgrollascension</Badge>.</p>
      <Table>
        <Thead>
          <Th>Placeholder</Th>
          <Th>Valor</Th>
        </Thead>
        <tbody>
          <Tr><Td className="font-mono text-xs">%rpgrollascension_evolution% / _specialization</Td><Td>Id actual, o <code>-</code> si no eligió ninguna.</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgrollascension_prestige% / _legacy</Td><Td>Rangos de prestigio/legado alcanzados.</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgrollascension_exp_bonus%</Td><Td>% de bono de experiencia total (prestigio + legado).</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgrollascension_talent_points%</Td><Td>Puntos de talento sin gastar.</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"%rpgrollascension_affinity_<id>_level%"}</Td><Td>Nivel de esa afinidad (0-100).</Td></Tr>
          <Tr><Td className="font-mono text-xs">{"%rpgrollascension_reputation_<facción>%"}</Td><Td>Reputación acumulada con esa facción.</Td></Tr>
          <Tr><Td className="font-mono text-xs">%rpgrollascension_title%</Td><Td>Título activo, o <code>-</code>.</Td></Tr>
        </tbody>
      </Table>

      <PrevNext current="ascension" onNavigate={onNavigate} />
    </>
  );
}
