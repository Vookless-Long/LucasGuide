/**
 * Polish Titanic Escape Simulator export → LucasGuide (Luca voice, filtered screenshot cues).
 * Run: node scripts/polish-titanic-escape.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GAME = "titanic-escape-simulator";
const DIR = path.join(__dirname, "..", "guides", GAME);

const SKIP = new Set(["README.md", "hub.md"]);

const HUB_FILE = "titanic-escape-simulator-walkthrough-guide-hub-my-full-chapt.md";

const TOPIC_MAP = {
  achievements: "collectibles",
  final: "walkthrough",
  ending: "walkthrough",
  confrontation: "boss",
  confront: "boss",
  steam: "puzzle",
};

function guessTopic(slug) {
  for (const [key, topic] of Object.entries(TOPIC_MAP)) {
    if (slug.includes(key)) return topic;
  }
  return "walkthrough";
}

function cleanTitle(h1) {
  return h1
    .replace(/^#+\s*/, "")
    .replace(/:\s*My (Exact|Full).*$/i, "")
    .replace(/\s*—\s*My .*$/i, "")
    .replace(/\s*in Titanic Escape Simulator.*$/i, "")
    .replace(/^My Final Ending Choices Guide:\s*/i, "")
    .replace(/^Titanic Escape Simulator Achievements List:\s*/i, "")
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
    quickAnswer: lines.slice(0, 3).join(" ").replace(/\*\*/g, "").slice(0, 280),
  };
}

function fixLinks(text) {
  const slugFrom = (link) =>
    link
      .replace(/\.md$/, "")
      .replace(/-my-exact.*$/i, "")
      .replace(/-every-trophy-and-.*$/i, "")
      .replace(/-guide-how-to-unlock-all-three-titani.*$/i, "")
      .replace(/^titanic-escape-simulator-achievements-list.*/, "achievements-list")
      .replace(/^my-final-ending-choices.*/, "final-ending-choices")
      .replace(/^chapter-\d+.*/, "")
      .split("/")
      .pop();

  let out = text.replace(/\]\(\.\/([^)]+)\)/g, (_, link) => {
    const slug = slugFrom(link);
    if (!slug || slug.startsWith("chapter-")) return `](/${GAME})`;
    return `](/${GAME}/${slug})`;
  });
  out = out.replace(/\]\(\.\/([^)\n]+)\n([^)]+)\)/g, (_, a, b) => {
    const slug = slugFrom(a + b);
    if (!slug || slug.startsWith("chapter-")) return `](/${GAME})`;
    return `](/${GAME}/${slug})`;
  });
  return out;
}

function parseCueMarker(match) {
  const inner = match.slice(4, -4).replace(/^\[|\]$/g, "");
  const parts = inner.split("|").map((p) => p.trim());
  const type = (parts[0] ?? "Scene").replace(/^\[|\]$/g, "");
  const name = (parts[1] ?? "scene").split("/")[0].trim();
  const times = (parts[2] ?? "").replace(/，/g, ", ");
  return { type, name, times };
}

function shouldKeepCue({ type, name }) {
  const n = name.toLowerCase();
  if (/lurket|兑换|game code|platform/i.test(n)) return false;
  if (/^(fox|jelle|adam|michael|jared|dan|jake|tim)$/i.test(name.trim())) return false;
  if (/^titanic$|^rms titanic$/i.test(n.replace(/\s+/g, " ").trim())) return false;
  if (/april 15|august 24|1912年|8月24/i.test(n)) return false;
  if (/three different endings/i.test(n)) return false;
  return true;
}

