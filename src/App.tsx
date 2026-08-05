import { useHashRoute } from "./hooks/useHashRoute";
import { useTheme } from "./hooks/useTheme";
import { Layout } from "./components/layout/Layout";
import { pageTitle } from "./content/nav";

import { Home } from "./pages/Home";
import { Architecture } from "./pages/Architecture";
import { PlayerSystem } from "./pages/PlayerSystem";
import { RacesClasses } from "./pages/RacesClasses";
import { StatsCombat } from "./pages/StatsCombat";
import { SkillsTraits } from "./pages/SkillsTraits";
import { Jobs } from "./pages/Jobs";
import { Progression } from "./pages/Progression";
import { Npcs } from "./pages/Npcs";
import { Items } from "./pages/Items";
import { Enchantments } from "./pages/Enchantments";
import { Quests } from "./pages/Quests";
import { Ascension } from "./pages/Ascension";
import { Mobs } from "./pages/Mobs";
import { Chat } from "./pages/Chat";
import { Guilds } from "./pages/Guilds";
import { Crates } from "./pages/Crates";
import { Dungeons } from "./pages/Dungeons";
import { SackEffects } from "./pages/SackEffects";
import { Effects } from "./pages/Effects";
import { Magic } from "./pages/Magic";
import { Seasons } from "./pages/Seasons";
import { Fishing } from "./pages/Fishing";
import { SackResourcePack } from "./pages/SackResourcePack";
import { Ranching } from "./pages/Ranching";
import { Workers } from "./pages/Workers";
import { Commands } from "./pages/Commands";
import { Permissions } from "./pages/Permissions";
import { Configuration } from "./pages/Configuration";
import { Database } from "./pages/Database";
import { Api } from "./pages/Api";

function App() {
  const [route, navigate] = useHashRoute();
  const [theme, toggleTheme] = useTheme();

  document.title = route === "inicio" ? "RPGRoll — Documentación" : `${pageTitle(route)} — RPGRoll`;

  return (
    <Layout current={route} onNavigate={navigate} theme={theme} onToggleTheme={toggleTheme}>
      <Page route={route} onNavigate={navigate} />
    </Layout>
  );
}

function Page({ route, onNavigate }: { route: string; onNavigate: (slug: string) => void }) {
  switch (route) {
    case "inicio":
      return <Home onNavigate={onNavigate} />;
    case "arquitectura":
      return <Architecture onNavigate={onNavigate} />;
    case "jugadores":
      return <PlayerSystem onNavigate={onNavigate} />;
    case "razas-clases":
      return <RacesClasses onNavigate={onNavigate} />;
    case "stats-combate":
      return <StatsCombat onNavigate={onNavigate} />;
    case "habilidades-traits":
      return <SkillsTraits onNavigate={onNavigate} />;
    case "trabajos":
      return <Jobs onNavigate={onNavigate} />;
    case "progresion":
      return <Progression onNavigate={onNavigate} />;
    case "npcs":
      return <Npcs onNavigate={onNavigate} />;
    case "items":
      return <Items onNavigate={onNavigate} />;
    case "encantamientos":
      return <Enchantments onNavigate={onNavigate} />;
    case "quests":
      return <Quests onNavigate={onNavigate} />;
    case "ascension":
      return <Ascension onNavigate={onNavigate} />;
    case "mobs":
      return <Mobs onNavigate={onNavigate} />;
    case "chat":
      return <Chat onNavigate={onNavigate} />;
    case "guilds":
      return <Guilds onNavigate={onNavigate} />;
    case "crates":
      return <Crates onNavigate={onNavigate} />;
    case "dungeons":
      return <Dungeons onNavigate={onNavigate} />;
    case "sackeffects":
      return <SackEffects onNavigate={onNavigate} />;
    case "rpgroll-effects":
      return <Effects onNavigate={onNavigate} />;
    case "magic":
      return <Magic onNavigate={onNavigate} />;
    case "seasons":
      return <Seasons onNavigate={onNavigate} />;
    case "fishing":
      return <Fishing onNavigate={onNavigate} />;
    case "sackresourcepack":
      return <SackResourcePack onNavigate={onNavigate} />;
    case "ranching":
      return <Ranching onNavigate={onNavigate} />;
    case "workers":
      return <Workers onNavigate={onNavigate} />;
    case "comandos":
      return <Commands onNavigate={onNavigate} />;
    case "permisos":
      return <Permissions onNavigate={onNavigate} />;
    case "configuracion":
      return <Configuration onNavigate={onNavigate} />;
    case "base-de-datos":
      return <Database onNavigate={onNavigate} />;
    case "api":
      return <Api onNavigate={onNavigate} />;
    default:
      return <Home onNavigate={onNavigate} />;
  }
}

export default App;
