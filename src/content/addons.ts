import type { ComponentType } from "react";
import type { IconProps } from "../components/icons/Icon";
import {
  NpcIcon,
  GemIcon,
  WandIcon,
  FlagIcon,
  LayersIcon,
  SwordIcon,
  ChatIcon,
  ShieldIcon,
  BoxesIcon,
  CompassIcon,
  SparklesIcon,
  HeartPulseIcon,
  LeafIcon,
  FishIcon,
  PackageIcon,
  RabbitIcon,
  RobotIcon,
  CoinsIcon,
  HammerIcon,
  TableListIcon,
  WrenchIcon,
  CubeIcon,
} from "../components/icons/Icon";

export interface AddonMeta {
  slug: string;
  icon: ComponentType<IconProps>;
  /** Descripción de una línea para la grilla de la home. */
  blurb: string;
  /** Tono de acento para el ícono en la grilla (paleta ya usada en Badge). */
  tone: "violet" | "green" | "amber" | "red" | "blue" | "neutral";
}

/**
 * Metadata visual (ícono, blurb, tono) para los 22 addons oficiales — separado
 * de content/nav.ts a propósito para no tocar la forma de NavItem/NavSection
 * que ya consumen Sidebar/PrevNext/search.ts. Sidebar y Home leen de acá.
 */
export const addons: AddonMeta[] = [
  { slug: "npcs", icon: NpcIcon, blurb: "NPCs con diálogo, tiendas y acciones condicionales.", tone: "blue" },
  { slug: "items", icon: GemIcon, blurb: "Ítems custom: rareza, sockets, stats, skins y recetas.", tone: "violet" },
  { slug: "encantamientos", icon: SparklesIcon, blurb: "Encantamientos con niveles, triggers y condiciones propias.", tone: "amber" },
  { slug: "quests", icon: FlagIcon, blurb: "Misiones multi-etapa con objetivos, regiones y recompensas.", tone: "green" },
  { slug: "ascension", icon: LayersIcon, blurb: "Evolución de raza, prestigio, afinidades y legado post-max-level.", tone: "violet" },
  { slug: "mobs", icon: SwordIcon, blurb: "Mobs y jefes con IA simulada, fases y motor de combate propio.", tone: "red" },
  { slug: "chat", icon: ChatIcon, blurb: "Canales, idiomas, roles de chat y emotes.", tone: "blue" },
  { slug: "guilds", icon: ShieldIcon, blurb: "Guilds y teams con roles, permisos y misiones grupales.", tone: "blue" },
  { slug: "crates", icon: BoxesIcon, blurb: "Cajas con recompensas ponderadas y ruleta animada.", tone: "amber" },
  { slug: "dungeons", icon: CompassIcon, blurb: "Mazmorras por salas, dificultades y checkpoints.", tone: "red" },
  { slug: "sackeffects", icon: SparklesIcon, blurb: "Librería de partículas y sonido reusable por otros addons.", tone: "violet" },
  { slug: "rpgroll-effects", icon: HeartPulseIcon, blurb: "Motor de efectos de estado: stacking, inmunidades y componentes.", tone: "red" },
  { slug: "magic", icon: WandIcon, blurb: "Hechizos por pipeline de componentes, runas y grimorios.", tone: "violet" },
  { slug: "seasons", icon: LeafIcon, blurb: "Calendario, clima, temperatura y vegetación dinámica.", tone: "green" },
  { slug: "fishing", icon: FishIcon, blurb: "Especies, cañas, carnadas y minijuego de forcejeo.", tone: "blue" },
  { slug: "sackresourcepack", icon: PackageIcon, blurb: "Pipeline de resource pack: fusión, build, distribución.", tone: "neutral" },
  { slug: "ranching", icon: RabbitIcon, blurb: "Genética, linaje, reproducción y bienestar animal.", tone: "green" },
  { slug: "workers", icon: RobotIcon, blurb: "NPCs trabajadores autónomos con IA por reglas y salario.", tone: "amber" },
  { slug: "economy", icon: CoinsIcon, blurb: "Wallets, bancos, mercado dinámico, subastas y empresas.", tone: "amber" },
  { slug: "crafting", icon: HammerIcon, blurb: "Recetas y estaciones custom + puente con estaciones vanilla.", tone: "violet" },
  { slug: "tab", icon: TableListIcon, blurb: "TabList, scoreboard, nametags y bossbars por placeholders.", tone: "blue" },
  { slug: "extras", icon: WrenchIcon, blurb: "Sed, stamina, temperatura y condiciones de supervivencia.", tone: "green" },
];

export function addonMeta(slug: string): AddonMeta | undefined {
  return addons.find((a) => a.slug === slug);
}

/** Ícono genérico de respaldo para nav items que no son addons (secciones core, referencia). */
export const DefaultNavIcon = CubeIcon;