function cueHint({ type, name }) {
  const n = name.toLowerCase();
  if (n.includes("turkish bath")) {
    return "Show hot room door, barricade, and steam control panel on F Deck.";
  }
  if (n.includes("boiler room")) {
    return "Wide shot of Boiler Room Six — Graves area, tools on floor near entrance.";
  }
  if (n.includes("boat deck")) {
    return "Final confrontation — Rothvil, Eliza, and lifeboats visible on deck.";
  }
  if (n.includes("collapsible") || n.includes("lifeboat")) {
    return "Jammed collapsible boat and davit ropes (Ending 3 choice — cut ropes).";
  }
  if (n.includes("kensington") || n.includes("study") || n.includes("safe")) {
    return "Private study safe dial — code 033109 visible or entered.";
  }
  if (n.includes("cabin") || n.includes("c70")) {
    return "First-class cabin C70 — note from Sinclair on bed or desk.";
  }
  if (/graves/i.test(n)) {
    return "Graves in Boiler Room Six — dialogue, QTE, or shoot prompt.";
  }
  if (/rothvil/i.test(n)) {
    return "Rothvil on Boat Deck during ending choice.";
  }
  if (/harrington|eliza/i.test(n)) {
    return "Lady Harrington (Eliza) during Boat Deck ending branch.";
  }
  if (/bolt cutter/i.test(n)) {
    return "Bolt cutters on floor at Boiler Room Six entrance — pick up before Graves.";
  }
  if (/revolver/i.test(n)) {
    return "Revolver shoot prompt when reticle turns red (one shot on Graves).";
  }
  if (/033109|safe|puzzle/i.test(n)) {
    return "Safe or keypad showing code 033109 (Prologue).";
  }
  if (type === "Item") {
    return `Clear in-game view of **${name}** at this step.`;
  }
  if (type === "NPC") {
    return `**${name}** visible in scene — face or interaction prompt.`;
  }
  if (type === "Location") {
    return `Establishing shot of **${name}** so reader recognizes the area.`;
  }
  return "Capture the moment described in the step above.";
}

function exportCueToText(match) {
  const cue = parseCueMarker(match);
  if (!shouldKeepCue(cue)) return "";
  const hint = cueHint(cue);
  return `\n\n> **Screenshot cue:** ${cue.type} **${cue.name}** — video timestamps: ${cue.times}\n>\n> ${hint}\n\n`;
}

