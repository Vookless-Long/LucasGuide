/**
 * Remove Feature image from hub body; add filename-keyword captions under every WTE image.
 * Run: node scripts/add-elderfield-image-captions.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.join(__dirname, "..", "guides", "welcome-to-elderfield");

function captionFromUrl(url) {
  const m = url.match(/Welcome-to-Elderfield-(.+)-LucasGuide\.jpg/i);
  if (!m) return null;
  return m[1].replace(/-/g, " ");
}

function processContent(content) {
  let out = content;

  // Remove inline Feature image (OG/cover stays in frontmatter only)
  out = out.replace(
    /\n!\[[^\]]*\]\([^)]*Welcome-to-Elderfield-Feature-LucasGuide\.jpg[^)]*\)\n?/gi,
    "\n"
  );

  out = out.replace(
    /^(!\[[^\]]*\]\((https:\/\/[^)]*Welcome-to-Elderfield-[^)]+\.jpg)\))\n(?!\*\*)/gm,
    (_, block, url) => {
      const cap = captionFromUrl(url);
      if (!cap || /Feature-LucasGuide/i.test(url)) return block + "\n";
      return `${block}\n\n**${cap}**\n`;
    }
  );

  return out.replace(/\n{3,}/g, "\n\n");
}

for (const file of fs.readdirSync(DIR)) {
  if (!file.endsWith(".md")) continue;
  const p = path.join(DIR, file);
  const raw = fs.readFileSync(p, "utf-8");
  const next = processContent(raw);
  if (next !== raw) {
    fs.writeFileSync(p, next, "utf-8");
    console.log("Updated:", file);
  }
}

console.log("Done — Elderfield image captions");
