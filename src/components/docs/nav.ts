export interface DocsNavItem {
  slug: string;
  label: string;
}

export interface DocsNavSection {
  label: string;
  icon: string;
  items: DocsNavItem[];
}

export const DOCS_NAV: DocsNavSection[] = [
  {
    label: "Start here",
    icon: "✦",
    items: [
      { slug: "overview", label: "Overview" },
      { slug: "quickstart", label: "Quickstart" },
      { slug: "installation", label: "Installation" },
      { slug: "configuration", label: "Configuration" },
    ],
  },
  {
    label: "Reference",
    icon: "✧",
    items: [
      { slug: "url-api", label: "URL API" },
      { slug: "transformations", label: "Transformations" },
      { slug: "formats", label: "Formats & negotiation" },
      { slug: "signing", label: "Signed URLs" },
      { slug: "errors", label: "Error model" },
    ],
  },
  {
    label: "Operations",
    icon: "♡",
    items: [
      { slug: "caching", label: "Cache, purge, warm" },
      { slug: "security", label: "Security" },
      { slug: "deployment", label: "Deployment" },
      { slug: "observability", label: "Observability" },
      { slug: "control-plane", label: "Control plane" },
    ],
  },
  {
    label: "More",
    icon: "◌",
    items: [
      { slug: "integrations", label: "Integrations" },
      { slug: "roadmap", label: "Roadmap" },
      { slug: "faq", label: "FAQ" },
    ],
  },
];

export const DOCS_FLAT = DOCS_NAV.flatMap((section) => section.items);

export function docsHref(slug: string) {
  return slug === "overview" ? "/docs" : `/docs/${slug}`;
}
