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
import { useI18n, fill } from "../i18n";
import { ASCENSION_COPY, type AscensionCopy } from "./copy/ascension";

const mono = "font-mono text-xs";

const requirementsGroup = (c: AscensionCopy): YamlField => ({
  key: "requirements",
  label: c.fRequirements,
  type: "group",
  fields: [
    { key: "level", label: c.fMinLevel, type: "number", default: "0" },
    { key: "prestige", label: c.fMinPrestige, type: "number", default: "0" },
    { key: "trait", label: c.fTrait, type: "string", placeholder: "arcane_affinity" },
    {
      key: "completed-quests",
      label: c.fQuests,
      type: "list",
      placeholder: "trial_of_ashes, dragon_hunt",
      help: c.fQuestsHelp,
    },
    {
      key: "reputation",
      label: c.fReputation,
      type: "map",
      placeholder: "reino=50, orden_arcana=20",
      help: c.fReputationHelp,
    },
  ],
});

const raceEvolutionFields = (c: AscensionCopy): YamlField[] => [
  { key: "id", label: c.fId, type: "string", default: c.phNewEvolution, placeholder: "alto_elfo" },
  { key: "base-race", label: c.fBaseRace, type: "string", placeholder: "elfo" },
  { key: "display-name", label: c.fDisplayName, type: "string", placeholder: "&bAlto Elfo" },
  requirementsGroup(c),
  { key: "stats", label: c.fStats, type: "map", placeholder: "intelligence=8, magic_power=10" },
  { key: "affinities", label: c.fAffinities, type: "map", placeholder: "light=20" },
  { key: "resistances", label: c.fResistances, type: "map", placeholder: "magic=15" },
  { key: "weaknesses", label: c.fWeaknesses, type: "map", placeholder: "fire=10" },
  { key: "traits", label: c.fTraits, type: "list", placeholder: "arcane_affinity" },
  { key: "skills", label: c.fSkills, type: "list", placeholder: "arcane_bolt" },
  { key: "professions", label: c.fProfessions, type: "list", placeholder: "alquimista" },
];

const classSpecializationFields = (c: AscensionCopy): YamlField[] => [
  { key: "id", label: c.fId, type: "string", default: c.phNewSpec, placeholder: "berserker" },
  { key: "base-class", label: c.fBaseClass, type: "string", placeholder: "guerrero" },
  { key: "display-name", label: c.fDisplayName, type: "string", placeholder: "&4Berserker" },
  requirementsGroup(c),
  { key: "stats", label: c.fStats, type: "map", placeholder: "damage=4" },
  { key: "restrictions", label: c.fRestrictions, type: "list", placeholder: "no-shield" },
  { key: "exclusive-equipment", label: c.fExclusiveEq, type: "list", placeholder: "berserker_axe" },
];

const prestigeFields = (c: AscensionCopy): YamlField[] => [
  { key: "id", label: c.fIdRank, type: "string", default: "1", placeholder: "1" },
  { key: "required-level", label: c.fReqLevel, type: "number", default: "100" },
  { key: "exp-bonus-percent", label: c.fExpBonus, type: "number", default: "5" },
  { key: "skills", label: c.fSkills, type: "list", placeholder: "prestige_aura_1" },
];

const affinityFields = (c: AscensionCopy): YamlField[] => [
  { key: "id", label: c.fId, type: "string", default: c.phNewAffinity, placeholder: "fuego" },
  { key: "display-name", label: c.fDisplayName, type: "string", placeholder: "&6Fuego" },
  { key: "opposing", label: c.fOpposing, type: "string", placeholder: "agua" },
  { key: "resist-causes", label: c.fResistCauses, type: "list", placeholder: "FIRE, FIRE_TICK, LAVA" },
];

const legacyFields = (c: AscensionCopy): YamlField[] => [
  { key: "id", label: c.fIdTier, type: "string", default: "1", placeholder: "1" },
  { key: "required-prestige", label: c.fReqPrestige, type: "number", default: "3" },
  { key: "permanent-exp-bonus-percent", label: c.fPermExpBonus, type: "number", default: "5" },
  { key: "bonus-stat-points", label: c.fBonusPoints, type: "number", default: "5" },
];

const achievementFields = (c: AscensionCopy): YamlField[] => [
  { key: "id", label: c.fId, type: "string", default: c.phNewAch, placeholder: "maestro_espadachin" },
  { key: "display-name", label: c.fDisplayName, type: "string", placeholder: "&fMaestro Espadachín" },
  {
    key: "description",
    label: c.fDescription,
    type: "string",
    placeholder: c.phAchDesc,
  },
];

