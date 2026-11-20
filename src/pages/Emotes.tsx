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
} from "../components/ui";
import type { ReactNode } from "react";
import { useI18n, fill } from "../i18n";
import { EMOTES_COPY } from "./copy/emotes";

const EMOTE_YAML =
  "id: saludar                 # opcional: si falta, se usa el nombre del archivo\n" +
  'name: "lang:emotes.saludar" # texto con colores, o «lang:<clave>» para traducirlo con lang/\n' +
  "icon: FEATHER               # material de ítem; si no existe, se muestra papel\n" +
  "category: social            # pestaña del menú: social, baile, accion o la que quieras\n" +
  "animation: saludar          # OBLIGATORIO: nombre de la animación dentro del modelo\n" +
  "model: rpgroll_emotes       # modelo de BetterModel; por defecto, el limb-model de config.yml\n" +
  "loop: false                 # true: se repite hasta que algo lo corte\n" +
  "unlock: free                # free | locked\n" +
  "rarity: common              # common, uncommon, rare, epic, legendary\n" +
  "hidden: false               # true: no sale en el menú hasta que el jugador lo tiene\n" +
  'how-to-unlock: "Completa la misión X"   # opcional: texto del menú para un emote bloqueado\n' +
  'sound: { id: "minecraft:block.wool.place", volume: 0.6, pitch: 1.3 }   # opcional\n' +
  "particles: { type: NOTE, count: 4 }     # opcional\n" +
  "cancel: [move, damage, attack, mount]   # opcional\n" +
  "music:                                  # opcional\n" +
  '  sound: "mipack:emotes.mi_cancion"\n' +
  "  volume: 1.0\n" +
  "  length: 62.5\n";

