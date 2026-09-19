/**
 * Build Monster Alchemy guides from JSON export (Luca voice, 1+N model).
 * Run: node scripts/polish-monster-alchemy.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GAME = "monster-alchemy";
const DIR = path.join(__dirname, "..", "guides", GAME);
const JSON_PATH = path.join(
  DIR,
  "monster-alchemy-walkthrough-flow (1).json"
);

const R2 = "https://pub-569323f832f84244a5766b065936dc37.r2.dev/LucasGuide";
const IMG = {
  feature: `${R2}/Monster-Alchemy-Feature-LucasGuide.jpg`,
  alchemistTower: `${R2}/Monster-Alchemy-Alchemist-Tower-LucasGuide.jpg`,
  assignedMonsters: `${R2}/Monster-Alchemy-Assigned-Monsters-LucasGuide.jpg`,
  baLhaBridgeMap: `${R2}/Monster-Alchemy-Ba-lha-Bridge-Map-Location-LucasGuide.jpg`,
  basicAttack: `${R2}/Monster-Alchemy-Basic-Attack-LucasGuide.jpg`,
  bossVampireAdept: `${R2}/Monster-Alchemy-Boss-Vampire-Adept-LucasGuide.jpg`,
  chimericChamber: `${R2}/Monster-Alchemy-Chimeric-Chamber-LucasGuide.jpg`,
  createMonsters: `${R2}/Monster-Alchemy-Create-Monsters-LucasGuide.jpg`,
  dashtPlateauTowerMap: `${R2}/Monster-Alchemy-Dasht-Plateau-Alchemist-Tower-Map-Location-LucasGuide.jpg`,
  marloTownTowerMap: `${R2}/Monster-Alchemy-Marlo-Town-Alchemist-Tower-Map-Location-LucasGuide.jpg`,
  mausoleumF1: `${R2}/Monster-Alchemy-Mausoleum-Dungeon-F1-LucasGuide.jpg`,
  mausoleumF2: `${R2}/Monster-Alchemy-Mausoleum-Dungeon-F2-LucasGuide.jpg`,
  mausoleumF3: `${R2}/Monster-Alchemy-Mausoleum-Dungeon-F3-LucasGuide.jpg`,
  mausoleumF3Key: `${R2}/Monster-Alchemy-Mausoleum-Dungeon-F3-Key-Location-LucasGuide.jpg`,
  mausoleumF4: `${R2}/Monster-Alchemy-Mausoleum-Dungeon-F4-Location-LucasGuide.jpg`,
  mausoleumF5: `${R2}/Monster-Alchemy-Mausoleum-Dungeon-F5-Location-LucasGuide.jpg`,
  monsterManager: `${R2}/Monster-Alchemy-Monster-Manager-LucasGuide.jpg`,
  pondVillageTowerMap: `${R2}/Monster-Alchemy-Pond-Village-Alchemist-Tower-Map-Location-LucasGuide.jpg`,
  questFindAlchemist: `${R2}/Monster-Alchemy-Quest-Find-the-Alchemist-LucasGuide.jpg`,
  questRecoverArtifact: `${R2}/Monster-Alchemy-Quest-Recover-the-Artifact-LucasGuide.jpg`,
  questStrangeIdea: `${R2}/Monster-Alchemy-Quest-Strange-Idea-LucasGuide.jpg`,
  circleOfNecromancy: `${R2}/Monster-Alchemy-Recipe-Circle-of-Necromancy-LucasGuide.jpg`,
  skeletonServant: `${R2}/Monster-Alchemy-Recipe-Skeleton-Servant-LucasGuide.jpg`,
  recipesMenu: `${R2}/Monster-Alchemy-Recipes-Menu-LucasGuide.jpg`,
  shop: `${R2}/Monster-Alchemy-Shop-LucasGuide.jpg`,
  startMenu: `${R2}/Monster-Alchemy-Start-Menu-LucasGuide.jpg`,
  startMonsterChoosing: `${R2}/Monster-Alchemy-Start-Moonster-Choosing-LucasGuide.jpg`,
  sythelTowerMap: `${R2}/Monster-Alchemy-Sythel-Alchemist-Tower-Map-Location-LucasGuide.jpg`,
  towerManager: `${R2}/Monster-Alchemy-Tower-Manager-LucasGuide.jpg`,
  uncannyValleyTowerMap: `${R2}/Monster-Alchemy-Uncanny-Valley-Alchemist-Tower-Map-Location-LucasGuide.jpg`,
};

const MONSTER_TYPES_QUICK_REFERENCE = `## Monster Types — quick reference

When Chimeric has **no named recipe**, output = **weapon type + tier + shared element** of both parents. I keep this grid open when I breed for a slot I still missing — same weapon, same tier, parents share element → result comes from that column.

### Hammer

| Tier | Neutral | Fire | Grass | Water | Energy | Moon |
| --- | --- | --- | --- | --- | --- | --- |
| T1 | Slime, Stick Golem, Goblin Hexer, Noodle, Ork, Plibu, Steel Head, Molo | Red Slime, Imp, Ignibos, Lavapod, Illuminator | Green Slime, Fungus Bufo, Gnome, Mosshat, Corolus, Forest Sprite, Zombie, Barkling | Blue Slime, Merkid, Stompal, Wintlet | Yellow Slime | — |
| T2 | Scale Disciple, Long Slime, Teddo, Cave Troll, Skullhead, Baby Shadow, Skunicorn | Torch Demon, Clawless, Flint Golem, Candela | Druidmmer, Fortifisand, Petomp, Moss Golem, Zombie Slime, Rotspore Brute | Mamclops, Borealus, Cryoadorer | — | — |
| T3 | Ferrous Knuckle | — | Floro, Righteous Hand | Anchored Soul, Eplepe | — | — |

### Arrow (ranged)

| Tier | Neutral | Fire | Grass | Water | Energy | Moon |
| --- | --- | --- | --- | --- | --- | --- |
| T1 | Scout, Goblin Harpooner, Twitchy Fluff, Stinky Plinky, Goblin Gunner, Pott, Rust Eater, Amalgameye, Winged Spirit, Skeleton Ranger, Twin Tome | Solsun, Hot Banshee, Scorched Juggler | Bellotto, Mysterious Sylvan | Naster, Ornenza, Salty Sailor, Banshee, Bruxis | Drosophibuzz | Mechanical Cherub |
| T2 | — | Raging Gunner, Chameledrake, Burny Fluff, Vampire Adept | Leafey, Buzzing Sniper, Infected Juggler | Cloud Drake, Cloud Elemental, Bubblex, Drowned Bucaneer | Trumpet Skeleton | Mechanical Angel |
| T3 | Rune Guardian, Cursed Scale | — | — | — | — | — |

### Sword

| Tier | Neutral | Fire | Grass | Water | Energy | Moon |
| --- | --- | --- | --- | --- | --- | --- |
| T1 | Goblin Pillager, Bone Crawler, Wiwo, Small Tooth, Razor Beak, Floating Helmet, Saka, Skeleton Servant, Disturbing Silhouette | Dragonling, Phenchi, Vampire Kid | Gekklar, Spikk | Brachillo, Northern Warrior, Flicko, Phantucho, Slimbones | Leggy, Rusty Knight | — |
| T2 | Floating Armor, Gorritero, Strottro | Snapjaw, Piedredge, Bandikko | Gle Sha, Sharptail, Zombie Goblin, Vengeful Doll, Corpse Crop, Demon Sprout | Wave Creeper, Merfolk Lancer, Wereshark, Trianha | Cute Abomination, Cog-Knight | Crowmere |
| T3 | — | Flamtail, Phoenix, Infernal Blade | Deathbloom | — | Stormwing | Dozz |`;

function fig(src, alt, label) {
  const caption = label || alt;
  return `\n![${alt}](${src})\n\n**${caption}**\n`;
}

const MUTATION_STAT_TABLE = `| Mutation | STR | DEF | MIND | SOUL | AGI | Work | HP |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Corrupted** | +25% | +25% | — | -25% | -25% | — | — |
| **Mystic** | -25% | — | +25% | +25% | — | — | -25% |
| **Gigantic** | +50% | — | -33% | — | -33% | +100% | +50% |
| **Tiny** | -25% | — | — | — | +25% | — | — |
| **Nocturnal** | +25% | -25% | — | -25% | +25% | — | — |
| **Spectral** | -25% | +25% | — | +25% | — | — | — |
| **Hollow** | +50% | — | — | +100% | — | — | -50% |`;

function escapeFm(value) {
  return String(value || "")
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, " ");
}

function writeGuide({
  slug,
  title,
  description,
  topic,
  quickAnswer,
  body,
  type,
  image,
}) {
  const fm = [
    "---",
    type === "hub" ? "type: hub" : `title: "${escapeFm(title)}"`,
    type === "hub"
      ? `title: "${escapeFm(title)}"`
      : `description: "${escapeFm(description)}"`,
    type === "hub"
      ? `description: "${escapeFm(description)}"`
      : `game: ${GAME}`,
    type === "hub" ? `game: ${GAME}` : `slug: ${slug}`,
    type === "hub" ? undefined : `topic: ${topic}`,
    image ? `image: "${escapeFm(image)}"` : undefined,
    `date: "2026-09-14"`,
    `updated: "2026-09-14"`,
    `quickAnswer: "${escapeFm(quickAnswer)}"`,
    "---",
  ]
    .filter(Boolean)
    .join("\n");

  const heading = type === "hub" ? "" : `# ${title}\n\n`;
  fs.writeFileSync(
    path.join(DIR, `${slug}.md`),
    `${fm}\n\n${heading}${body.trim()}\n`,
    "utf-8"
  );
}

function stripTicks(text) {
  return String(text || "").replace(/`/g, "").trim();
}

function parseFusionStep(step) {
  const clean = stripTicks(step);
  const fuse = clean.match(
    /^(?:Fuse|Combine)\s+(.+?)\s+\+\s+(.+?)\s+to create\s+(.+?)\.?$/i
  );
  if (fuse) {
    return { a: fuse[1].trim(), b: fuse[2].trim(), result: fuse[3].trim() };
  }
  const summon = clean.match(/^Summon\s+(.+?)\s+with\s+(.+?)\.?$/i);
  if (summon) {
    return { result: summon[1].trim(), materials: summon[2].trim() };
  }
  const craft = clean.match(/^Combine\s+(.+?)\s+to create\s+(.+?)\.?$/i);
  if (craft) {
    return { materials: craft[1].trim(), result: craft[2].trim() };
  }
  return null;
}

function stepsToFusionTable(steps, headers = ["Input A", "Input B", "Result"]) {
  const rows = steps
    .map(parseFusionStep)
    .filter((row) => row && row.a && row.b && row.result);
  if (!rows.length) return "";
  const lines = [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((r) => `| ${r.a} | ${r.b} | ${r.result} |`),
  ];
  return lines.join("\n");
}

function stepsToSummonTable(steps) {
  const rows = steps
    .map(parseFusionStep)
    .filter((row) => row && row.result && row.materials && !row.a);
  if (!rows.length) return "";
  const lines = [
    "| Monster | Materials |",
    "| --- | --- |",
    ...rows.map((r) => `| ${r.result} | ${r.materials} |`),
  ];
  return lines.join("\n");
}

function stepsToCraftTable(steps) {
  const rows = steps
    .map((step) => {
      const match = stripTicks(step).match(
        /^Combine\s+(.+?)\s+to create\s+(.+?)\.?$/i
      );
      if (!match) return null;
      return { materials: match[1].trim(), result: match[2].trim() };
    })
    .filter(Boolean);
  if (!rows.length) return "";
  const lines = [
    "| Materials | Output |",
    "| --- | --- |",
    ...rows.map((r) => `| ${r.materials} | ${r.result} |`),
  ];
  return lines.join("\n");
}

function stepsToList(steps) {
  return steps
    .filter((s) => s && !/^\[TBD/i.test(s))
    .map((s) => `- ${s.replace(/^(\d+\.\s*)/, "")}`)
    .join("\n");
}

/** Match lib/utils slugify — used for in-page #anchor links */
function headingId(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function jumpToSection(items) {
  const lines = items.flatMap((item) => {
    if (typeof item === "string") {
      return [`- [${item}](#${headingId(item)})`];
    }
    const { title, children = [] } = item;
    return [
      `- [${title}](#${headingId(title)})`,
      ...children.map((c) => `  - [${c}](#${headingId(c)})`),
    ];
  });
  return `## Jump to\n\n${lines.join("\n")}\n`;
}

function leafBySlug(data, slug) {
  return data.leafGuides.find((leaf) => leaf.slug === slug);
}

function inlineSteps(page) {
  const steps = page?.content?.steps || [];
  return steps
    .map((s, i) => `${i + 1}. ${stripTicks(s)}`)
    .join("\n");
}

function buildHub(data) {
  const desert = data.hub.inlinePages.find(
    (p) => p.slug === "desert-progression-and-telepathy-gloves"
  );
  const mausoleum = data.hub.inlinePages.find(
    (p) => p.slug === "mausoleum-dungeon-walkthrough"
  );

  const body = `Monster alchemy creature-collector — still **Early Access**. This hub = **my EA route** from Marlo Town through Necromancer unlock and the tower crafting loop.

${fig(IMG.startMenu, "Monster Alchemy title screen", "Start menu")}
${fig(IMG.startMonsterChoosing, "Choose your starter monster", "Starter monster select")}

> **Note:** Some recipe mats still incomplete in EA. I mark TBD where I not verify yet.

## Route overview

- **Marlo Town** — **Telepathy Gloves** unlock west exit (Pokémon-style gate)
- **Western Desert** — Lv **18+**; farm before Mausoleum
- **Mausoleum** — six floors → **[Vampire Adapt](/monster-alchemy/vampire-adapt-boss-fight)** boss
- **Necromancer** — post-boss ritual; **Circle of Necromancy** = **10 iron bars**
- **Alchemist Tower loop** — [Recipes](/monster-alchemy/recipes) → [Fusion](/monster-alchemy/fusion-recipes) → mutations

## Marlo Town and Western Desert

${stripTicks(desert?.content?.summary || "Telepathy Gloves open the western path.")}

${desert?.content?.steps
    ?.slice(0, 6)
    .map((s, i) => `${i + 1}. ${stripTicks(s)}`)
    .join("\n")}

> **Tip:** I not rush Mausoleum under-leveled. Desert enemies still hurt if you skip farming.

Side puzzle (optional): [Bone Trail](/monster-alchemy/bone-trail-puzzle) near **Roaring Mount**.

${fig(IMG.marloTownTowerMap, "Marlo Town region — Alchemist Tower map pin", "Marlo Town — tower location")}
${fig(IMG.questFindAlchemist, "Find the Alchemist quest", "Quest — Find the Alchemist")}
${fig(IMG.shop, "Shop in Marlo Town", "Marlo Town shop")}
${fig(IMG.dashtPlateauTowerMap, "Dasht Plateau — Alchemist Tower map pin", "Western Desert — Dasht Plateau tower")}
${fig(IMG.baLhaBridgeMap, "Ba-lha Bridge region map", "Ba-lha Bridge area")}
${fig(IMG.uncannyValleyTowerMap, "Uncanny Valley — Alchemist Tower map pin", "Uncanny Valley tower")}
${fig(IMG.pondVillageTowerMap, "Pond Village — Alchemist Tower map pin", "Pond Village tower")}
${fig(IMG.sythelTowerMap, "Sythel — Alchemist Tower map pin", "Sythel tower")}
${fig(IMG.questRecoverArtifact, "Recover the Artifact quest", "Quest — Recover the Artifact")}
${fig(IMG.questStrangeIdea, "Strange Idea quest", "Quest — Strange Idea")}
${fig(IMG.alchemistTower, "Alchemist Tower interior hub", "Alchemist Tower")}

## Mausoleum Dungeon

${stripTicks(mausoleum?.content?.summary || "Six floors — keys, recruits, scheduled fights, boss.")}

${inlineSteps(mausoleum)}

Boss details: [Vampire Adapt](/monster-alchemy/vampire-adapt-boss-fight) — **not burn-immune**. I use **Bubble Blast** + burn skills.

### Floor maps (F1–F5)

${fig(IMG.mausoleumF1, "Mausoleum dungeon floor 1 map", "Floor 1")}
${fig(IMG.mausoleumF2, "Mausoleum dungeon floor 2 map", "Floor 2")}
${fig(IMG.mausoleumF3, "Mausoleum dungeon floor 3 map", "Floor 3")}
${fig(IMG.mausoleumF3Key, "Mausoleum floor 3 key pickup location", "Floor 3 — key location")}
${fig(IMG.mausoleumF4, "Mausoleum dungeon floor 4 map", "Floor 4")}
${fig(IMG.mausoleumF5, "Mausoleum dungeon floor 5 map", "Floor 5")}

> **Tip:** Floor 6 = boss room. No map needed — enter and **go straight up**; you hit [Vampire Adapt](/monster-alchemy/vampire-adapt-boss-fight) immediately.

## After Vampire Adapt — Necromancer

Boss drops: **Blood**, **Black Wood**, **Iron**, **Shadow Fragment**, **Necromancer robes**. Finish initiation ritual → **Necromancer** class.

Back at **Alchemist Tower**:

1. Build **Circle of Necromancy** — **10 iron bars**
2. Unlock undead recipes — see [Recipes — Necromancy](/monster-alchemy/recipes#circle-of-necromancy)
3. Set up **Circle of Summoning**, **Chimeric Chamber**, **The Cauldron** as mats come in

${fig(IMG.circleOfNecromancy, "Circle of Necromancy room build", "Circle of Necromancy")}
${fig(IMG.towerManager, "Tower Manager — assign rooms and monsters", "Tower Manager")}
${fig(IMG.assignedMonsters, "Assigned monsters roster in tower", "Assigned monsters")}
${fig(IMG.monsterManager, "Monster Manager screen", "Monster Manager")}

## Leaf guides

| Topic | Page |
| --- | --- |
| All recipes | [All Recipes List](/monster-alchemy/recipes) |
| All fusion | [All Fusion List](/monster-alchemy/fusion-recipes) |
| Mutations | [All Mutations List](/monster-alchemy/mutations-reference) |
| Mausoleum boss | [Vampire Adapt](/monster-alchemy/vampire-adapt-boss-fight) |
| Desert puzzle | [Bone Trail Puzzle](/monster-alchemy/bone-trail-puzzle) |

## EA gaps (what I still miss in current build)

- **Bone Trail reward** — puzzle works, loot TBD
- Some **Necromancy mats** — names known, full costs incomplete

## What I wait for — Luca take on the roadmap

No final story in EA yet. Devs posted a phased roadmap — below is **what I personally wait for**, not their full patch notes.

### Phase 1

- **The Forge** — gear on monsters with custom effects like a second passive. I want this; right now power = fusion + mutations only.
- **QoL** — type / tier / mutation filters, control rebind, smoother menus. My roster already too big without search.
- **Quest tab + world wrap-up** — main vs side tags, map pins, Coliseum emblems. Plus finish EA zone and **two new zones** with a **major city** and **Coliseum**.

### Phase 2

- **Tech summoning** + **Energy-type generic fusions** — new roster path. Energy treated as Neutral today feels off.
- **Tower upgrade** — room assignment passives by element/type. Assignment should do more than labor stats.
- **New tower UI** — quick room hops instead of walking every floor.
- **Three new zones** with **branching paths** you can tackle in any order.

### Phase 3

- **Skill Trainer** — consumables teach skills; **one custom skill slot** per monster. Real team-building depth.
- **Tier 3 generic fusions** fixed — two T3 parents should stay T3, not drop to T2.
- **World continuation** from Phase 2 branches plus **two more Coliseums**.

### Phase 4

- **Soul Distiller** — monsters into gems; move passives to other creatures. Endgame crafting I already theory-craft in my head.
- **Final story zones + postgame start** — this is where I expect the **main ending** and what comes after, not just another floor in Mausoleum.

When those patches land, I update this hub and the list pages first.`;

  writeGuide({
    slug: "hub",
    type: "hub",
    title: "Monster Alchemy Guide: Recipes, Fusion, Mutations, Map and etc",
    description:
      "EA route — Marlo Town, Western Desert, Mausoleum, Vampire Adapt, Necromancer unlock, and Alchemist Tower crafting.",
    quickAnswer:
      "Telepathy Gloves → desert Lv18+ → Mausoleum → Vampire Adapt (burn) → Necromancer + Circle of Necromancy (10 iron bars).",
    image: IMG.feature,
    body,
  });
}

function buildBossLeaf(leaf) {
  const body = `Mausoleum final boss on floor 6. Blocks **Necromancer** initiation until dead.

**Route:** Enter F6 and **go straight up** — boss is right there. No maze, no key hunt on this floor.

**Weakness:** not burn-immune — fire skills work. I use **Bubble Blast** plus any burn inflict.

**Drops:** Blood, Black Wood, Iron, Shadow Fragment, Necromancer robes.

${fig(IMG.bossVampireAdept, "Vampire Adapt boss fight in the Mausoleum", "Vampire Adapt boss")}
${fig(IMG.basicAttack, "Basic attack in combat", "Combat — basic attack")}

## Fight steps

${stepsToList(leaf.steps)}

> **Tip:** Heal party before entering. Boss room is point of no return for the run.

Hub route: [Mausoleum section](/monster-alchemy#mausoleum-dungeon).`;

  writeGuide({
    slug: leaf.slug,
    title: "Vampire Adapt Boss Fight",
    description: "Mausoleum floor 6 boss — burn weakness, drops, and Necromancer ritual gate.",
    topic: "boss",
    quickAnswer: leaf.quickAnswer,
    body,
  });
}

function buildPuzzleLeaf(leaf) {
  const body = `Desert puzzle near **Roaring Mount**. Follow colored bones — repeat the action **11 times**.

## Steps

${stepsToList(leaf.steps)}

> **Note:** Exact reward still **TBD** in my run notes. Puzzle solution is confirmed; loot is not.

Side route from [Western Desert](/monster-alchemy#marlo-town-and-western-desert) — do after Telepathy Gloves, before or after Mausoleum prep.`;

  writeGuide({
    slug: leaf.slug,
    title: "Bone Trail Puzzle",
    description: "Roaring Mount bone trail — colored start bone, repeat action 11 times.",
    topic: "puzzle",
    quickAnswer: leaf.quickAnswer,
    body,
  });
}

function buildFusionLeaf(data) {
  const mechanics = leafBySlug(data, "chimeric-chamber-fusion-mechanics");
  const monsterBin = leafBySlug(data, "monster-fusion-recipes");
  const tier1 = leafBySlug(data, "tier-1-fusion-recipes");
  const tier2 = leafBySlug(data, "tier-2-fusion-recipes");
  const extra = leafBySlug(data, "additional-fusion-recipes");

  const binTable = stepsToFusionTable(
    (monsterBin?.steps || []).filter((s) => /^Combine/i.test(s))
  );
  const binNotes = (monsterBin?.steps || [])
    .filter((s) => s.includes("tier progression"))
    .map((s) => `- ${stripTicks(s)}`)
    .join("\n");

  const body = `Two fusion systems at **Alchemist Tower** — **Monster Bin** (essences + base monsters) and **Chimeric Chamber** (two monsters → new creature). This page = **full fusion list** for both.

Need mats first? See [Recipes](/monster-alchemy/recipes). Mutation rerolls on Chimeric fuse — [Mutations](/monster-alchemy/mutations-reference).

${jumpToSection([
    "Chimeric Chamber — how it works",
    "Monster Types — quick reference",
    "Monster Bin recipes",
    "Chimeric Chamber — Tier 1",
    "Chimeric Chamber — Tier 2",
    "Chimeric Chamber — additional",
  ])}

${fig(IMG.chimericChamber, "Chimeric Chamber fusion room in the tower", "Chimeric Chamber")}
${fig(IMG.createMonsters, "Create Monsters — Monster Bin crafting", "Monster Bin / Create Monsters")}

## Chimeric Chamber — how it works

${stepsToList(mechanics?.steps || [])}

${MONSTER_TYPES_QUICK_REFERENCE}

> **Tip:** No named combo match? Game falls back to **shared element type** of both parents — use the tables above to see what that means for your weapon and tier.

## Monster Bin recipes

${binTable || stepsToList(monsterBin?.steps || [])}

${binNotes ? `\n**Note:** ${binNotes.replace(/^- /, "")}\n` : ""}

## Chimeric Chamber — Tier 1

${stepsToFusionTable(tier1?.steps || [])}

## Chimeric Chamber — Tier 2

${stepsToFusionTable(tier2?.steps || [])}

## Chimeric Chamber — additional

${stepsToFusionTable(extra?.steps || [])}

> **Tip:** Two **Slime** in Monster Bin still gives Tier 1 Slime — I use that for mutation reroll tests.`;

  writeGuide({
    slug: "fusion-recipes",
    title: "Monster Alchemy — All Fusion List",
    description:
      "Monster Bin and Chimeric Chamber — mechanics plus complete Tier 1, Tier 2, and additional fusion tables.",
    topic: "collectibles",
    quickAnswer:
      "Monster Bin essences + Chimeric Chamber monster pairs — full EA fusion tables in one page.",
    body,
  });
}

function buildRecipesLeaf(data) {
  const cauldron = leafBySlug(data, "cauldron-recipes");
  const summoning = leafBySlug(data, "circle-of-summoning-recipes");
  const necromancy = leafBySlug(data, "necromancy-recipes");

  const cauldronTable = stepsToCraftTable(cauldron?.steps || []);
  const summonTable = stepsToSummonTable(
    (summoning?.steps || []).filter((s) => s.startsWith("Summon"))
  );

  const body = `All **Alchemist Tower crafting** on one page — **Cauldron** essences, **Circle of Summoning** spawns, **Circle of Necromancy** undead unlocks. Feed cauldron outputs into summoning; fuse results in [Fusion Recipes](/monster-alchemy/fusion-recipes).

${jumpToSection([
    "The Cauldron",
    "Circle of Summoning",
    {
      title: "Circle of Necromancy",
      children: ["Unlock flow", "Recipe names (EA list)"],
    },
  ])}

${fig(IMG.recipesMenu, "Recipes menu in the Alchemist Tower", "Recipes menu")}

## The Cauldron

${cauldronTable || stepsToList(cauldron?.steps || [])}

> **Tip:** **Gooey Concentrate** and **Putrid Mixture** show up in almost every early summon — batch these first.

## Circle of Summoning

${summonTable || stepsToList(summoning?.steps || [])}

> **Tip:** **Ork** and **Brachillo** are material-heavy — stock Wood/Stone/Bone before batch summoning.

## Circle of Necromancy

Room build cost: **10 iron bars**. Unlock after [Vampire Adapt](/monster-alchemy/vampire-adapt-boss-fight) + Necromancer ritual.

${fig(IMG.circleOfNecromancy, "Circle of Necromancy room in the tower", "Circle of Necromancy build")}

### Unlock flow

${stepsToList(necromancy?.steps || [])}

### Recipe names (EA list)

| Recipe | Notes |
| --- | --- |
| **Banshee** | Materials TBD |
| **Skeleton Servant** | Tier 1; **+3 rage per bone army ally** at battle start |
| **Liquid Shadow** | Materials TBD |
| **Ritual Powder** | Materials TBD |

${fig(IMG.skeletonServant, "Skeleton Servant necromancy recipe screen", "Skeleton Servant recipe")}

> **Note:** Full necromancy material costs still incomplete in EA — I update when I verify.

Hub: [After Vampire Adapt](/monster-alchemy#after-vampire-adapt-necromancer).`;

  writeGuide({
    slug: "recipes",
    title: "Monster Alchemy — All Recipes List",
    description:
      "Cauldron essences, Circle of Summoning material table, and Circle of Necromancy undead recipes.",
    topic: "collectibles",
    quickAnswer:
      "Cauldron → Summoning → Necromancy — all crafting and summon recipes on one page.",
    body,
  });
}

function buildMutationsLeaf(data) {
  const overview = leafBySlug(data, "mutation-types-and-stat-effects");

  const body = `Mutations = rare monster variants. **Hollow** and **Spectral** are among the rarest. Repeat-craft same monster to raise mutation odds. Fusion rerolls mutation too — see [Fusion Recipes](/monster-alchemy/fusion-recipes).

${jumpToSection(["General rules", "Mutation stat table"])}

## General rules

${stepsToList(overview?.steps || [])}

> **Tip:** Most mutations shift stats around **±25%**. **Gigantic** and **Hollow** break that pattern — check table below before you fuse away a good roll.

## Mutation stat table

Percent modifiers from in-game mutation sheet — empty cell = no change for that stat.

${MUTATION_STAT_TABLE}

> **Note:** **Corrupted** / **Mystic** = upper-tier mutation group in sheet. **Tiny** = small-size variant (same row as old community "Mini" notes).`;

  writeGuide({
    slug: "mutations-reference",
    title: "Monster Alchemy — All Mutations List",
    description:
      "Mutation rules plus full stat table — Corrupted, Mystic, Gigantic, Tiny, Nocturnal, Spectral, Hollow.",
    topic: "collectibles",
    quickAnswer:
      "Seven mutations with STR/DEF/MIND/SOUL/AGI/Work/HP percent modifiers — Hollow and Spectral among the rarest.",
    body,
  });
}

const OBSOLETE_LEAVES = [
  "chimeric-chamber-fusion.md",
  "monster-bin-fusion-recipes.md",
  "necromancy-recipes.md",
  "circle-of-summoning-recipes.md",
  "cauldron-recipes.md",
];

function main() {
  if (!fs.existsSync(JSON_PATH)) {
    console.error("Missing JSON:", JSON_PATH);
    process.exit(1);
  }
  const data = JSON.parse(fs.readFileSync(JSON_PATH, "utf-8"));
  fs.mkdirSync(DIR, { recursive: true });

  buildHub(data);
  buildBossLeaf(leafBySlug(data, "vampire-adapt-boss-fight"));
  buildPuzzleLeaf(leafBySlug(data, "bone-trail-puzzle"));
  buildFusionLeaf(data);
  buildRecipesLeaf(data);
  buildMutationsLeaf(data);

  for (const file of OBSOLETE_LEAVES) {
    const filePath = path.join(DIR, file);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  const outputs = [
    "hub.md",
    "vampire-adapt-boss-fight.md",
    "bone-trail-puzzle.md",
    "fusion-recipes.md",
    "recipes.md",
    "mutations-reference.md",
  ];
  console.log("Wrote", outputs.length, "guides to", DIR);
  outputs.forEach((f) => console.log(" ", f));
}

main();
