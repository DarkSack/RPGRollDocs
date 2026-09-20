import type { Locale } from "../strings";

/**
 * Traducción de las descripciones de permisos, indexadas por nodo.
 *
 * Los nodos (`rpgroll.player.stats`) no se traducen: son identificadores que
 * se escriben tal cual en LuckPerms o en permissions.yml.
 */
type Descriptions = Record<string, string>;

const en: Descriptions = {
  "rpgroll.*": "Full access to every RPGRoll command.",
  "rpgroll.player.*": "Access to every player command.",
  "rpgroll.player.stats": "View stats.",
  "rpgroll.player.level": "View level and experience.",
  "rpgroll.player.class": "View and change class.",
  "rpgroll.player.race": "View and change race.",
  "rpgroll.player.create": "Create a character.",
  "rpgroll.player.skills": "View skills.",
  "rpgroll.player.traits": "View traits.",
  "rpgroll.player.mystats": "View detailed stats.",
  "rpgroll.player.allocate": "Spend available stat points.",
  "rpgroll.player.useskill": "Use learned skills.",
  "rpgroll.player.jobs": "View and manage jobs.",
  "rpgroll.admin.*": "Access to every admin command.",
  "rpgroll.admin.reload": "Reload the plugin configuration.",
  "rpgroll.admin.addxp": "Grant experience to players.",
  "rpgroll.admin.levelup": "Level up (debug).",
  "rpgroll.admin.gui": "Open the selection interfaces in preview mode.",
  "rpgroll.admin.setrace": "Change a player's race.",
  "rpgroll.admin.setclass": "Change a player's class.",
  "rpgroll.admin.resetstats": "Reset and refund a player's attribute points.",
  "rpgroll.admin.job": "Manage player jobs.",
  "rpgroll.admin.content": "Visual editor for races/classes/jobs/skills/traits.",
};

const pt: Descriptions = {
  "rpgroll.*": "Acesso completo a todos os comandos do RPGRoll.",
  "rpgroll.player.*": "Acesso a todos os comandos de jogador.",
  "rpgroll.player.stats": "Ver estatísticas.",
  "rpgroll.player.level": "Ver nível e experiência.",
  "rpgroll.player.class": "Ver e mudar de classe.",
  "rpgroll.player.race": "Ver e mudar de raça.",
  "rpgroll.player.create": "Criar personagem.",
  "rpgroll.player.skills": "Ver habilidades.",
  "rpgroll.player.traits": "Ver traits.",
  "rpgroll.player.mystats": "Ver estatísticas detalhadas.",
  "rpgroll.player.allocate": "Gastar pontos de atributo disponíveis.",
  "rpgroll.player.useskill": "Usar habilidades aprendidas.",
  "rpgroll.player.jobs": "Ver e gerenciar trabalhos.",
  "rpgroll.admin.*": "Acesso a todos os comandos de administrador.",
  "rpgroll.admin.reload": "Recarregar a configuração do plugin.",
  "rpgroll.admin.addxp": "Adicionar experiência a jogadores.",
  "rpgroll.admin.levelup": "Subir de nível (debug).",
  "rpgroll.admin.gui": "Abrir as interfaces de seleção em modo preview.",
  "rpgroll.admin.setrace": "Mudar a raça de um jogador.",
  "rpgroll.admin.setclass": "Mudar a classe de um jogador.",
  "rpgroll.admin.resetstats": "Reiniciar e reembolsar os pontos de atributo de um jogador.",
  "rpgroll.admin.job": "Gerenciar trabalhos de jogadores.",
  "rpgroll.admin.content": "Editor visual de raças/classes/trabalhos/habilidades/traits.",
};

const MAP: Partial<Record<Locale, Descriptions>> = { en, pt };

export function localizedPermission(node: string, fallback: string, locale: Locale): string {
  return MAP[locale]?.[node] ?? fallback;
}