export function Emotes({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const { locale } = useI18n();
  const c = EMOTES_COPY[locale];
  const bbmodel = <code>plugins/BetterModel/players/rpgroll_emotes.bbmodel</code>;

  const play: [ReactNode, string][] = [
    [<code key="menu">/emotes</code>, c.pMenu],
    [<strong key="hotkey">{c.shiftF}</strong>, c.pHotkey],
    [<code key="quick">/emotes rapido</code>, c.pQuick],
    [<code key="emote">/emote &lt;id&gt;</code>, c.pEmote],
    [<code key="slot">/emote 1 … /emote 7</code>, c.pSlot],
    [<code key="stop">/emote stop</code>, c.pStop],
  ];

  const commands: [string, string][] = [
    ["/emotesadmin give <jugador> <emote>", c.cGive],
    ["/emotesadmin take <jugador> <emote>", c.cTake],
    ["/emotesadmin list <jugador>", c.cList],
    ["/emotesadmin play <jugador> <emote>", c.cPlay],
    ["/emotesadmin reload", c.cReload],
  ];

  const permissions: [string, string, string][] = [
    ["rpgrollemotes.use", c.dAll, c.pUse],
    ["rpgrollemotes.emote.<id>", c.dNone, c.pOne],
    ["rpgrollemotes.emote.*", c.dNone, c.pAll],
    ["rpgrollemotes.bypass.cooldown", "op", c.pBypass],
    ["rpgrollemotes.admin", "op", c.pAdmin],
  ];

  const keys: [string, string][] = [
    ["animation", c.kAnimation],
    ["unlock", c.kUnlock],
    ["rarity", c.kRarity],
    ["hidden", c.kHidden],
    ["sound", c.kSound],
    ["particles", c.kParticles],
    ["cancel", c.kCancel],
  ];

  const config: [string, string, string][] = [
    ["language", "es", c.cfLanguage],
    ["cooldown-seconds", "3", c.cfCooldown],
    ["combat-tag-seconds", "8", c.cfCombat],
    ["cancel.move-distance", "0.3", c.cfMove],
    ["favorites.max", "7", c.cfFavorites],
    ["hotkeys.sneak-swap", "true", c.cfSneak],
    ["hotkeys.quick-actions", "true", c.cfQuick],
    ["limb-model", "rpgroll_emotes", c.cfLimb],
    ["magic.enabled", "true", c.cfMagic],
    ["magic.cast.default / magic.channel.default", "conjurar / canalizar", c.cfDefaults],
    ["magic.cast.schools / magic.channel.schools", c.vEmpty, c.cfSchools],
    ["menus.pack", c.vEmpty, c.cfMenus],
    ["resource-pack.register-in-sackresourcepack", "true", c.cfSrp],
  ];

  return (
    <>
      <PageHeader title={c.title} slug="emotes">
        {c.intro}
      </PageHeader>

      <SectionHeading id="requisitos">{c.reqTitle}</SectionHeading>
      <CodeBlock language="yaml" code={"depend: [RPGRoll-Lib, BetterModel]\nsoftdepend: [RPGRoll-Magic, SackResourcePack]"} />
      <p>
        {fill(c.reqBody, {
          lib: <strong>RPGRoll-Lib</strong>,
          bm: <strong>BetterModel</strong>,
          srp: <strong>SackResourcePack</strong>,
          magic: <strong>RPGRoll-Magic</strong>,
        })}
      </p>
      <Callout tone="warning">{c.reqJava}</Callout>

      <SectionHeading id="instalacion">{c.installTitle}</SectionHeading>
      <ol className="list-decimal pl-6 space-y-1">
        <li>{fill(c.install1, { bm: <strong>BetterModel</strong> })}</li>
        <li>{fill(c.install2, { license: <code>plugins/RPGRoll-Emotes/license.yml</code> })}</li>
        <li>{fill(c.install3, { folder: <code>plugins/RPGRoll-Emotes/</code>, bbmodel })}</li>
        <li>{c.install4}</li>
      </ol>
      <p>{fill(c.installEdit, { bbmodel })}</p>

      <SectionHeading id="pack">{c.packTitle}</SectionHeading>
      <p>{fill(c.packSrp, { module: <code>content/bettermodel</code>, publish: <Kbd>/srp publish</Kbd> })}</p>
      <Callout tone="warning">
        {fill(c.packWarn, { rebuild: <code>/srp rebuild</code>, zip: <code>pack-type: zip</code> })}
      </Callout>
      <p>{fill(c.packNoSrp, { key: <code>resource-pack.register-in-sackresourcepack</code> })}</p>

      <SectionHeading id="como-se-juega">{c.playTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thAction}</Th>
          <Th>{c.thWhat}</Th>
        </Thead>
        <tbody>
          {play.map(([action, what], i) => (
            <Tr key={i}>
              <Td className="text-xs">{action}</Td>
              <Td>{what}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <p>{c.playNote}</p>

      <SectionHeading id="cortes">{c.cutTitle}</SectionHeading>
      <p>{fill(c.cutBody, { move: <code>cancel.move-distance</code> })}</p>
      <p>{c.cutNoTitle}</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>{fill(c.cutCombat, { combat: <code>combat-tag-seconds</code> })}</li>
        <li>
          {fill(c.cutCooldown, {
            cooldown: <code>cooldown-seconds</code>,
            bypass: <code>rpgrollemotes.bypass.cooldown</code>,
          })}
        </li>
        <li>{c.cutLocked}</li>
      </ul>

      <SectionHeading id="comandos">{c.commandsTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thCommand}</Th>
          <Th>{c.thDesc}</Th>
        </Thead>
        <tbody>
          {commands.map(([cmd, does]) => (
            <Tr key={cmd}>
              <Td className="font-mono text-xs">{cmd}</Td>
              <Td>{does}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <SectionHeading id="permisos">{c.permissionsTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thPerm}</Th>
          <Th>{c.thDefault}</Th>
          <Th>{c.thDesc}</Th>
        </Thead>
        <tbody>
          {permissions.map(([perm, def, text]) => (
            <Tr key={perm}>
              <Td>
                <Badge>{perm}</Badge>
              </Td>
              <Td className="font-mono text-xs">{def}</Td>
              <Td>{text}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <p>{fill(c.permData, { file: <code>plugins/RPGRoll-Emotes/data/players/&lt;uuid&gt;.yml</code> })}</p>

      <SectionHeading id="desbloquear">{c.unlockTitle}</SectionHeading>
      <p>
        {fill(c.unlockBody, {
          locked: <code>unlock: locked</code>,
          give: <code>/emotesadmin give &lt;jugador&gt; &lt;emote&gt;</code>,
          player: <code>{"{player}"}</code>,
          pct: <code>%player%</code>,
          perm: <code>rpgrollemotes.emote.&lt;id&gt;</code>,
        })}
      </p>
      <CodeBlock language="text" code={"emotesadmin give {player} bailar_lento"} />

      <SectionHeading id="formato">{c.formatTitle}</SectionHeading>
      <p>
        {fill(c.formatBody, {
          folder: <code>plugins/RPGRoll-Emotes/emotes/</code>,
          reload: <Kbd>/emotesadmin reload</Kbd>,
        })}
      </p>
      <CodeBlock language="yaml" filename="emotes/saludar.yml" code={EMOTE_YAML} />
      <Table>
        <Thead>
          <Th>{c.thKey}</Th>
          <Th>{c.thNotes}</Th>
        </Thead>
        <tbody>
          {keys.map(([key, notes]) => (
            <Tr key={key}>
              <Td className="font-mono text-xs">{key}</Td>
              <Td>{notes}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <SectionHeading id="musica">{c.musicTitle}</SectionHeading>
      <p>
        {fill(c.musicBody, {
          music: <code>music</code>,
          sound: <code>sound</code>,
          volume: <code>volume</code>,
          length: <code>length</code>,
        })}
      </p>
      <Callout tone="warning">{c.musicWarn}</Callout>

      <SectionHeading id="animaciones-propias">{c.customTitle}</SectionHeading>
      <ol className="list-decimal pl-6 space-y-1">
        <li>{c.custom1}</li>
        <li>{fill(c.custom2, { folder: <code>plugins/RPGRoll-Emotes/animations/</code> })}</li>
        <li>
          {fill(c.custom3, {
            model: <code>model: &lt;archivo sin .bbmodel&gt;</code>,
            animation: <code>animation: &lt;tu animación&gt;</code>,
          })}
        </li>
        <li>{fill(c.custom4, { bm: <code>/bm play &lt;modelo&gt; &lt;animación&gt;</code> })}</li>
      </ol>
      <p>{c.customPacks}</p>

      <SectionHeading id="magic">{c.magicTitle}</SectionHeading>
      <p>{fill(c.magicBody, { key: <code>magic.enabled: false</code> })}</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>{c.magicCast}</li>
        <li>{c.magicChannel}</li>
        <li>{c.magicReplace}</li>
        <li>
          {fill(c.magicSchools, {
            cast: <code>magic.cast.schools</code>,
            channel: <code>magic.channel.schools</code>,
            example: <code>fire: conjurar_fuego</code>,
          })}
        </li>
      </ul>
      <Callout tone="info">{c.magicVersion}</Callout>

      <SectionHeading id="configuracion">{c.configTitle}</SectionHeading>
      <Table>
        <Thead>
          <Th>{c.thKey}</Th>
          <Th>{c.thDefault}</Th>
          <Th>{c.thDesc}</Th>
        </Thead>
        <tbody>
          {config.map(([key, def, text]) => (
            <Tr key={key}>
              <Td className="font-mono text-xs">{key}</Td>
              <Td className="font-mono text-xs">{def}</Td>
              <Td>{text}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <SectionHeading id="limites">{c.limitsTitle}</SectionHeading>
      <ul className="list-disc pl-6 space-y-1">
        <li>{c.lJava}</li>
        <li>{c.lClient}</li>
        <li>{c.lSkins}</li>
        <li>{c.lVelocity}</li>
        <li>{c.lPack}</li>
      </ul>

      <PrevNext current="emotes" onNavigate={onNavigate} />
    </>
  );
}
