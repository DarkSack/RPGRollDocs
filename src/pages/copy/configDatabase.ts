import type { Locale } from "../../i18n";

/** Texto de las páginas Configuración y Base de datos. */

const es = {
  config: {
    title: "Configuración",
    intro:
      "Los archivos YAML que controlan el comportamiento del plugin, generados automáticamente la primera vez que arranca (en {dir}).",
    thKey: "Clave",
    thType: "Tipo",
    thDefault: "Default",
    thDescription: "Descripción",
    warnTitle: "Claves marcadas con ⚠",
    warnBody:
      "Algunas claves de {file} existen en el archivo pero el código nunca las lee — quedaron de un diseño anterior o anticipan una función no conectada todavía (ver las notas ⚠ en la tabla de gameplay.yml arriba). No asumas que cambiarlas tiene efecto sin verificar contra el código.",
    contentNote: "Los archivos de {content} (razas, clases, trabajos, habilidades, traits) tienen su propio formato — ver",
    contentStrong: "contenido",
    and: "y",
  },
  database: {
    title: "Base de datos",
    intro: "SQLite embebido (sin servidor externo), con un sistema de migraciones versionadas propio.",
    migrationsTitle: "Sistema de migraciones",
    migrationsBody:
      "Cada migración es un archivo {sql} plano dentro del jar ({dir}), registrado manualmente en {registry} con un número de versión. {tracker} guarda qué versiones ya se aplicaron; {migrator} corre las pendientes en orden, cada una dentro de su propia transacción (rollback automático si falla).",
    thVersion: "Versión",
    thFile: "Archivo",
    thWhat: "Qué hace",
    tipBody:
      "Para agregar tu propia migración: creá {file} en {dir}, y registrala en {call} con {register}. Las migraciones se ejecutan en orden y nunca se re-corren una vez aplicadas.",
    schemaTitle: "Esquema actual (tablas principales)",
    connTitle: "Configuración de conexión",
    connBody: "Ver {file} en",
    connAfter: "— modo WAL activado por defecto para mejor concurrencia lectura/escritura.",

    m1: "Tabla players: identidad, raza, clase, nivel, experiencia.",
    m2: "Tabla player_stats: los 6 atributos D&D.",
    m3: "Tabla player_skills: habilidades aprendidas y su nivel.",
    m4: "Tabla player_traits: traits adquiridos.",
    m5: "Tabla player_jobs: trabajos activos, nivel y experiencia.",
    m6: "Tabla placed_blocks: anti-farm del Minero.",
    m7: "Tabla explorer_progress: biomas visitados y distancia recorrida.",
    m8: "Agrega timestamp a placed_blocks (para la limpieza periódica).",
    m9: "Agrega unspent_stat_points a players, y max/current health/mana a player_stats.",
  },
};

export type ConfigDatabaseCopy = typeof es;

const en: ConfigDatabaseCopy = {
  config: {
    title: "Configuration",
    intro:
      "The YAML files that control plugin behaviour, generated automatically the first time it boots (under {dir}).",
    thKey: "Key",
    thType: "Type",
    thDefault: "Default",
    thDescription: "Description",
    warnTitle: "Keys marked with ⚠",
    warnBody:
      "Some {file} keys exist in the file but the code never reads them — they are left over from an earlier design or anticipate a feature that is not wired up yet (see the ⚠ notes in the gameplay.yml table above). Do not assume changing them has any effect without checking against the code.",
    contentNote: "The {content} files (races, classes, jobs, skills, traits) have their own format — see",
    contentStrong: "content",
    and: "and",
  },
  database: {
    title: "Database",
    intro: "Embedded SQLite (no external server), with its own versioned migration system.",
    migrationsTitle: "Migration system",
    migrationsBody:
      "Every migration is a plain {sql} file inside the jar ({dir}), registered by hand in {registry} with a version number. {tracker} records which versions have been applied; {migrator} runs the pending ones in order, each in its own transaction (automatic rollback on failure).",
    thVersion: "Version",
    thFile: "File",
    thWhat: "What it does",
    tipBody:
      "To add your own migration: create {file} in {dir}, and register it in {call} with {register}. Migrations run in order and are never re-run once applied.",
    schemaTitle: "Current schema (main tables)",
    connTitle: "Connection configuration",
    connBody: "See {file} in",
    connAfter: "— WAL mode is on by default for better read/write concurrency.",

    m1: "players table: identity, race, class, level, experience.",
    m2: "player_stats table: the 6 D&D attributes.",
    m3: "player_skills table: learned skills and their level.",
    m4: "player_traits table: acquired traits.",
    m5: "player_jobs table: active jobs, level and experience.",
    m6: "placed_blocks table: Miner anti-farm.",
    m7: "explorer_progress table: visited biomes and distance travelled.",
    m8: "Adds a timestamp to placed_blocks (for the periodic cleanup).",
    m9: "Adds unspent_stat_points to players, and max/current health/mana to player_stats.",
  },
};

const pt: ConfigDatabaseCopy = {
  config: {
    title: "Configuração",
    intro:
      "Os arquivos YAML que controlam o comportamento do plugin, gerados automaticamente na primeira inicialização (em {dir}).",
    thKey: "Chave",
    thType: "Tipo",
    thDefault: "Default",
    thDescription: "Descrição",
    warnTitle: "Chaves marcadas com ⚠",
    warnBody:
      "Algumas chaves de {file} existem no arquivo mas o código nunca as lê — sobraram de um design anterior ou antecipam uma função ainda não conectada (veja as notas ⚠ na tabela de gameplay.yml acima). Não assuma que alterá-las tem efeito sem verificar contra o código.",
    contentNote: "Os arquivos de {content} (raças, classes, trabalhos, habilidades, traits) têm formato próprio — veja",
    contentStrong: "conteúdo",
    and: "e",
  },
  database: {
    title: "Banco de dados",
    intro: "SQLite embutido (sem servidor externo), com um sistema de migrações versionadas próprio.",
    migrationsTitle: "Sistema de migrações",
    migrationsBody:
      "Cada migração é um arquivo {sql} simples dentro do jar ({dir}), registrado manualmente em {registry} com um número de versão. {tracker} guarda quais versões já foram aplicadas; {migrator} roda as pendentes em ordem, cada uma dentro da sua própria transação (rollback automático em caso de falha).",
    thVersion: "Versão",
    thFile: "Arquivo",
    thWhat: "O que faz",
    tipBody:
      "Para adicionar a sua própria migração: crie {file} em {dir}, e registre-a em {call} com {register}. As migrações rodam em ordem e nunca são re-executadas depois de aplicadas.",
    schemaTitle: "Esquema atual (tabelas principais)",
    connTitle: "Configuração de conexão",
    connBody: "Veja {file} em",
    connAfter: "— modo WAL ativado por padrão para melhor concorrência de leitura/escrita.",

    m1: "Tabela players: identidade, raça, classe, nível, experiência.",
    m2: "Tabela player_stats: os 6 atributos D&D.",
    m3: "Tabela player_skills: habilidades aprendidas e o seu nível.",
    m4: "Tabela player_traits: traits adquiridos.",
    m5: "Tabela player_jobs: trabalhos ativos, nível e experiência.",
    m6: "Tabela placed_blocks: anti-farm do Minerador.",
    m7: "Tabela explorer_progress: biomas visitados e distância percorrida.",
    m8: "Adiciona timestamp a placed_blocks (para a limpeza periódica).",
    m9: "Adiciona unspent_stat_points a players, e max/current health/mana a player_stats.",
  },
};

export const CONFIG_DB_COPY: Record<Locale, ConfigDatabaseCopy> = { es, en, pt };
