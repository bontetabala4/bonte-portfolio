export type PageMeta = { path: string; label: string; code: string };

export const PAGES: PageMeta[] = [
  { path: "/", label: "Accueil", code: "ACC" },
  { path: "/competences", label: "Compétences", code: "CMP" },
  { path: "/travaux", label: "Travaux", code: "TRV" },
  { path: "/parcours", label: "Parcours", code: "PRC" },
  { path: "/atlas", label: "Atlas", code: "ATL" },
  { path: "/contact", label: "Contact", code: "CTC" },
];

export function pageIndex(pathname: string) {
  const i = PAGES.findIndex((p) => p.path === pathname);
  return i === -1 ? 0 : i;
}