const titleFields = (c: AscensionCopy): YamlField[] => [
  { key: "id", label: c.fId, type: "string", default: c.phNewTitle, placeholder: "el_elegido" },
  { key: "display-name", label: c.fDisplayName, type: "string", placeholder: "&6El Elegido" },
];

const factionFields = (c: AscensionCopy): YamlField[] => [
  { key: "id", label: c.fId, type: "string", default: c.phNewFaction, placeholder: "kingdom" },
  { key: "display-name", label: c.fDisplayName, type: "string", placeholder: "&6Reino" },
];

const jobEvolutionFields = (c: AscensionCopy): YamlField[] => [
  { key: "id", label: c.fId, type: "string", default: c.phNewJobEvo, placeholder: "master_miner" },
  { key: "base-job", label: c.fBaseJob, type: "string", placeholder: "minero" },
  { key: "display-name", label: c.fDisplayName, type: "string", placeholder: "&7Master Miner" },
  { key: "required-job-level", label: c.fReqJobLevel, type: "number", default: "25" },
  { key: "unlocked-recipes", label: c.fRecipes, type: "list", placeholder: "reinforced_pickaxe" },
  { key: "unlocked-tools", label: c.fTools, type: "list", placeholder: "efficiency_drill" },
  { key: "unlocked-quests", label: c.fUnlockedQuests, type: "list" },
];

const secretUnlockFields = (c: AscensionCopy): YamlField[] => [
  { key: "id", label: c.fId, type: "string", default: c.phNewSecret, placeholder: "dragon_blood_unlock" },
  { key: "target-type", label: c.fTargetType, type: "select", options: ["RACE", "CLASS", "TRAIT"] },
  { key: "target-id", label: c.fTargetId, type: "string", placeholder: "dragon_blood" },
  requirementsGroup(c),
];

