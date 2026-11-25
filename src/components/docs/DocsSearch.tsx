import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";

interface DocIndexEntry {
  slug: string;
  title: string;
  description: string;
  section: string;
  text: string;
}

export function DocsSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<DocIndexEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open || index.length > 0) return;
    setLoading(true);
    fetch("/docs/search.json")
      .then((res) => res.json())
      .then((data: DocIndexEntry[]) => setIndex(data))
      .catch(() => setIndex([]))
      .finally(() => setLoading(false));
    window.setTimeout(() => inputRef.current?.focus(), 50);
  }, [open, index.length]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return index.slice(0, 7);
    return index
      .map((item) => {
        const title = item.title.toLowerCase();
        const desc = item.description.toLowerCase();
        const text = item.text.toLowerCase();
        let score = 0;
        if (title.includes(q)) score += 10;
        if (title.startsWith(q)) score += 6;
        if (desc.includes(q)) score += 4;
        if (text.includes(q)) score += 1;
        return { item, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map(({ item }) => item);
  }, [query, index]);

  function go(slug: string) {
    setOpen(false);
    window.location.href = slug === "overview" ? "/docs" : `/docs/${slug}`;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full border-2 border-(--ink) bg-(--paper) px-3 py-1.5 text-xs font-black shadow-[2px_2px_0_var(--ink)] transition-transform hover:-translate-y-0.5"
        aria-label="Search documentation"
      >
        <Search className="h-3.5 w-3.5" strokeWidth={3} />
        <span className="hidden sm:inline">Search docs</span>
        <span className="hidden rounded border border-(--ink)/30 px-1.5 py-0.5 text-[10px] opacity-60 md:inline">⌘K</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-(--ink)/40 px-3 pt-20 backdrop-blur-sm sm:pt-28" role="dialog" aria-modal="true" aria-label="Search documentation">
          <button type="button" aria-label="Close search" className="absolute inset-0 cursor-default" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-2xl overflow-hidden rounded-[26px] border-[2.5px] border-(--ink) bg-(--paper) shadow-[7px_8px_0_var(--ink)]">
            <div className="flex items-center gap-3 border-b-2 border-(--ink)/15 px-4 py-3">
              <Search className="h-5 w-5 shrink-0" strokeWidth={2.8} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the docs… try cache, signing, f_auto"
                className="w-full bg-transparent text-base font-bold outline-none placeholder:opacity-40"
              />
              <button type="button" onClick={() => setOpen(false)} className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-(--ink) bg-(--lilac-soft)" aria-label="Close">
                <X className="h-4 w-4" strokeWidth={3} />
              </button>
            </div>
            <div className="max-h-[55vh] overflow-y-auto p-2">
              {loading && <p className="px-4 py-6 text-sm font-bold opacity-60">Loading the good stuff…</p>}
              {!loading && results.length === 0 && (
                <p className="px-4 py-6 text-sm font-bold opacity-60">No match. Try “cache”, “signing”, or “f_auto”.</p>
              )}
              {results.map((item) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => go(item.slug)}
                  className="group flex w-full items-start gap-3 rounded-[16px] px-3 py-3 text-left hover:bg-(--butter)"
                >
                  <span className="mt-0.5 rounded-full border-2 border-(--ink) bg-(--mint) px-2 py-0.5 text-[9px] font-black uppercase tracking-wider">
                    {item.section}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-black">{item.title}</span>
                    <span className="mt-0.5 block truncate text-xs font-bold opacity-60">{item.description}</span>
                  </span>
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between border-t-2 border-(--ink)/15 px-4 py-2.5 text-[10px] font-black opacity-50">
              <span>local search · {index.length} pages</span>
              <span>esc to close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
