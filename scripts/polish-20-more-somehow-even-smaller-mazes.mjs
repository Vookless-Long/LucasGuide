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
    solution: () => dirSpoiler("Full route", "Up, Up, Right, Down, Down, Right, Up, Up"),
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
      `${spoiler("Code to enter", "**2 4 1**")}\n\nAfter the code accepts, the path out is obvious — no long route needed.`,
  },
  {
    n: 3,
    title: "Squash and Stretch",
    mechanic: "**Widen** = left button (↔). **Tallen** = right button (↕). Stretch the maze before you move.",
    solution: () =>
      dirSpoiler(
        "Full route",
        "Widen, Up, Tallen, Right, Widen, Down, Down, Tallen, Left, Left, Widen, Up, Tallen, Left, Left, Widen, Down, Tallen, Left, Left, Widen, Up, Up, Tallen, Right, Widen, Up, Up, Up, Tallen, Right, Right, Widen, Down, Tallen, Right, Widen, Up, Up, Tallen, Left, Left, Left, Left"
      ),
  },
  {
    n: 4,
    title: "Four Square",
    img: IMG.movingDots4,
    imgAlt: "Maze 4 — moving dots puzzle",
    imgLabel: "Maze 4",
    mechanic: "Slide the four tiles into one connected maze first.",
    solution: () =>
      `${dirSpoiler("Assembly moves", "Up, Left, Down, Left, Left, Up, Right, Up, Left, Up, Right, Right, Right, Down, Left")}\n\nOnce assembled, exit is trivial.`,
  },
  {
    n: 5,
    title: "Move Two Matchsticks",
    mechanic: "Matchstick layout — two moves unlock the ball path.",
    solution: () => `1. Move the matchstick **left of the ball** into the **gap below** it.
2. Move the matchstick **beneath the door** into the **gap to its left**.
3. Press **Left** to roll the ball out — exit is trivial from there.`,
  },
  {
    n: 6,
    title: "Sliding Puzzle",
    mechanic: "Classic tile slide — empty square is your friend.",
    solution: () =>
      dirSpoiler(
        "Slide sequence",
        "Right, Right, Right, Right, Right, Right, Left, Left, Right, Right, Right, Right, Left, Left, Left, Left, Left, Right, Right, Right, Left, Left, Left, Left, Right"
      ),
  },
  {
    n: 7,
    title: "Scrolling, Narrow Puzzle",
    img: IMG.threeDigits7,
    imgAlt: "Maze 7 — 3-digit combination puzzle",
    imgLabel: "Maze 7",
    mechanic: "Viewport scrolls — plan moves before you trap yourself in a one-tile corridor.",
    solution: () =>
      dirSpoiler("Full route", "Right, Up, Right, Down, Right, Up, Up, Left, Up, Right, Up, Right, Down, Down"),
  },
  {
    n: 8,
    title: "Some Assembly Required",
    img: IMG.blocks8,
    imgAlt: "Block puzzle — assemble the shape from pieces",
    imgLabel: "Maze 8",
    mechanic: "Build **this shape** from the scattered pieces (match the preview silhouette).",
    solution: () => `Assemble the shape shown in-game. Once it locks together, the dot path is trivial.`,
  },
  {
    n: 9,
    title: "Eat All The Dots!",
    img: IMG.pacmanSnake9,
    imgAlt: "Pac-Man snake maze — eat every dot",
    imgLabel: "Maze 9",
    mechanic: "Pac-man rules — clear every dot, don't trap yourself.",
    solution: () =>
      dirSpoiler(
        "Full route",
        "Up, Right, Down, Right, Down, Left, Up, Left, Down, Right, Down, Left, Up, Left, Down, Left, Down, Right, Down, Left, Up, Left, Down, Left, Up, Right, Up, Left, Up, Right, Up, Left, Up, Right, Down, Left, Down, Right, Down, Right, Up, Right, Down, Right, Down, Right, Up, Left, Up, Left, Up, Right, Up, Right, Up, Left, Down, Left, Up, Left"
      ),
  },
  {
    n: 10,
    title: "I Drew This Puzzle On A Napkin Over Dinner",
    mechanic: "Tiny napkin grid — short and mean.",
    solution: () => dirSpoiler("Full route", "Up, Right, Up, Down, Up, Down, Up"),
  },
  {
    n: 11,
    title: "Auto-Tiles",
    mechanic: "Arrange tiles — connected dots **auto-complete** the path when the layout is correct.",
    solution: () => `Assemble the arrangement shown in-game. When the tile pattern is right, dots finish the maze for you.`,
  },
  {
    n: 12,
    title: "Unwanted Advertising",
    mechanic: "Pop-up ads block the maze — build an **X** close button, click it, repeat for every ad.",
    solution: () => `**Ad 1 — Goblin Turtle Peace Treaty**
- Click the **X** to close (if you can).
- Push the **X block**: Right, Up, Up, Up, Right, Right, Right, Down, Down, Right, Right, Up, Up, Up, Up into the **broken corner**, then click **X**.

**Ad 2 — Have Mazes Gone Too Far?**
- Push the **bottom-left piece**: Right, Up, Up, Up.
- Push the **two left pieces**: Right, Right.
- Push the **two left pieces** again: Down.
- Push the **right piece**: Left.
- Click the assembled **X**.

**Ad 3 — Play Strange Jigsaws**
- Push the **red square**: Left ×6, then Down ×5.
- Click the assembled **X**.

**Ad 4 — Extrareality Codebreaker**
- Move **Up, Up** to dismiss **How Many Mazes?**`,
  },
  {
    n: 13,
    title: "You Are The Maze-ish Thing",
    mechanic: "You move the maze walls, not always the dot — think backwards.",
    solution: () =>
      dirSpoiler(
        "Full route",
        "Right, Right, Up, Down, Left, Up, Left, Down, Right, Right, Left, Left, Up, Up, Right, Left, Down, Down, Right, Up, Up, Down, Left, Down, Right, Up, Left, Up, Right, Right, Down, Left, Left, Right, Right, Down, Left, Left, Right, Up, Up, Down, Left, Up"
      ),
  },
  {
    n: 14,
    title: "Back From The Klondike",
    mechanic: "Solitaire-style logic — **Learn with Flebby** slides teach the rules first.",
    solution: () =>
      `Click through **Learn with Flebby!** until the tutorial dismisses.\n\n${dirSpoiler("Full route", "Right, Left, Down, Down, Up, Left, Down, Up, Down, Right")}`,
  },
  {
    n: 15,
    title: "The Dots In These Mazes Do Not Move",
    mechanic: "Static dots — enter the three-digit code, then walk.",
    solution: () =>
      `${spoiler("Code to enter", "**5 1 3**")}\n\nPath after code is straightforward.`,
  },
  {
    n: 16,
    title: "Magnifying Glass (Whoops Too Small)",
    mechanic: "Drag the **magnifying glass** over the tiny maze in the **bottom-left** — clear surrounding mazes first so you can see it.",
    solution: () => `Move the magnifying glass onto the micro-maze. Solution inside the lens is trivial once zoomed.`,
  },
  {
    n: 17,
    title: "Gee, I Hope This Maze Doesn't Explode",
    img: IMG.connectDots17,
    imgAlt: "Maze 17 — connect-the-dots puzzle",
    imgLabel: "Maze 17",
    mechanic: "Maze **explodes** into pieces — reassemble, or brute-force the path.",
    solution: () =>
      `Reassemble after the explosion — exit is trivial.\n\nOr skip rebuild:\n\n${dirSpoiler("Full route (no reassemble)", "Up, Up, Up, Up, Up, Up, Up, Left, Down, Down, Down, Down, Left, Down, Down, Right, Down, Left, Left, Up, Up, Left, Up, Left, Left, Left, Down, Left, Up, Up, Right, Up, Up, Up, Right, Right, Down, Left, Down, Right, Down, Right")}`,
  },
  {
    n: 18,
    title: "Connect 100% Of The Dots",
    mechanic: "Numbered dots — connect **100%** in the order the puzzle shows.",
    solution: () => `Connect every dot in the **numbered order on screen** (1 → 2 → 3 … until the line hits 100%). Order is visible on the napkin — follow the labels, not a blind zigzag.`,
  },
  {
    n: 19,
    title: "Enable Puzzle (Here Is A Door. Where Is The Dot?)",
    mechanic: "Press **Enable Puzzle**, then **Zoom Out** — drag the **sun** into the **door**.",
    solution: () => `1. Press **Enable Puzzle**.
2. Press **Zoom Out**.
3. Drag the **sun** into the **door** — a spiral maze appears and forces another zoom-out to solve.`,
  },
  {
    n: 20,
    title: "The Final Maze",
    mechanic: "Spell **LABYRINTH** with movement keys (each letter = a move). Then unlock extra zoom.",
    solution: () =>
      `${spoiler("Spell LABYRINTH", "**L** = Right, Right · **A** = Right · **B** = Left · **Y** = Left · **R** = Up · **I** = Right · **N** = Up · **T** = Up · **H** = Left\n\n(Follow in-game letter prompts on the grid.)")}\n\n${dirSpoiler("Full direction route", "Right, Right, Right, Left, Left, Up, Right, Up, Up, Right, Right, Right, Up, Right, Up, Left, Right, Right")}\n\nAfter credits roll, use your new **zoom out further** ability if the last screen asks for it.`,
  },
];

