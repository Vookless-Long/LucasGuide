/** Display + SEO title for leaf guides: game name before page title. */
export function formatLeafGuideTitle(gameName: string, guideTitle: string): string {
  const game = gameName.trim();
  const title = guideTitle.trim();
  if (!game || title.toLowerCase().startsWith(game.toLowerCase())) return title;
  return `${game} — ${title}`;
}
