import fs from "fs";
import path from "path";

const dir = path.join("guides", "welcome-to-elderfield");

function isSep(line) {
  const t = line.trim();
  return t.startsWith("|") && t.endsWith("|") && t.includes("---");
}

function isRow(line) {
  return line && line.trim().startsWith("|") && line.trim().endsWith("|");
}

function colCount(sepLine) {
  return sepLine.trim().split("|").filter(Boolean).length;
}

function normalizeSep(cols) {
  return "| " + Array(cols).fill("---").join(" | ") + " |";
}

function inferHeader(cols, firstDataRow) {
  const cells = firstDataRow
    .trim()
    .split("|")
    .map((c) => c.trim())
    .filter(Boolean);

  if (cols === 3 && /^\d+$/.test(cells[0])) {
    return "| Step | Action | Detail |";
  }
  if (cols === 3 && /^Key \d/i.test(cells[0])) {
    return "| Key | Location | Notes |";
  }
  if (cols === 3 && /\d+g\b/i.test(cells[1] ?? "")) {
    return "| Tome | Price | Effect |";
  }
  if (cols === 2) {
    return "| Property | Value |";
  }
  if (cols === 3) {
    return "| Column 1 | Column 2 | Column 3 |";
  }
  if (cols === 4) {
    return "| Column 1 | Column 2 | Column 3 | Column 4 |";
  }
  return "| " + Array(cols).fill("Column").map((c, i) => `${c} ${i + 1}`).join(" | ") + " |";
}

function fixFile(filePath) {
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  let changed = false;

  for (let i = 0; i < lines.length; i++) {
    if (!isSep(lines[i])) continue;
    const prev = lines[i - 1];
    if (prev && isRow(prev) && !isSep(prev)) continue;

    const cols = colCount(lines[i]);
    const firstData = lines[i + 1];
    if (!firstData || !isRow(firstData) || isSep(firstData)) continue;

    const header = inferHeader(cols, firstData);
    lines[i] = normalizeSep(cols);
    lines.splice(i, 0, header);
    changed = true;
    i++;
  }

  // Normalize remaining compact separators when table already has a header
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!isSep(line)) continue;
    if (!/^\|---/.test(line.trim()) && !/^\|\s*---\s*\|/.test(line.trim())) continue;
    const prev = lines[i - 1];
    if (!prev || !isRow(prev) || isSep(prev)) continue;
    const normalized = normalizeSep(colCount(line));
    if (line !== normalized) {
      lines[i] = normalized;
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, lines.join("\n"));
  }
  return changed;
}

let fixed = 0;
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".md"))) {
  if (fixFile(path.join(dir, f))) {
    console.log("fixed:", f);
    fixed++;
  }
}
console.log(`Done. ${fixed} file(s) updated.`);
