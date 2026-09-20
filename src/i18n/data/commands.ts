import type { Locale } from "../strings";

/**
 * Traducción de las descripciones de comandos.
 *
 * Indexadas por el `name` de content/commands.ts, que es la fuente de verdad
 * en español. Los comandos y sus argumentos NO se traducen: son sintaxis real
 * del plugin (`/rpg allocate fuerza 3` funciona así, escrito así).
 */
type Descriptions = Record<string, string>;

const en: Descriptions = {
  create: "Starts character creation (pick a race and a class) if you don't have one yet.",
  stats: "Shows your 6 D&D attributes (strength, dexterity, constitution, intelligence, wisdom, charisma).",
  mystats: "Detailed stats: attributes, unspent points, current health/mana, armor, evasion and crit.",
  allocate: "Spends available stat points (earned on level up). Adjusts health/mana/evasion accordingly.",
  level: "Shows your current level and accumulated experience.",
  race: "Shows your current race, or lists the available ones.",
  class: "Shows your current class, or lists the available ones.",
  skills: "Lists your learned skills along with their mana cost, cooldown and requirements.",
  use: "Uses a learned skill: deducts mana, respects cooldowns and applies its effects.",
  traits: "Shows the traits you have acquired.",
  jobs: "Opens the jobs GUI: full catalogue and the state of each one (active, level, progress).",
  reload: "Reloads the configuration and all YAML content (races, classes, jobs, skills, traits).",
  addxp: "Grants experience to an online player.",
  levelup: "Forces a level-up attempt on yourself — useful for testing level rewards.",
  admingui: "Opens the race/class selection GUIs in preview mode, without affecting your character.",
  admincontent: "Visual GUI editor to create and edit races, classes, jobs, skills and traits.",
  setrace: "Changes a player's race. Without --recalc it keeps their current stats.",
  setclass: "Same as setrace, but for the player's class.",
  resetstats: "Resets a player's 6 attributes to their base value and gives back the spent points.",
  job: "Manages a player's active jobs: assign, remove or set the level.",
};

const pt: Descriptions = {
  create: "Inicia a criação de personagem (escolher raça e classe) se você ainda não tiver uma.",
  stats: "Mostra os seus 6 atributos D&D (força, destreza, constituição, inteligência, sabedoria, carisma).",
  mystats: "Estatísticas detalhadas: atributos, pontos não gastos, vida/mana atuais, armadura, evasão e crítico.",
  allocate: "Gasta pontos de atributo disponíveis (ganhos ao subir de nível). Ajusta vida/mana/evasão de acordo.",
  level: "Mostra o seu nível atual e a experiência acumulada.",
  race: "Mostra a sua raça atual, ou lista as raças disponíveis.",
  class: "Mostra a sua classe atual, ou lista as classes disponíveis.",
  skills: "Lista as suas habilidades aprendidas junto com custo de mana, cooldown e requisitos.",
  use: "Usa uma habilidade aprendida: desconta mana, respeita cooldowns e aplica os seus efeitos.",
  traits: "Mostra os traits (características) que você adquiriu.",
  jobs: "Abre a GUI de trabalhos: catálogo completo e estado de cada um (ativo, nível, progresso).",
  reload: "Recarrega a configuração e todo o conteúdo YAML (raças, classes, trabalhos, habilidades, traits).",
  addxp: "Adiciona experiência a um jogador conectado.",
  levelup: "Força uma tentativa de subida de nível em você mesmo — útil para testar recompensas de nível.",
  admingui: "Abre as GUIs de seleção de raça/classe em modo preview, sem afetar o seu personagem.",
  admincontent: "Editor visual com GUI para criar e editar raças, classes, trabalhos, habilidades e traits.",
  setrace: "Muda a raça de um jogador. Sem --recalc mantém os stats atuais.",
  setclass: "Igual a setrace, mas para a classe do jogador.",
  resetstats: "Reinicia os 6 atributos de um jogador ao valor base e devolve os pontos gastos.",
  job: "Administra os trabalhos ativos de um jogador: atribuir, remover ou fixar o nível.",
};

const MAP: Partial<Record<Locale, Descriptions>> = { en, pt };

export function localizedCommand(name: string, fallback: string, locale: Locale): string {
  return MAP[locale]?.[name] ?? fallback;
}
