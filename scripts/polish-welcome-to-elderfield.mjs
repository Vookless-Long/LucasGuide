/**
 * Polish Welcome to Elderfield export → LucasGuide (merge themes, Luca voice).
 * Run: node scripts/polish-welcome-to-elderfield.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GAME = "welcome-to-elderfield";
const DIR = path.join(__dirname, "..", "guides", GAME);
const HUB_SOURCE = "welcome-to-elderfield-walkthrough-guide-hub-my-full-route-fr.md";

const MERGES = {
  "boss-fights-and-elites": {
    title: "Boss Fights and Elites",
    description:
      "Uzumak, Treasure Goblin, and Dripper — where they spawn, combat patterns, and rewards.",
    quickAnswer:
      "Uzumak: heavy attacks, heal below 40% HP, save MP. Treasure Goblin: Hans Farm debris pile — loot fast. Dripper: sewers elite — flee if cursed or low on food.",
    topic: "boss",
    intro:
      "Three fights that punish lazy prep. Farm isn't the hard part — walking into these with stacked curses or empty MP is.",
    sources: [
      ["boss-fight-uzumak-in-the-laundry-room", "Uzumak — Laundry Room"],
      ["treasure-goblin-fight", "Treasure Goblin — Hans Farm"],
      ["dripper-encounter", "Dripper — Sewers"],
    ],
  },
  "moon-events": {
    title: "Moon Events",
    description: "Blood Moon, Strange Moon, and Night Terrors — what resets and what to skip.",
    quickAnswer:
      "Blood Moon resets mysteries and respawns monsters. Strange Moon = Dread (-10% Ability) all day — no bosses. Night Terrors = random curses on sleep — save first.",
    topic: "walkthrough",
    intro: "Calendar events that reset your work or debuff you overnight. Plan around them, not through them.",
    sources: [
      ["blood-moon-event", "Blood Moon"],
      ["strange-moon-event", "Strange Moon"],
      ["night-terrors-event", "Night Terrors"],
    ],
  },
  "blessings-and-curses": {
    title: "Blessings and Curses",
    description: "Stack rules, common buffs and debuffs, and Heavy Eyelids EXP penalty.",
    quickAnswer:
      "±10% per stack, max 5. Check status before every boss door. Heavy Eyelids = -15% EXP until you sleep — bathing won't clear it.",
    topic: "walkthrough",
    intro: "Elderfield runs on stacked ±10% effects. Boss doors without a status check = free reset.",
    sources: [
      ["blessings-and-curses-overview", "Overview"],
      ["common-blessings", "Common Blessings"],
      ["common-curses", "Common Curses"],
      ["heavy-eyelids-status-effect", "Heavy Eyelids"],
    ],
  },
  "ritual-skills-reference": {
    title: "Ritual Skills Reference",
    description: "Every ritual — where to find Energy Blast, Pumpkin Blast, Ghost Blast, Warp, and more.",
    quickAnswer:
      "Start with Energy Blast + Guard. Priority grabs: Pumpkin Blast (Old Woods), Ghost Blast (Pete), Chaos Thorns (Sewers), Warp (Mall), Dark Shield (Mall F1).",
    topic: "collectibles",
    intro:
      "Rituals are not optional. You start weak — hunt chamber doors, braziers, and vending tomes before mid-game fights.",
    sources: [
      ["ritual-skills-overview", "Overview"],
      ["old-ritual-brazier", "Old Ritual Brazier"],
      ["energy-blast", "Energy Blast"],
      ["pumpkin-blast", "Pumpkin Blast"],
      ["ghost-blast", "Ghost Blast"],
      ["dark-blast", "Dark Blast"],
      ["dark-shield", "Dark Shield"],
      ["energizing-blast", "Energizing Blast"],
      ["chaos-thorns", "Chaos Thorns"],
      ["warp", "Warp"],
    ],
  },
  "god-rooms": {
    title: "God Rooms",
    description: "Rooms of Daeus, Gatis, Nezroth, and Delvek — keys, routes, and loot.",
    quickAnswer:
      "Daeus (Mall) easiest first. Nezroth + Delvek on Mall mine L2 — Delvek appears after Nezroth reset. Gatis needs Penpals task + Brittany.",
    topic: "collectibles",
    intro: "Treasure rooms for Old One followers. Pick the deity whose loot fits your build — one at a time.",
    sources: [
      ["room-of-daeus", "Room of Daeus"],
      ["room-of-gatis", "Room of Gatis"],
      ["room-of-nezroth", "Room of Nezroth"],
      ["room-of-delvek", "Room of Delvek"],
    ],
  },
  "cooking-and-crafting": {
    title: "Cooking and Crafting",
    description: "Recipes, Vegetable Soup, furnace smelting, farm upgrades, and container crafting.",
    quickAnswer:
      "Vegetable Soup = best early heal. Molly's Furnace unlocks bronze bars. Upgrade Hoe/Watering Can early. Craft from containers to skip inventory shuffle.",
    topic: "walkthrough",
    intro: "Food keeps you alive in mines. Furnace turns ore into gear. Farm tools are progression gates, not luxuries.",
    sources: [
      ["cooking-and-recipes", "Cooking and Recipes"],
      ["early-game-cooking-vegetable-soup", "Vegetable Soup"],
      ["smelting-bronze-bars", "Smelting Bronze Bars"],
      ["crafting-station-and-farming-upgrades", "Farm and Crafting Upgrades"],
      ["crafting-from-containers", "Crafting from Containers"],
    ],
  },
};

const STANDALONE = {
  "foraging-and-resource-collection": {
    title: "Foraging and Resource Collection",
    topic: "collectibles",
  },
  "key-locations": {
    title: "Key Locations",
    topic: "walkthrough",
  },
  "passcode-lock": {
    title: "Passcode Lock — Dave's House",
    topic: "puzzle",
  },
  "mall-vending-machine-tomes": {
    title: "Mall Vending Machine Tomes",
    topic: "collectibles",
  },
  "small-god-shrine-prayer": {
    title: "Small God Shrine Prayer",
    topic: "walkthrough",
  },
  "emerald-ring-from-smoffes": {
    title: "Emerald Ring from Smoffes",
    topic: "collectibles",
  },
  "treasure-map-3-from-alice": {
    title: "Treasure Map 3 from Alice",
    topic: "collectibles",
  },
  "inventory-upgrade-spare-bag": {
    title: "Inventory Upgrade — Spare Bag",
    topic: "walkthrough",
  },
};

const LINK_TARGETS = [
  [/boss-fight-uzumak|uzumak|laundry boss|junji/i, "boss-fights-and-elites"],
  [/treasure.goblin|hans.farm.ambush/i, "boss-fights-and-elites"],
  [/dripper/i, "boss-fights-and-elites"],
  [/blood.moon/i, "moon-events"],
  [/strange.moon/i, "moon-events"],
  [/night.terror/i, "moon-events"],
  [
    /blessings.and.curses|common.blessings|common.curses|heavy.eyelids|status.effect/i,
    "blessings-and-curses",
  ],
  [
    /ritual.skills|energy.blast|pumpkin.blast|ghost.blast|dark.blast|dark.shield|energizing.blast|chaos.thorns|old.ritual.brazier|^warp/i,
    "ritual-skills-reference",
  ],
  [/room.of|room-of-|god.of.the.moon|god.of.flesh|god.of.mysteries|daeus|gatis|nezroth|delvek/i, "god-rooms"],
  [
    /cooking.and.recipes|vegetable.soup|smelting.bronze|crafting.from.containers|crafting.station|farming.upgrade/i,
    "cooking-and-crafting",
  ],
  [/foraging|resource.collection/i, "foraging-and-resource-collection"],
  [/key.locations|three.keys/i, "key-locations"],
  [/passcode|dave.s.house/i, "passcode-lock"],
  [/vending.machine|mall.vending/i, "mall-vending-machine-tomes"],
  [/small.god.shrine|shrine.prayer/i, "small-god-shrine-prayer"],
  [/emerald.ring|smoffes/i, "emerald-ring-from-smoffes"],
  [/treasure.map.3|alice/i, "treasure-map-3-from-alice"],
  [/spare.bag|inventory.upgrade/i, "inventory-upgrade-spare-bag"],
];

const OUTPUT_SLUGS = new Set([
  ...Object.keys(MERGES),
  ...Object.keys(STANDALONE),
  "hub",
]);

function cleanTitle(h1) {
  return h1
    .replace(/^#+\s*/, "")
    .replace(/:\s*How I .*$/i, "")
    .replace(/\s*—\s*How I .*$/i, "")
    .replace(/\s*in Welcome to Elderfield.*$/i, "")
    .replace(/^Welcome to Elderfield\s+/i, "")
    .trim();
}

