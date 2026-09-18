/**
 * Build 20 More, Somehow Even Smaller, Mazes — single hub (Luca voice).
 * Run: node scripts/polish-20-more-somehow-even-smaller-mazes.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GAME = "20-more-somehow-even-smaller-mazes";
const DIR = path.join(__dirname, "..", "guides", GAME);

const R2 = "https://pub-569323f832f84244a5766b065936dc37.r2.dev/LucasGuide";
const IMG = {
  feature: `${R2}/20-More-Somehow-Even-Smaller-Mazes-Feature-LucasGuide.jpg`,
  threeDigits7: `${R2}/20-More-Somehow-Even-Smaller-Mazes-3-Digits-Puzzles-7-LucasGuide.jpg`,
  movingDots4: `${R2}/20-More-Somehow-Even-Smaller-Mazes-Moving-Dots-Puzzles-4-LucasGuide.jpg`,
  blocks8: `${R2}/20-More-Somehow-Even-Smaller-Mazes-Blocks-Puzzles-8-LucasGuide.jpg`,
  pacmanSnake9: `${R2}/20-More-Somehow-Even-Smaller-Mazes-Pacman-Snake-Puzzles-9-LucasGuide.jpg`,
  connectDots17: `${R2}/20-More-Somehow-Even-Smaller-Mazes-Connect-the-Dot-Puzzles-17-LucasGuide.jpg`,
  endingAchievement: `${R2}/20-More-Somehow-Even-Smaller-Mazes-An-Ending-Achievement-LucasGuide.jpg`,
};

function fig(src, alt, label) {
  const caption = label || alt;
  return `\n![${alt}](${src})\n\n**${caption}**\n`;
}

function spoilerImg(src, alt) {
  if (!src) return "";
  return `![${alt}](${src})\n\n`;
}

function spoilerWith(label, body, src, alt) {
  return spoiler(label, `${spoilerImg(src, alt)}${body.trim()}`);
}

function dirSpoilerImg(label, directions, src, alt) {
  return spoilerWith(label, `\`${dirBlock(directions)}\``, src, alt);
}

function escapeFm(value) {
  return String(value || "")
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, " ");
}

function headingId(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function jumpTo(items) {
  const lines = items.map((item) => `- [${item.title}](#${headingId(item.anchor || item.title)})`);
  return `## Jump to\n\n${lines.join("\n")}\n`;
}

function spoiler(label, body) {
  return `\n:::spoiler ${label}\n${body.trim()}\n:::\n`;
}

function dirBlock(directions) {
  const parts = directions.split(",").map((d) => d.trim()).filter(Boolean);
  return parts.join(", ");
}

function dirSpoiler(label, directions) {
  return spoiler(label, `\`${dirBlock(directions)}\``);
}

const MAZES = [
  {
    n: "Tutorial",
    title: "Example Maze",
    mechanic: "Movement tutorial — learn arrows before the real puzzles.",
    solution: () => dirSpoiler("Solution", "Up, Up, Right, Down, Down, Right, Up, Up"),
  },
  {
    n: 1,
    title: "Recursive Maze",
    mechanic: "Three locked segments — grab **First Key**, then **Second Key**, then reach the **Exit Door**.",
    solution: () =>
      `${dirSpoiler("First Key", "Up, Left, Down, Down, Right, Right, Up, Left, Left, Up, Left, Left, Down, Left, Left, Left, Down, Down, Left")}${dirSpoiler("Second Key", "Right, Up, Up, Right, Right, Right, Up, Right, Right, Down, Left, Down, Left, Left, Down, Down, Down, Left, Left, Up, Up, Left, Up, Left, Left, Up, Up, Up, Right, Up, Up, Right")}${dirSpoiler("Exit Door", "Left, Down, Down, Left, Down, Down, Down, Right, Right, Down, Right, Down, Down, Left, Left, Up, Left, Up, Up, Left, Up, Right, Right, Up, Up, Up, Right, Up, Up")}`,
  },
  {
    n: 2,
    title: "1 2 3 4 5",
    mechanic: "Digit locks on the grid — enter the code, then walk the trivial exit.",
    solution: () =>
      spoilerWith(
        "3-digit code puzzle",
        "Enter **2 4 1**. Exit is trivial once the code accepts.",
        IMG.threeDigits7,
        "3-digit code puzzle"
      ),
  },
  {
    n: 3,
    title: "Squash and Stretch",
    mechanic: "**Widen** = left button (↔). **Tallen** = right button (↕). Stretch the maze before you move.",
    solution: () =>
      dirSpoiler(
        "Solution",
        "Widen, Up, Tallen, Right, Widen, Down, Down, Tallen, Left, Left, Widen, Up, Tallen, Left, Left, Widen, Down, Tallen, Left, Left, Widen, Up, Up, Tallen, Right, Widen, Up, Up, Up, Tallen, Right, Right, Widen, Down, Tallen, Right, Widen, Up, Up, Tallen, Left, Left, Left, Left"
      ),
  },
  {
    n: 4,
    title: "Four Square",
    mechanic: "Slide the four tiles into one connected maze first.",
    solution: () =>
      `${dirSpoiler("Solution", "Up, Left, Down, Left, Left, Up, Right, Up, Left, Up, Right, Right, Right, Down, Left")}\n\nExit is trivial once assembled.`,
  },
  {
    n: 5,
    title: "Move Two Matchsticks",
    mechanic: "Matchstick layout — two moves unlock the ball path.",
    solution: () => `1. Move the matchstick **left of the ball** to the gap **below** it.
2. Move the matchstick **beneath the door** to the gap to its **left**.
3. Press **Left** to exit the box — exit is trivial from there.`,
  },
  {
    n: 6,
    title: "Sliding Puzzle",
    mechanic: "Classic tile slide — empty square is your friend.",
    solution: () =>
      dirSpoiler(
        "Solution",
        "Right, Right, Right, Right, Right, Right, Left, Left, Right, Right, Right, Right, Left, Left, Left, Left, Left, Right, Right, Right, Left, Left, Left, Left, Right"
      ),
  },
  {
    n: 7,
    title: "Scrolling, Narrow Puzzle",
    mechanic: "Viewport scrolls — plan moves before you trap yourself in a one-tile corridor.",
    solution: () =>
      dirSpoiler(
        "Solution",
        "Right, Up, Right, Down, Right, Up, Up, Left, Up, Right, Up, Right, Down, Down"
      ),
  },
  {
    n: 8,
    title: "Some Assembly Required",
    mechanic: "Build **this shape** from the scattered pieces (match the preview silhouette).",
    solution: () =>
      spoilerWith(
        "Solution",
        "Assemble this shape. Exit is trivial once assembled.",
        IMG.blocks8,
        "Some Assembly Required — puzzle blocks"
      ),
  },
  {
    n: 9,
    title: "Eat All The Dots!",
    mechanic: "Pac-man rules — clear every dot, don't trap yourself.",
    solution: () =>
      dirSpoilerImg(
        "Solution",
        "Up, Right, Down, Right, Down, Left, Up, Left, Down, Right, Down, Left, Up, Left, Down, Left, Down, Right, Down, Left, Up, Left, Down, Left, Up, Right, Up, Left, Up, Right, Up, Left, Up, Right, Down, Left, Down, Right, Down, Right, Up, Right, Down, Right, Down, Right, Up, Left, Up, Left, Up, Right, Up, Right, Up, Left, Down, Left, Up, Left",
        IMG.pacmanSnake9,
        "Maze 9 — Pac-Man snake"
      ),
  },
  {
    n: 10,
    title: "I Drew This Puzzle On A Napkin Over Dinner",
    mechanic: "Tiny napkin grid — short and mean.",
    solution: () => dirSpoiler("Solution", "Up, Right, Up, Down, Up, Down, Up"),
  },
  {
    n: 11,
    title: "Auto-Tiles",
    mechanic: "Moving dots puzzle — arrange the tiles so connected dots **auto-complete** the maze.",
    solution: () =>
      spoilerWith(
        "Solution",
        "Assemble this arrangement. The dots will then complete the puzzle automatically.",
        IMG.movingDots4,
        "Auto-Tiles — moving dots puzzle"
      ),
  },
  {
    n: 12,
    title: "Unwanted Advertising",
    mechanic: "Pop-up ads block the maze — build an **X** close button, click it, repeat for every ad.",
    solution: () => `1. Click the **X** to close the **Goblin Turtle Peace Treaty** ad.
2. **Push** the **X block**: Right, Up, Up, Up, Right, Right, Right, Down, Down, Right, Right, Up, Up, Up, Up. Once it is in the broken corner, click **X** to close **Have Mazes Gone Too Far?**
3. **Push** the bottom-left piece: Right, Up, Up, Up. **Push** the two pieces on the left: Right, Right. **Push** those two pieces again: Down. **Push** the piece on the right: Left. Click the assembled **X** to close **Play Strange Jigsaws**.
4. **Push** the red square: Left ×6, Down ×5. Click the assembled **X** to close **Extrareality Codebreaker**.
5. Move **Up, Up** — closes **How Many Mazes?**`,
  },
  {
    n: 13,
    title: "You Are The Maze-ish Thing",
    mechanic: "You move the maze walls, not always the dot — think backwards.",
    solution: () =>
      dirSpoiler(
        "Solution",
        "Right, Right, Up, Down, Left, Up, Left, Down, Right, Right, Left, Left, Up, Up, Right, Left, Down, Down, Right, Up, Up, Down, Left, Down, Right, Up, Left, Up, Right, Right, Down, Left, Left, Right, Right, Down, Left, Left, Right, Up, Up, Down, Left, Up"
      ),
  },
  {
    n: 14,
    title: "Back From The Klondike",
    mechanic: "Solitaire-style logic — **Learn with Flebby** slides teach the rules first.",
    solution: () =>
      `**Learn with Flebby!** — click through the slides.\n\n${dirSpoiler("Solution", "Right, Left, Down, Down, Up, Left, Down, Up, Down, Right")}`,
  },
  {
    n: 15,
    title: "The Dots In These Mazes Do Not Move",
    mechanic: "Static dots — enter the three-digit code, then walk.",
    solution: () =>
      `${spoiler("3-digit code puzzle", "Enter **5 1 3**. Exit is trivial once the code accepts.")}`,
  },
  {
    n: 16,
    title: "Magnifying Glass (Whoops Too Small)",
    mechanic: "Drag the **magnifying glass** over the tiny maze in the **bottom-left** — clear surrounding mazes first so you can see it.",
    solution: () =>
      `Move the magnifying glass to examine the tiny maze in the **bottom-left**, once you have cleared away enough other mazes to see it. The solution inside the lens is trivial.`,
  },
  {
    n: 17,
    title: "Gee, I Hope This Maze Doesn't Explode",
    mechanic: "Maze **explodes** into pieces — reassemble, or use the alternative below.",
    solution: () =>
      `Reassemble the maze after it explodes. Exit is trivial.\n\nAlternatively:\n\n${dirSpoiler("Solution", "Up, Up, Up, Up, Up, Up, Up, Left, Down, Down, Down, Down, Left, Down, Down, Right, Down, Left, Left, Up, Up, Left, Up, Left, Left, Left, Down, Left, Up, Up, Right, Up, Up, Up, Right, Right, Down, Left, Down, Right, Down, Right")}`,
  },
  {
    n: 18,
    title: "Connect 100% Of The Dots",
    mechanic: "Numbered dots — connect **100%** in the order the puzzle shows.",
    solution: () =>
      spoilerWith(
        "Solution",
        "Connect the dots in this order.",
        IMG.connectDots17,
        "Connect 100% Of The Dots"
      ),
  },
  {
    n: 19,
    title: "Enable Puzzle (Here Is A Door. Where Is The Dot?)",
    mechanic: "Press **Enable Puzzle**, then **Zoom Out** — drag the **sun** into the **door**.",
    solution: () => `1. Press **Enable Puzzle**.
2. Press **Zoom Out**, then drag the **sun** into the **door**.
3. A trivial spiral maze appears — zoom out again to finish.`,
  },
  {
    n: 20,
    title: "The Final Maze",
    mechanic: "Spell **LABYRINTH** with movement keys (each letter = a move). Then unlock extra zoom.",
    solution: () =>
      `${spoiler("Spell LABYRINTH", "Follow in-game letter prompts on the grid.")}\n\n${dirSpoiler("Solution", "Right, Right, Right, Left, Left, Up, Right, Up, Right, Up, Up, Right, Right, Right, Up, Right, Up, Left, Right, Right")}\n\nUse your newly unlocked ability to **zoom out further** after credits.`,
  },
];

function mazeSection(maze) {
  const label = maze.n === "Tutorial" ? "Tutorial" : `Maze ${maze.n}`;
  const heading = `${label} — ${maze.title}`;
  return `## ${heading}

**Mechanic:** ${maze.mechanic}

${maze.solution().trim()}`;
}

function buildHub() {
  const overviewRows = MAZES.map((m) => {
    const label = m.n === "Tutorial" ? "Tutorial" : String(m.n);
    return `| ${label} | ${m.title} | ${m.mechanic.split("—")[0].split(".")[0].trim()} |`;
  }).join("\n");

  const body = `Twenty micro mazes and one achievement — whole game fits one coffee break. I wrote every solution below so you not stare at a three-pixel corridor for twenty minutes.

**Controls:** arrow keys move the dot (or the maze, depending on level). **Zoom** matters on the last few — mouse wheel or zoom buttons. Screenshots sit **inside spoilers** next to the solution — open only when you stuck.

${jumpTo(MAZES.map((m) => ({ title: m.n === "Tutorial" ? `Tutorial — ${m.title}` : `Maze ${m.n} — ${m.title}`, anchor: `${m.n === "Tutorial" ? "Tutorial" : `Maze ${m.n}`} — ${m.title}` })))}

## Maze overview

| # | Maze | Hook |
| --- | --- | --- |
${overviewRows}

> **Tip:** Mazes can be tackled in any order — use **Jump to** to find the puzzle name you stuck on.

## Solutions

${MAZES.map(mazeSection).join("\n\n")}

## Ending and achievement

Clear **The Final Maze** → watch the ending sequence. One Steam achievement: **100% completion**. No missables once every puzzle is solved.

${fig(IMG.endingAchievement, "Ending screen — 100% completion achievement", "Ending — 100% achievement")}

> **Note:** Some mazes say "trivial once assembled" in-game — that is not lazy writing, the game really means it. Assembly *is* the puzzle.`;

  const fm = `---
type: hub
title: "20 More, Somehow Even Smaller, Mazes Walkthrough: All 20 Mazes Solutions"
description: "Full walkthrough — tutorial through Maze 20, every solution with spoilers, codes, and assembly steps."
game: ${GAME}
image: "${IMG.feature}"
date: "2026-09-18"
updated: "2026-09-18"
quickAnswer: "20 puzzles + tutorial — no fixed order. Spoiler blocks below for every solution, digit code, and ad-puzzle X assembly."
---

`;

  fs.mkdirSync(DIR, { recursive: true });
  fs.writeFileSync(path.join(DIR, "hub.md"), `${fm}${body.trim()}\n`, "utf-8");
  console.log("Wrote hub.md to", DIR);
}

buildHub();
