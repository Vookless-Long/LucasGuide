/**
 * Build Animaly Bar: NO HUMANITY guides (Luca voice, 1+3 model).
 * Run: node scripts/polish-animaly-bar-no-humanity.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GAME = "animaly-bar-no-humanity";
const DIR = path.join(__dirname, "..", "guides", GAME);
const JSON_PATH = path.join(DIR, "animaly-bar-no-humanity-walkthrough-flow.json");

const R2 = "https://pub-569323f832f84244a5766b065936dc37.r2.dev/LucasGuide";
const IMG = {
  feature: `${R2}/Animaly-Bar-No-Humanity-Feature-LucasGuide.jpg`,
  startIntro: `${R2}/Animaly-Bar-No-Humanity-Start-Intro-LucasGuide.jpg`,
  buyOrangeJuice: `${R2}/Animaly-Bar-No-Humanity-Buy-Orange-Juice-LucasGuide.jpg`,
  recipes: `${R2}/Animaly-Bar-No-Humanity-Recipes-LucasGuide.jpg`,
  agentPengu: `${R2}/Animaly-Bar-No-Humanity-Agent-Pengu-LucasGuide.jpg`,
  suspicionCriteria: `${R2}/Animaly-Bar-No-Humanity-Suspicion-Criteria-LucasGuide.jpg`,
  press1GunShoot: `${R2}/Animaly-Bar-No-Humanity-Press-1-Gun-Shoot-LucasGuide.jpg`,
  panda: `${R2}/Animaly-Bar-No-Humanity-Panda-LucasGuide.jpg`,
  cat: `${R2}/Animaly-Bar-No-Humanity-Cat-LucasGuide.jpg`,
  turtle: `${R2}/Animaly-Bar-No-Humanity-Turtle-LucasGuide.jpg`,
  bull: `${R2}/Animaly-Bar-No-Humanity-Bull-LucasGuide.jpg`,
  owl: `${R2}/Animaly-Bar-No-Humanity-Owl-LucasGuide.jpg`,
  elephant: `${R2}/Animaly-Bar-No-Humanity-Elephant-LucasGuide.jpg`,
  bearBadNews: `${R2}/Animaly-Bar-No-Humanity-Bear-Bad-News-LucasGuide.jpg`,
  crocodilePoorBeer: `${R2}/Animaly-Bar-No-Humanity-Crocodile-Poor-Beer-LucasGuide.jpg`,
  giraffe: `${R2}/Animaly-Bar-No-Humanity-Giraffe-LucasGuide.jpg`,
  hamster: `${R2}/Animaly-Bar-No-Humanity-Hamster-LucasGuide.jpg`,
  pig: `${R2}/Animaly-Bar-No-Humanity-Pig-LucasGuide.jpg`,
  pigeon: `${R2}/Animaly-Bar-No-Humanity-Pigeon-LucasGuide.jpg`,
  rhino: `${R2}/Animaly-Bar-No-Humanity-Rhino-LucasGuide.jpg`,
  tiger: `${R2}/Animaly-Bar-No-Humanity-Tiger-LucasGuide.jpg`,
  whoBathroom: `${R2}/Animaly-Bar-No-Humanity-Who-Bathroom-LucasGuide.jpg`,
  itsMyFather: `${R2}/Animaly-Bar-No-Humanity-Its-My-Father-LucasGuide.jpg`,
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
    `date: "2026-09-17"`,
    `updated: "2026-09-17"`,
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

function stepsToList(steps) {
  return (steps || [])
    .filter((s) => s && !/^\[TBD/i.test(s))
    .map((s) => `- ${stripTicks(s)}`)
    .join("\n");
}

function inlinePage(data, slug) {
  return data.hub.inlinePages.find((p) => p.slug === slug);
}

function leafBySlug(data, slug) {
  return data.leafGuides.find((l) => l.slug === slug);
}

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

function numberedSteps(steps) {
  return (steps || []).map((s, i) => `${i + 1}. ${stripTicks(s)}`).join("\n");
}

function buildHub(data) {
  const day1 = inlinePage(data, "daily-bar-routine-basic-controls");
  const drinks = inlinePage(data, "serving-drinks-recipe-book");
  const identify = inlinePage(data, "identifying-humans-four-suspicion-criteria");
  const shotgun = inlinePage(data, "using-shotgun-inspecting-customers");
  const festival = inlinePage(data, "festival-day-preparations");
  const escape = inlinePage(data, "escape-after-bears-death");
  const contract = leafBySlug(data, "agent-pingu-contract-penalties");
  const scanner = leafBySlug(data, "obtaining-using-scanner");
  const clown = leafBySlug(data, "clown-number-guessing-game");
  const looters = leafBySlug(data, "defending-bar-from-looters");
  const adrenaline = leafBySlug(data, "adrenaline-syringe-looter-defense");

  const body = `Bar sim + horror — mop drinks by day, shotgun humans by night. Agent Pingu pays **$100 per human scalp**. Mess up five times and you dead.

This hub = **my full day-by-day route**. Endings and achievements = separate leaves below.

${fig(IMG.startIntro, "Animaly Bar opening intro", "Start intro")}

## Route overview

- **Day 1** — task board, restock, open bar, learn drinks
- **Agent Pingu** — contract, four suspicion checks, shotgun rules
- **Day 2** — scanner at back door
- **Festival Day** — decorations, costumes, clown game, looter raid
- **Final stretch** — festival outcomes → [Endings](/animaly-bar-no-humanity/endings) · bear scene → escape
- **100%** — [Achievements](/animaly-bar-no-humanity/achievements) · [Tips](/animaly-bar-no-humanity/tips)

## Day 1 — Opening routine

${stripTicks(day1?.content?.summary || "Check task board, restock, open bar.")}

${numberedSteps(day1?.content?.steps)}

${fig(IMG.buyOrangeJuice, "Order orange juice on the bar computer", "Buy orange juice")}

> **Tip:** \`2\` = mop, \`Space\` = throw box. Empty boxes always go in trash.

## Drink service

${stripTicks(drinks?.content?.summary || "Recipe book + order board.")}

${fig(IMG.recipes, "Recipe book and drink ingredients", "Recipe book")}

${numberedSteps(drinks?.content?.steps)}

${fig(IMG.crocodilePoorBeer, "Crocodile customer unhappy with beer quality", "Poor beer — remake the order")}
${fig(IMG.giraffe, "Giraffe customer at the bar", "Giraffe customer")}
${fig(IMG.hamster, "Hamster customer at the bar", "Hamster customer")}
${fig(IMG.pig, "Pig customer at the bar", "Pig customer")}
${fig(IMG.pigeon, "Pigeon customer at the bar", "Pigeon customer")}
${fig(IMG.rhino, "Rhino customer at the bar", "Rhino customer")}
${fig(IMG.tiger, "Tiger customer at the bar", "Tiger customer")}

> **Tip:** Wrong drink = remake. Dirty cup in trash after customer leaves.

## Agent Pingu — contract and human checks

${fig(IMG.agentPengu, "Agent Pingu contract offer", "Agent Pingu")}

### Contract

${stepsToList(contract?.steps)}

### Four suspicion criteria

${stripTicks(identify?.content?.summary || "Never rely on one clue alone.")}

${numberedSteps(identify?.content?.steps)}

${fig(IMG.suspicionCriteria, "On-screen suspicion criteria overlay", "Suspicion criteria (Tab)")}

### Day 1 humans in disguise (scripted)

${fig(IMG.panda, "Panda customer — human in disguise on Day 1", "Day 1 — Panda (human)")}
${fig(IMG.cat, "Cat customer — human in disguise on Day 1", "Day 1 — Cat (human)")}
${fig(IMG.turtle, "Turtle customer — human in disguise on Day 1", "Day 1 — Turtle (human)")}
${fig(IMG.bull, "Bull customer — human in disguise on Day 1", "Day 1 — Bull (human)")}

### Shotgun rules

${numberedSteps(shotgun?.content?.steps)}

${fig(IMG.press1GunShoot, "Press 1 to equip shotgun prompt", "Press 1 — shotgun")}

> **Tip:** \`1\` = shotgun, hold \`Tab\` for criteria overlay. **Talk before shoot.** Serve order = cannot shoot that customer anymore. They leave if you wait too long.

## Day 2 — Scanner

${stepsToList(scanner?.steps)}

${fig(IMG.owl, "Owl customer — human in disguise on Day 2", "Day 2 — Owl (human)")}

> **Tip:** Hidden knife/gun/bomb = maybe human. Not every customer has something.

## Festival Day preparations

${stripTicks(festival?.content?.summary || "Restock, decorate, extra vigilance.")}

${numberedSteps(festival?.content?.steps)}

${fig(IMG.elephant, "Elephant in festival costume — human in disguise", "Festival — Elephant (human)")}

> **Tip:** Festival = animal costumes everywhere. This is the hard human-check day.

## Clown number game

${stepsToList(clown?.steps)}

> **Tip:** Wrong guess = tip **5×** drink price. Free drink if clown wins — I usually pick wrong on purpose for cash when I not rush story.

## Looter attack

${stepsToList(looters?.steps)}

### Adrenaline syringe

${stepsToList(adrenaline?.steps)}

> **Tip:** Syringe in room box — inject chest for speed/strength. Run into looters to drop them fast.

## Festival endings — where to go next

Festival Day kills decide your branch. I not repeat full steps here — see **[All Endings](/animaly-bar-no-humanity/endings)** for Traitor, Time To Go, Knock Knock, caravan promise, and Human Confession.

## Escape after the bear dies

${stripTicks(escape?.content?.summary || "Leave bar, meet behind bar, week skip.")}

${numberedSteps(escape?.content?.steps)}

${fig(IMG.bearBadNews, "Bad news after the bear is killed", "Bear — bad news")}

Confession scene after time skip = **[Endings](/animaly-bar-no-humanity/endings#ending-2-human-confession)** (screenshot on endings page only).

## Leaf guides

| Topic | Page |
| --- | --- |
| Tips | [Tips and progression](/animaly-bar-no-humanity/tips) |
| Endings | [All Endings](/animaly-bar-no-humanity/endings) |
| Achievements | [All Achievements](/animaly-bar-no-humanity/achievements) |`;

  writeGuide({
    slug: "hub",
    type: "hub",
    title: "Animaly Bar: NO HUMANITY Guide: All Achievements and Endings",
    description:
      "Full route — Day 1 bar loop, Agent Pingu contract, human checks, Festival Day, looter defense, and links to all endings and achievements.",
    quickAnswer:
      "Day 1 routine → drinks → Agent Pingu + four checks + shotgun → Day 2 scanner → Festival prep → clown → looters → endings leaf → bear escape.",
    image: IMG.feature,
    body,
  });
}

function buildTipsLeaf(data) {
  const tips = inlinePage(data, "general-tips-and-progression");

  const body = `Stuff I wish I knew before day three — not story spoilers, just workflow.

${jumpToSection(["General tips", "Human identification notes", "Festival Day pressure"])}

## General tips

${numberedSteps(tips?.content?.steps)}

- **Blood cleanup** — not worth the time. Game never punishes messy floor for progress.
- **Jumpscares** — most you can ignore. Only a few are mandatory story beats.
- **After any ending** — you can continue from the **last day**. Good for achievement cleanup.
- **Who is human** — **strictly scripted** per day. Same order every run I tested.

## Human identification notes

- Stack **multiple** suspicion signs before you shoot. One wrong clue is not enough.
- **Slogan test** — wrong line = suspicious.
- **Costume tells** — price tags, cotton stuffing, patches on fur.
- **Drink avoidance** — humans skip recipes with human milk, human ears, or human urine.
- **Animal mark** — missing mark is suspicious, but some real animals hide marks and some costumes fake them.
- **Scanner (Day 2+)** — weapons under clothes = lean human. Empty scan ≠ safe animal.

## Festival Day pressure

${fig(IMG.whoBathroom, "Who bathroom line joke during a busy shift", "Who bathroom? — busy bar moment")}

- Five **costumed humans** on Festival Day — wolf, chicken, elephant, eagle, kangaroo. Your shots here lock [endings](/animaly-bar-no-humanity/endings). Elephant screenshot = [hub Festival section](/animaly-bar-no-humanity#festival-day-preparations).
- **President Lion** — if anything happens to him, Agent Pingu ends you. I not test that twice.
- **Five animal kills** on any day = Agent Pingu visit. Separate from [Knock-knock achievement](/animaly-bar-no-humanity/achievements#achievement-knock-knock).

Hub route: [full walkthrough](/animaly-bar-no-humanity).`;

  writeGuide({
    slug: "tips",
    title: "Animaly Bar: NO HUMANITY — Tips",
    description:
      "Blood cleanup, jumpscares, scripted human order, identification stack rules, and Festival Day pressure.",
    topic: "system",
    quickAnswer:
      "Skip blood scrubbing; humans are scripted per day; stack four checks before shooting; Festival costumes = hardest day.",
    body,
  });
}

function buildEndingsLeaf(data) {
  const traitor = leafBySlug(data, "traitor-ending");
  const timeToGo = leafBySlug(data, "time-to-go-ending");
  const knockKnock = leafBySlug(data, "knock-knock-ending");
  const caravan = leafBySlug(data, "final-day-outcome-caravan-promise");
  const confession = leafBySlug(data, "ending-2-human-confession");

  const body = `Three **Festival Day** branches plus post-game confession. Pick your route **before** you start shooting costumes.

${jumpToSection([
    "Festival endings overview",
    "Traitor Ending",
    "Time To Go Ending",
    "Knock, Knock Ending",
    "Caravan promise",
    "Ending 2 — Human Confession",
  ])}

## Festival endings overview

| Ending | What you do on Festival Day | Achievement tie-in |
| --- | --- | --- |
| **Traitor** | Kill all five costumed humans | [Traitors](/animaly-bar-no-humanity/achievements#achievement-traitors) |
| **Time To Go** | Let ≥1 costumed human leave alive | [Time to go](/animaly-bar-no-humanity/achievements#achievement-time-to-go) |
| **Knock, Knock** | Shoot every real animal that day | [Knock-knock](/animaly-bar-no-humanity/achievements#achievement-knock-knock) |

Costumed humans on Festival Day: **wolf, chicken, elephant, eagle, kangaroo**.

> **Tip:** Save mentally before Festival opens if you hunt multiple endings — game lets you continue from last day after credits.

## Traitor Ending

${stepsToList(traitor?.steps)}

## Time To Go Ending

${stepsToList(timeToGo?.steps)}

## Knock, Knock Ending

${stepsToList(knockKnock?.steps)}

## Caravan promise

${stepsToList(caravan?.steps)}

If you **zero human escapes** on Festival Day, Agent Pingu pays enough for a **caravan** — leave with your **bear friend**. This is the good-payoff route I aim for on first clear.

## Ending 2 — Human Confession

After [bear escape](/animaly-bar-no-humanity#escape-after-the-bear-dies) and the week skip:

${fig(IMG.itsMyFather, "Confession — the human spirit is my father", "It's my father — Human Confession")}

${stepsToList(confession?.steps)}

> **Note:** Gorilla already knew — no mark, fruit punch habit, cotton tail. Ending **2 of 3** in credits.

Hub: [full route](/animaly-bar-no-humanity).`;

  writeGuide({
    slug: "endings",
    title: "Animaly Bar: NO HUMANITY — All Endings",
    description:
      "Traitor, Time To Go, Knock Knock, caravan promise, and Human Confession — Festival Day triggers and steps.",
    topic: "walkthrough",
    quickAnswer:
      "Festival Day: kill all five costumes (Traitor), let one leave (Time To Go), or shoot all animals (Knock Knock). Confession after bear escape week skip.",
    body,
  });
}

function buildAchievementsLeaf(data) {
  const traitors = leafBySlug(data, "achievement-traitors");
  const knock = leafBySlug(data, "achievement-knock-knock");
  const timeToGo = leafBySlug(data, "achievement-time-to-go");

  const body = `Three Steam achievements. All tie to **who you shoot or spare** — see [Endings](/animaly-bar-no-humanity/endings) for story branches.

${jumpToSection([
    "Achievement overview",
    "Achievement: Traitors",
    "Achievement: Knock-knock",
    "Achievement: Time to go",
  ])}

## Achievement overview

| Achievement | Condition |
| --- | --- |
| **Traitors** | Kill every human in disguise; **no innocent animals** |
| **Knock-knock** | Kill **5 animals** on a **single day** |
| **Time to go** | Let humans finish their tasks — **do not kill or block them** |

## Achievement: Traitors

${stepsToList(traitors?.steps)}

### Human roster by day

| Day | Humans in disguise |
| --- | --- |
| **Day 1** | Panda, Cat, Turtle, Bull |
| **Day 2** | Owl, Horse, Hedgehog, Bunny |
| **Day 3 (Festival)** | Wolf, Eagle, Chicken, Kangaroo, Elephant |

> **Tip:** Script is fixed — same faces each run. Write list on sticky note day one.

## Achievement: Knock-knock

${stepsToList(knock?.steps)}

Easiest on a slow day when you not care about Agent Pingu's five-mistake limit — or stack with [Knock Knock ending](/animaly-bar-no-humanity/endings#knock-knock-ending).

## Achievement: Time to go

${stepsToList(timeToGo?.steps)}

Pairs with [Time To Go ending](/animaly-bar-no-humanity/endings#time-to-go-ending) — serve Festival humans and **let them walk out**.

Hub: [full walkthrough](/animaly-bar-no-humanity).`;

  writeGuide({
    slug: "achievements",
    title: "Animaly Bar: NO HUMANITY — All Achievements",
    description:
      "Traitors, Knock-knock, and Time to go — human roster by day and unlock conditions.",
    topic: "collectibles",
    quickAnswer:
      "Traitors = kill all listed humans zero animals; Knock-knock = 5 animals one day; Time to go = do not interfere with humans.",
    body,
  });
}

function main() {
  if (!fs.existsSync(JSON_PATH)) {
    console.error("Missing JSON:", JSON_PATH);
    process.exit(1);
  }
  const data = JSON.parse(fs.readFileSync(JSON_PATH, "utf-8"));
  fs.mkdirSync(DIR, { recursive: true });

  buildHub(data);
  buildTipsLeaf(data);
  buildEndingsLeaf(data);
  buildAchievementsLeaf(data);

  const outputs = ["hub.md", "tips.md", "endings.md", "achievements.md"];
  console.log("Wrote", outputs.length, "guides to", DIR);
  outputs.forEach((f) => console.log(" ", f));
}

main();