function mazeSection(maze) {
  const label = maze.n === "Tutorial" ? "Tutorial" : `Maze ${maze.n}`;
  const heading = `${label} — ${maze.title}`;
  const image = maze.img ? fig(maze.img, maze.imgAlt, maze.imgLabel) : "";
  return `## ${heading}

**Mechanic:** ${maze.mechanic}
${image}
${maze.solution().trim()}`;
}

function buildHub() {
  const overviewRows = MAZES.map((m) => {
    const label = m.n === "Tutorial" ? "Tutorial" : String(m.n);
    return `| ${label} | ${m.title} | ${m.mechanic.split("—")[0].split(".")[0].trim()} |`;
  }).join("\n");

  const body = `Twenty micro mazes and one achievement — whole game fits one coffee break. I wrote every solution below so you not stare at a three-pixel corridor for twenty minutes.

${fig(IMG.feature, "20 More, Somehow Even Smaller, Mazes title screen", "Feature")}

**Controls:** arrow keys move the dot (or the maze, depending on level). **Zoom** matters on the last few — mouse wheel or zoom buttons.

${jumpTo(MAZES.map((m) => ({ title: m.n === "Tutorial" ? `Tutorial — ${m.title}` : `Maze ${m.n} — ${m.title}`, anchor: `${m.n === "Tutorial" ? "Tutorial" : `Maze ${m.n}`} — ${m.title}` })))}

## Route overview

| # | Maze | Hook |
| --- | --- | --- |
${overviewRows}

> **Tip:** Stuck on one maze only? Use **Jump to** above — order is linear; no backtracking between levels.

## Solutions

${MAZES.map(mazeSection).join("\n\n")}

## Ending and achievement

Clear **Maze 20** → watch the ending sequence. One Steam achievement: **100% completion**. No missables if you follow the list top to bottom.

${fig(IMG.endingAchievement, "Ending screen — 100% completion achievement", "Ending — 100% achievement")}

> **Note:** Some mazes say "trivial once assembled" in-game — that is not lazy writing, the game really means it. Assembly *is* the puzzle.`;

  const fm = `---
type: hub
title: "20 More, Somehow Even Smaller, Mazes Walkthrough: All 20 Mazes Solutions"
description: "Full route — tutorial through Maze 20, every solution with spoilers, codes, and assembly steps."
game: ${GAME}
image: "${IMG.feature}"
date: "2026-09-18"
updated: "2026-09-18"
quickAnswer: "Linear 20 mazes + tutorial. Spoiler blocks below for every route, digit code, and ad-puzzle X assembly."
---

`;

  fs.mkdirSync(DIR, { recursive: true });
  fs.writeFileSync(path.join(DIR, "hub.md"), `${fm}${body.trim()}\n`, "utf-8");
  console.log("Wrote hub.md to", DIR);
}

buildHub();