export function Ascension({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = ASCENSION_COPY[locale];

  return (
    <>
      <PageHeader title={c.title}>{c.intro}</PageHeader>

      <Callout tone="info" title={c.pillarsTitle}>
        {fill(c.pillarsBody, { data: <em>{c.dataWord}</em> })}
      </Callout>

      <SectionHeading id="requisitos">{c.reqTitle}</SectionHeading>
      <CodeBlock language="yaml" code={"depend: [RPGRoll-Lib, RPGRoll]\nsoftdepend: [RPGRoll-Enchantments, RPGRoll-Quests, RPGRoll-Mobs, RPGRoll-Items, Vault, PlaceholderAPI]"} />
      <p>{c.reqBody}</p>

      <SectionHeading id="race-evolution">{c.raceTitle}</SectionHeading>
      <p>{fill(c.raceBody, { cls: <code>RaceEvolution</code> })}</p>
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
      <p>
        {fill(c.raceCmdBody, {
          cmd: <Kbd>{"/ascend race <id>"}</Kbd>,
          req: <code>requirements</code>,
        })}
      </p>

      <YamlBuilder
        title={c.builderRace}
        description={c.builderRaceDesc}
        folder="evolutions"
        fields={raceEvolutionFields(c)}
      />

      <SectionHeading id="specialization">{c.specTitle}</SectionHeading>
      <p>
        {fill(c.specBody, {
          cls: <code>ClassSpecialization</code>,
          restrictions: <code>restrictions</code>,
          equipment: <code>exclusive-equipment</code>,
          infoOnly: <strong>{c.infoOnly}</strong>,
        })}
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
        {fill(c.nodeBody, {
          node: <code>TalentNode</code>,
          cost: <code>cost</code>,
          requires: <code>requires</code>,
          cmd: <Kbd>{"/ascend talent <id>"}</Kbd>,
        })}
      </p>
      <Callout tone="warning" title={c.specWarnTitle}>
        {fill(c.specWarnBody, { cmd: <code>{"/ascend specialize <id>"}</code> })}
      </Callout>

      <Callout tone="tip" title={c.specRefTitle}>
        {fill(c.specRefBody, {
          file: <code>specializations/reference_full.yml</code>,
          fields: (
            <>
              <code>requirements.prestige</code>, <code>requirements.completed-quests</code>,{" "}
              <code>requirements.reputation</code>, <code>exclusive-equipment</code>
            </>
          ),
        })}
      </Callout>

      <YamlBuilder
        title={c.builderSpec}
        description={c.builderSpecDesc}
        folder="specializations"
        fields={classSpecializationFields(c)}
      />

      <SectionHeading id="prestige">{c.prestigeTitle}</SectionHeading>
      <p>{fill(c.prestigeBody, { cmd: <Kbd>/ascend prestige</Kbd> })}</p>
      <p>
        {fill(c.prestigeBonusBody, {
          service: <code>ExperienceBonusService</code>,
          perm: <code>rpgroll.exp.bonus.&lt;n&gt;</code>,
          link: (
            <a href="/progresion" className="underline">
              {c.progressionLink}
            </a>
          ),
        })}
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
        title={c.builderPrestige}
        description={c.builderPrestigeDesc}
        folder="prestige"
        fields={prestigeFields(c)}
      />

      <SectionHeading id="affinities">{c.affTitle}</SectionHeading>
      <p>
        {fill(c.affBody, { cause: <code>DamageCause</code>, max: <strong>{c.affMax}</strong> })}
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
      <p>{fill(c.affListBody, { opposing: <code>opposing</code> })}</p>

      <YamlBuilder
        title={c.builderAff}
        folder="affinities"
        fields={affinityFields(c)}
      />

      <SectionHeading id="legacy">{c.legacyTitle}</SectionHeading>
      <p>
        {fill(c.legacyBody, {
          tier: <code>LegacyTier</code>,
          cmd: <Kbd>/ascend legacy</Kbd>,
          perm: <strong>{c.legacyPerm}</strong>,
        })}
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
        title={c.builderLegacy}
        description={c.builderLegacyDesc}
        folder="legacy"
        fields={legacyFields(c)}
      />

      <SectionHeading id="datos">{c.dataTitle}</SectionHeading>
      <p>{c.dataBody}</p>
      <Table>
        <Thead>
          <Th>{c.thSystem}</Th>
          <Th>{c.thRepresents}</Th>
          <Th>{c.thHowGranted}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className={mono}>Achievements</Td>
            <Td>{c.dAchievements}</Td>
            <Td><Kbd>{"/ascendadmin achievement grant <j> <id>"}</Kbd></Td>
          </Tr>
          <Tr>
            <Td className={mono}>Titles</Td>
            <Td>{c.dTitles}</Td>
            <Td>{fill(c.dTitlesHow, { cmd: <Kbd>{"/ascend title <id|clear>"}</Kbd> })}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>Factions</Td>
            <Td>{c.dFactions}</Td>
            <Td>
              {fill(c.dFactionsHow, {
                cmd: <Kbd>{"/ascendadmin reputation add <j> <facción> <cant>"}</Kbd>,
              })}
            </Td>
          </Tr>
          <Tr>
            <Td className={mono}>Job Evolutions</Td>
            <Td>{c.dJobs}</Td>
            <Td>{c.dJobsHow}</Td>
          </Tr>
          <Tr>
            <Td className={mono}>Secret Unlocks</Td>
            <Td>{c.dSecrets}</Td>
            <Td>{fill(c.dSecretsHow, { find: <code>find(tipo, id)</code> })}</Td>
          </Tr>
        </tbody>
      </Table>
      <Callout tone="tip">
        {fill(c.idTipBody, {
          file: <code>factions/reino.yml</code>,
          internalId: <strong>{c.internalId}</strong>,
          name: <code>reino.yml</code>,
          id: <code>id</code>,
          value: <code>kingdom</code>,
        })}
      </Callout>

      <SectionHeading id="achievements" level={3}>{c.achTitle}</SectionHeading>
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
      <YamlBuilder title={c.builderAch} folder="achievements" fields={achievementFields(c)} />

      <SectionHeading id="titles-format" level={3}>{c.titleTitle}</SectionHeading>
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
      <YamlBuilder title={c.builderTitle} folder="titles" fields={titleFields(c)} />

      <SectionHeading id="factions-format" level={3}>{c.facTitle}</SectionHeading>
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
      <YamlBuilder title={c.builderFac} folder="factions" fields={factionFields(c)} />

      <SectionHeading id="job-evolutions-format" level={3}>{c.jobTitle}</SectionHeading>
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
      <YamlBuilder title={c.builderJob} folder="job-evolutions" fields={jobEvolutionFields(c)} />

      <SectionHeading id="secrets-format" level={3}>{c.secTitle}</SectionHeading>
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
      <YamlBuilder title={c.builderSec} folder="secrets" fields={secretUnlockFields(c)} />

      <SectionHeading id="integraciones">{c.intTitle}</SectionHeading>
      <ul>
        <li>
          {fill(c.intEnch, {
            ench: <strong>RPGRoll-Enchantments</strong>,
            field: <code>enchantment: &lt;id&gt;</code>,
          })}
        </li>
        <li>
          {fill(c.intQuests, {
            quests: <strong>RPGRoll-Quests</strong>,
            field: <code>completed-quests</code>,
          })}
        </li>
      </ul>

      <SectionHeading id="gui">{c.guiTitle}</SectionHeading>
      <p>
        {fill(c.guiBody, {
          cmd: <Kbd>{"/ascendadmin browser <tipo>"}</Kbd>,
          types: (
            <>
              <code>evolution</code>, <code>specialization</code>, <code>prestige</code>,{" "}
              <code>affinity</code>, <code>jobevolution</code>, <code>secret</code>, <code>faction</code>,{" "}
              <code>achievement</code>, <code>title</code>, <code>legacy</code>
            </>
          ),
          def: <code>evolution</code>,
          syntax: <code>clave=valor,clave2=valor2</code>,
        })}
      </p>
      <Callout tone="warning" title={c.guiWarnTitle}>
        {fill(c.guiWarnBody, {
          cls: <code>ClassSpecialization</code>,
          syntax: <code>{"id;nombre;costo;requiere1,requiere2;stat=val;skill;trait;encantamiento"}</code>,
        })}
      </Callout>

      <SectionHeading id="comandos-jugador">{c.playerCmdsTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thCommand}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          <Tr><Td className={mono}>{"/ascend race <id>"}</Td><Td>{c.pc1}</Td></Tr>
          <Tr><Td className={mono}>{"/ascend specialize <id>"}</Td><Td>{c.pc2}</Td></Tr>
          <Tr><Td className={mono}>{"/ascend talent <id>"}</Td><Td>{c.pc3}</Td></Tr>
          <Tr><Td className={mono}>/ascend prestige</Td><Td>{c.pc4}</Td></Tr>
          <Tr><Td className={mono}>/ascend affinity</Td><Td>{c.pc5}</Td></Tr>
          <Tr><Td className={mono}>/ascend reputation</Td><Td>{c.pc6}</Td></Tr>
          <Tr><Td className={mono}>{"/ascend title <id|clear>"}</Td><Td>{c.pc7}</Td></Tr>
          <Tr><Td className={mono}>/ascend legacy</Td><Td>{c.pc8}</Td></Tr>
          <Tr><Td className={mono}>/ascend info</Td><Td>{c.pc9}</Td></Tr>
        </tbody>
      </Table>

      <SectionHeading id="comandos-admin">{c.adminCmdsTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thCommand}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          <Tr><Td className={mono}>{"/ascendadmin achievement grant <j> <id>"}</Td><Td>{c.ac1}</Td></Tr>
          <Tr><Td className={mono}>{"/ascendadmin title grant <j> <id>"}</Td><Td>{c.ac2}</Td></Tr>
          <Tr><Td className={mono}>{"/ascendadmin reputation add <j> <facción> <cant>"}</Td><Td>{c.ac3}</Td></Tr>
          <Tr><Td className={mono}>{"/ascendadmin browser [tipo]"}</Td><Td>{c.ac4}</Td></Tr>
          <Tr><Td className={mono}>/ascendadmin reload</Td><Td>{c.ac5}</Td></Tr>
        </tbody>
      </Table>
      <p>{fill(c.adminPermBody, { perm: <Badge tone="amber">rpgrollascension.admin.*</Badge> })}</p>

      <SectionHeading id="placeholders">{c.phTitle}</SectionHeading>
      <p>{fill(c.phBody, { exp: <Badge tone="violet">rpgrollascension</Badge> })}</p>
      <Table>
        <Thead>
          <Th>{c.thPlaceholder}</Th>
          <Th>{c.thValue}</Th>
        </Thead>
        <tbody>
          <Tr>
            <Td className={mono}>%rpgrollascension_evolution% / _specialization</Td>
            <Td>{fill(c.ph1, { dash: <code>-</code> })}</Td>
          </Tr>
          <Tr><Td className={mono}>%rpgrollascension_prestige% / _legacy</Td><Td>{c.ph2}</Td></Tr>
          <Tr><Td className={mono}>%rpgrollascension_exp_bonus%</Td><Td>{c.ph3}</Td></Tr>
          <Tr><Td className={mono}>%rpgrollascension_talent_points%</Td><Td>{c.ph4}</Td></Tr>
          <Tr><Td className={mono}>{"%rpgrollascension_affinity_<id>_level%"}</Td><Td>{c.ph5}</Td></Tr>
          <Tr><Td className={mono}>{"%rpgrollascension_reputation_<facción>%"}</Td><Td>{c.ph6}</Td></Tr>
          <Tr>
            <Td className={mono}>%rpgrollascension_title%</Td>
            <Td>{fill(c.ph7, { dash: <code>-</code> })}</Td>
          </Tr>
        </tbody>
      </Table>

      <PrevNext current="ascension" onNavigate={onNavigate} />
    </>
  );
}