function convertExportCues(text) {
  return text.replace(/---<\[[^>]+>---/g, exportCueToText).replace(/\n{4,}/g, "\n\n\n");
}

function lucaPass(text) {
  return text
    .replace(/### Screenshot cues[\s\S]*$/m, "")
    .replace(/Thanks for reading[^\n]*\n?/gi, "")
    .replace(/Good luck[^\n]*\n?/gi, "")
    .replace(/Happy escaping[^\n]*\n?/gi, "")
    .replace(/^### /gm, "## ")
    .replace(/\n{4,}/g, "\n\n\n")
    .trim();
}

function processLeaf(file, raw) {
  const slug = file.replace(/\.md$/, "");
  const h1 = raw.match(/^#\s+(.+)/m);
  if (!h1) return;
  const title = cleanTitle(h1[1]);
  let body = raw.replace(/^#\s+.+\n+/, "");
  const { body: b2, quickAnswer } = extractQuickAnswer(body);
  body = lucaPass(fixLinks(convertExportCues(b2)));

  const fm = `---
title: "${title.replace(/"/g, '\\"')}"
description: "Luca's route for ${title.toLowerCase()} in Titanic Escape Simulator."
game: ${GAME}
slug: ${slug}
topic: ${guessTopic(slug)}
date: "2026-09-08"
updated: "2026-09-08"
quickAnswer: "${(quickAnswer || title).replace(/"/g, '\\"').replace(/\n/g, " ")}"
---

# ${title}

`;

  fs.writeFileSync(path.join(DIR, `${slug}.md`), `${fm}${body}\n`, "utf-8");
}

function processHub(raw) {
  let body = raw.replace(/^#\s+.+\n+/, "");
  const { body: b2, quickAnswer } = extractQuickAnswer(body);
  body = lucaPass(fixLinks(convertExportCues(b2)));

  body = body.replace(
    /I've played through Titanic Escape Simulator more times than I care to admit[\s\S]*?Let's break down the route\.\n+/i,
    ""
  );
  body = body.replace(
    /This guide is built as the "1" in a 1\+N structure[\s\S]*?Let's break down the route\.\n+/i,
    ""
  );
  body = body.replace(/Now let's dive into the full route\.\n+/i, "");
  body = body.replace(
    /That's the full walkthrough\.[\s\S]*?getting off that ship alive\.\n+/i,
    ""
  );

  const intro = `Titanic Escape Simulator looks like cozy period mystery — then it hits you with safe codes, Turkish bath steam puzzle, Graves in Boiler Room Six, and three endings on the Boat Deck.

This hub is my **full chapter route** London → sinking → final choice. Leaf pages only where people actually get stuck.

## Chapter order

- **Prologue — London:** Safe **033109**, boarding ticket, meet Graves
- **Chapter 1 — Southampton:** Board ship, steward Thomas, cabin **C70**
- **Chapter 2 — A-Deck:** Sinclair, Book of Thoth, crate **404**, murder
- **Chapter 3:** Captain access, cipher, find Mr. Pumble
- **Chapter 4 — Turkish Baths:** Ventilation clue, [steam room barricade](/${GAME}/steam-room-barricade-puzzle)
- **Chapter 5:** Brig escape, code **0404**, wireless room, [Graves fight](/${GAME}/confrontation-with-graves-in-boiler-room-six)
- **Chapters 6–7 — Sinking:** Flood escape to Boat Deck
- **Endings:** [Three final choices](/${GAME}/final-ending-choices) · [Achievements](/${GAME}/achievements-list)

---

`;

  const fm = `---
type: hub
title: "Titanic Escape Simulator Walkthrough — Luca's Full Route"
description: "Chapter-by-chapter route from London safe puzzle through Turkish baths, Graves, sinking escape, and all three Boat Deck endings."
game: ${GAME}
date: "2026-09-08"
updated: "2026-09-08"
quickAnswer: "${(quickAnswer || "Prologue safe 033109 → board Titanic → Turkish baths steam puzzle → Graves in Boiler Room Six → Boat Deck ending choice.").replace(/"/g, '\\"').replace(/\n/g, " ")}"
---

`;

  fs.writeFileSync(
    path.join(DIR, "hub.md"),
    `${fm}${intro}${body.trim()}\n\n---\n\nStuck on one puzzle = leaf page from link above.\n`,
    "utf-8"
  );
}

const INTRO_PATCHES = {
  "steam-room-barricade-puzzle.md": `# Steam Room Barricade Puzzle

Turkish Baths on F Deck — suspect barricaded hot room door. No keycard, no crowbar. Pull steam levers beside door, wait for pressure in red zone, he runs out.

**Sequence:** find panel → left lever → wait 2s → right lever → step back → confront when door opens.

`,
  "confrontation-with-graves-in-boiler-room-six.md": `# Confrontation with Graves in Boiler Room Six

Chapter 5 boss is not DPS fight — Graves only needs to **delay you until 11:40**. Grab bolt cutters and axe first, survive QTE, **one** revolver shot, then run when he gets up.

`,
  "final-ending-choices.md": `# Final Ending Choices

Boat Deck = only real branch in game. Three actions, three achievements, Arthur always dies. Save before choice if you want all endings without full replays.

`,
  "achievements-list.md": `# Achievements List

11 trophies, all story-locked. First eight = finish chapters. Last three = [three endings](/${GAME}/final-ending-choices). Save before Boat Deck choice.

`,
};

for (const file of fs.readdirSync(DIR)) {
  if (!file.endsWith(".md") || SKIP.has(file)) continue;
  const raw = fs.readFileSync(path.join(DIR, file), "utf-8");
  if (file === HUB_FILE) {
    processHub(raw);
  } else {
    processLeaf(file, raw);
  }
}

for (const [file, intro] of Object.entries(INTRO_PATCHES)) {
  const p = path.join(DIR, file);
  if (!fs.existsSync(p)) continue;
  let d = fs.readFileSync(p, "utf-8");
  if (d.includes(intro.trim().slice(0, 40))) continue;
  d = d.replace(/^# [^\n]+\n\n[\s\S]*?(?=\n## |\n> \*\*Screenshot|\n---)/m, `${intro.trim()}\n\n`);
  fs.writeFileSync(p, d);
}

try {
  fs.unlinkSync(path.join(DIR, "README.md"));
} catch {
  /* optional */
}

console.log("Polished Titanic Escape Simulator guides");