function extractQuickAnswer(body) {
  const m = body.match(/^### Quick Answer\s*\n+([\s\S]*?)(?=\n### |\n## |\n---<\[|$)/m);
  if (!m) return { body, quickAnswer: "" };
  const lines = m[1]
    .split("\n")
    .map((l) => l.replace(/^[-*\d.]+\s*/, "").trim())
    .filter(Boolean)
    .filter((l) => !l.startsWith("|") && l !== "---");
  return {
    body: body.replace(m[0], "\n"),
    quickAnswer: lines.slice(0, 4).join(" ").replace(/\*\*/g, "").slice(0, 280),
  };
}

function resolveLink(haystack) {
  for (const [re, slug] of LINK_TARGETS) {
    if (re.test(haystack)) return slug;
  }
  return null;
}

function fixLinks(text) {
  let out = text.replace(/\]\(\.\/([^)\n]+)\)/g, (_, link) => {
    const slug = resolveLink(link);
    if (slug) return `](/${GAME}/${slug})`;
    return `](/${GAME})`;
  });
  out = out.replace(/\]\(\.\/([^)\n]+)\n([^)]+)\)/g, (_, a, b) => {
    const slug = resolveLink(a + b);
    if (slug) return `](/${GAME}/${slug})`;
    return `](/${GAME})`;
  });
  return out;
}

