const SPOILER_DEFAULT_LABEL = "Spoiler — click to reveal answer";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function spoilerDetailsHtml(label: string, body: string, inline = false): string {
  const summary = escapeHtml(label || SPOILER_DEFAULT_LABEL);
  const klass = inline ? "guide-spoiler guide-spoiler--inline" : "guide-spoiler";
  const cleanBody = body.trim();
  if (inline) {
    return `<details class="${klass}"><summary>${summary}</summary>${cleanBody}</details>`;
  }
  return `<details class="${klass}"><summary>${summary}</summary>\n\n${cleanBody}\n\n</details>`;
}

/** Expand :::spoiler blocks and <spoiler> tags in markdown (before remark). */
export function expandSpoilerBlocks(markdown: string): string {
  let md = markdown;

  md = md.replace(/:::spoiler(?:[ \t]+([^\n]+))?\n([\s\S]*?):::/g, (_, label, body) =>
    spoilerDetailsHtml(label?.trim() ?? SPOILER_DEFAULT_LABEL, body)
  );

  md = md.replace(
    /<spoiler(?:[ \t]+label="([^"]*)")?\s*>([\s\S]*?)<\/spoiler>/gi,
    (_, label, body) => spoilerDetailsHtml(label?.trim() ?? SPOILER_DEFAULT_LABEL, body)
  );

  return md;
}

function isSpoilerExemptLine(line: string): boolean {
  return (
    line.startsWith("---") ||
    line.startsWith("> **Screenshot cue") ||
    line.includes(":::spoiler") ||
    line.includes("<spoiler") ||
    line.includes("<details class=\"guide-spoiler")
  );
}

/** Wrap common puzzle answer codes in spoiler blocks (line-by-line, conservative). */
export function autoWrapPuzzleAnswerCodes(markdown: string): string {
  const lines = markdown.split("\n");
  const out: string[] = [];

  for (const line of lines) {
    if (isSpoilerExemptLine(line)) {
      out.push(line);
      continue;
    }

    let next = line;

    next = next.replace(
      /(secret code you need to write down is )\*\*(`?[A-Z0-9]{3,8}`?)\*\*/i,
      (_, prefix, code) =>
        `${prefix}${spoilerDetailsHtml("Puzzle answer", `**${code.replace(/`/g, "")}**`, true)}`
    );

    next = next.replace(
      /(Enter the sequence )\*\*(`?[A-Z0-9]{3,8}`?)\*\*/i,
      (_, prefix, code) =>
        `${prefix}${spoilerDetailsHtml("Code to enter", `**${code.replace(/`/g, "")}**`, true)}`
    );

    next = next.replace(
      /(using the date )(`[0-9]{4,8}`)/i,
      (_, prefix, code) => `${prefix}${spoilerDetailsHtml("Safe code", code, true)}`
    );

    next = next.replace(
      /(Use code )(`[0-9]{4,8}`)/i,
      (_, prefix, code) => `${prefix}${spoilerDetailsHtml("Door / lock code", code, true)}`
    );

    next = next.replace(
      /(You need code )\*\*([A-Z0-9]{3,8})\*\*(,?)/i,
      (_, prefix, code, suffix) =>
        `${prefix}${spoilerDetailsHtml("Puzzle answer", `**${code}**`, true)}${suffix}`
    );

    next = next.replace(
      /(→ code )\*\*([A-Z0-9]{3,8})\*\*( →)/i,
      (_, prefix, code, suffix) =>
        `${prefix}${spoilerDetailsHtml("Puzzle answer", `**${code}**`, true)}${suffix}`
    );

    next = next.replace(
      /(Safe )\*\*([0-9]{4,8})\*\*(,?)/i,
      (_, prefix, code, suffix) =>
        `${prefix}${spoilerDetailsHtml("Safe code", `**${code}**`, true)}${suffix}`
    );

    next = next.replace(
      /(code )\*\*([0-9]{4,8})\*\*(,?)/i,
      (_, prefix, code, suffix) => {
        if (line.includes("Screenshot cue")) return line;
        return `${prefix}${spoilerDetailsHtml("Code", `**${code}**`, true)}${suffix}`;
      }
    );

    next = next.replace(
      /(safe )([0-9]{4,8})(?= →|,|\.|$|\s)/i,
      (_, prefix, code) => `${prefix}${spoilerDetailsHtml("Safe code", `**${code}**`, true)}`
    );

    out.push(next);
  }

  return out.join("\n");
}

export function preprocessMarkdown(markdown: string): string {
  return expandSpoilerBlocks(autoWrapPuzzleAnswerCodes(markdown));
}
