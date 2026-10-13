// "/" matches only itself; any other link also matches its sub-pages,
// so /blog/<slug> marks Blog active.
export function isNavLinkActive(path: string | null, link: string): boolean {
  if (!path) return false;
  if (link === "/") return path === "/";
  return path === link || path.startsWith(`${link}/`);
}