function condenseBody(text) {
  return (
    text
      .replace(/---<\[[^>]+>---/g, "")
      .replace(/### Screenshot cues[\s\S]*$/m, "")
      .replace(/### Common Mistakes[\s\S]*?(?=\n### |\n## |$)/gm, "")
      .replace(/### What I(?:'d| would) Do Differently[\s\S]*?(?=\n### |\n## |$)/gm, "")
      .replace(/### Final Verdict[\s\S]*?(?=\n### |\n## |$)/gm, "")
      .replace(/### Why This Lock Trips People Up[\s\S]*?(?=\n### Step)/m, "")
      .replace(/Thanks for reading[^\n]*\n?/gi, "")
      .replace(/Good luck[^\n]*\n?/gi, "")
      .replace(/I keep updating[^\n]*\n?/gi, "")
      .replace(/\[TBD: passcode\]/g, "TBD")
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  );
}

function readSource(slug) {
  const base = slug.replace(/\.md$/, "");
  const file = path.join(DIR, `${base}.md`);
  if (!fs.existsSync(file)) {
    console.warn(`Missing source: ${base}.md`);
    return "";
  }
  return fs.readFileSync(file, "utf-8");
}

function extractSectionBody(raw) {
  let body = raw.replace(/^#\s+.+\n+/, "");
  const { body: stripped } = extractQuickAnswer(body);
  body = condenseBody(stripped);
  body = fixLinks(body);
  body = body.replace(/^## /gm, "### ");
  return body.trim();
}

function writeGuide({ slug, title, description, topic, quickAnswer, body }) {
  const fm = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
game: ${GAME}
slug: ${slug}
topic: ${topic}
date: "2026-09-12"
updated: "2026-09-12"
quickAnswer: "${(quickAnswer || title).replace(/"/g, '\\"').replace(/\n/g, " ")}"
---

# ${title}

${body.trim()}
`;
  fs.writeFileSync(path.join(DIR, `${slug}.md`), `${fm.trim()}\n`, "utf-8");
}

function buildMerged(slug, config) {
  const sections = config.sources
    .map(([src, heading]) => {
      const raw = readSource(src);
      if (!raw) return "";
      const body = extractSectionBody(raw);
      return `## ${heading}\n\n${body}`;
    })
    .filter(Boolean)
    .join("\n\n");

  writeGuide({
    slug,
    title: config.title,
    description: config.description,
    topic: config.topic,
    quickAnswer: config.quickAnswer,
    body: `${config.intro}\n\n${sections}`,
  });
}

function buildStandalone(slug, meta) {
  const raw = readSource(slug);
  if (!raw) return;
  const h1 = raw.match(/^#\s+(.+)/m);
  const title = meta.title || cleanTitle(h1?.[1] ?? slug);
  let body = raw.replace(/^#\s+.+\n+/, "");
  const { body: stripped, quickAnswer } = extractQuickAnswer(body);
  body = condenseBody(stripped);
  body = fixLinks(body);

  const firstPara = body.split("\n\n")[0]?.slice(0, 200) ?? title;
  writeGuide({
    slug,
    title,
    description: `Luca's route for ${title.toLowerCase()} in Welcome to Elderfield.`,
    topic: meta.topic ?? "walkthrough",
    quickAnswer: quickAnswer || firstPara,
    body,
  });
}

function buildHub() {
  const raw = readSource(HUB_SOURCE);
  let body = raw.replace(/^#\s+.+\n+/, "");
  const { body: stripped, quickAnswer } = extractQuickAnswer(body);
  body = condenseBody(stripped);
  body = fixLinks(body);

  body = body.replace(
    /Welcome to Elderfield is one of those games[\s\S]*?before the game expects them\.\n+/i,
    ""
  );
  body = body.replace(/### How I Approach the Opening Hours[\s\S]*?first ten minutes\.\n+/i, "");
  body = body.replace(/### What I Would Tell a New Player[\s\S]*$/i, "");
  body = body.replace(/### Side Content Worth Grabbing[\s\S]*?### What I Would Tell/i, "");

  const intro = `Cozy farm horror — until you realize the farm is the **main quest timer**. Every crop weakens the Zartekch seal under Hans Farm. Most players stall in week two because they treat it like Stardew and ignore the shrine thread.

This hub = **full linear route** Prologue → first Blood Moon. Leaf pages only where systems actually block you.

## Route order

- **Prologue** — Character creation, Old Woods tutorial fight
- **First night** — Bath, sleep, pizza recipe, journal note
- **Hans Farm** — Farming loop starts, shrine seal explained
- **Mines** — Molly, Pickaxe, Furnace, [bronze smelting](/${GAME}/cooking-and-crafting)
- **Library** — Professor Dayton, Zartekch lore
- **Mall / Sewers** — Pete, god shrines, [Ghost Blast](/${GAME}/ritual-skills-reference)
- **Residential** — Adrian's key, mall back offices
- **Mid-game** — [God rooms](/${GAME}/god-rooms), [key locations](/${GAME}/key-locations), Joggers Club
- **Events** — [Moon events](/${GAME}/moon-events) (Blood / Strange / Night Terrors)
- **Combat** — [Boss fights](/${GAME}/boss-fights-and-elites) when ready

## Leaf guides

| Topic | Page |
| --- | --- |
| Boss fights | [Uzumak, Goblin, Dripper](/${GAME}/boss-fights-and-elites) |
| Moon events | [Blood / Strange / Night Terrors](/${GAME}/moon-events) |
| Blessings & curses | [Stack rules + lists](/${GAME}/blessings-and-curses) |
| Rituals | [Full reference](/${GAME}/ritual-skills-reference) |
| God rooms | [Daeus, Gatis, Nezroth, Delvek](/${GAME}/god-rooms) |
| Cooking & crafting | [Food, furnace, farm tools](/${GAME}/cooking-and-crafting) |
| Foraging | [Herbs and materials](/${GAME}/foraging-and-resource-collection) |
| Keys | [All 3 keys](/${GAME}/key-locations) |
| Side pickups | [Spare bag](/${GAME}/inventory-upgrade-spare-bag), [Emerald Ring](/${GAME}/emerald-ring-from-smoffes), [Alice map](/${GAME}/treasure-map-3-from-alice), [Mall tomes](/${GAME}/mall-vending-machine-tomes), [Shrine prayer](/${GAME}/small-god-shrine-prayer), [Dave passcode](/${GAME}/passcode-lock) |

---

`;

  const fm = `---
type: hub
title: "Welcome to Elderfield Walkthrough — Luca's Full Route"
description: "Linear route from Prologue to Blood Moon — farm seal, rituals, god rooms, moon events, and boss fights."
game: ${GAME}
date: "2026-09-12"
updated: "2026-09-12"
quickAnswer: "${(quickAnswer || "Farm weakens Zartekch seal → Molly Furnace → god shrines → god rooms → survive moon events.").replace(/"/g, '\\"').replace(/\n/g, " ")}"
---

`;

  fs.writeFileSync(
    path.join(DIR, "hub.md"),
    `${fm}${intro}${body.trim()}\n\n---\n\nStuck on one system = leaf page from the table above.\n`,
    "utf-8"
  );
}

function cleanup() {
  for (const file of fs.readdirSync(DIR)) {
    if (!file.endsWith(".md")) continue;
    const slug = file.replace(/\.md$/, "");
    if (OUTPUT_SLUGS.has(slug)) continue;
    if (file.endsWith(".zip")) continue;
    fs.unlinkSync(path.join(DIR, file));
  }
  try {
    fs.unlinkSync(path.join(DIR, "README.md"));
  } catch {
    /* optional */
  }
}

for (const [slug, config] of Object.entries(MERGES)) {
  buildMerged(slug, config);
}

for (const [slug, meta] of Object.entries(STANDALONE)) {
  buildStandalone(slug, meta);
}

buildHub();
cleanup();

console.log(`Polished Welcome to Elderfield — ${OUTPUT_SLUGS.size - 1} leaf pages + hub`);
