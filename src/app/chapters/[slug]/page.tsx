import Link from "next/link";
import { redirect } from "next/navigation";
import { CHAPTERS, chapterHref, getChapter } from "@/lib/site";

/**
 * Dynamic fallback for any /chapters/<slug> that is not one of the statically
 * defined decks. Static routes take precedence, so this only catches unknown
 * slugs and points the visitor back into the arc.
 */
export default async function ChapterFallback({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Defensive: if a known slug ever reaches here, send it to its deck.
  if (getChapter(slug)) redirect(chapterHref(slug));

  return (
    <div className="mx-auto flex min-h-[100dvh] max-w-3xl flex-col items-center justify-center px-5 text-center">
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-gold">
        Chapter not found
      </div>
      <h1 className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-5xl">
        No such chapter
      </h1>
      <p className="mt-4 max-w-md text-white/60">
        The chapter{" "}
        <span className="font-mono text-accent-gold">/{slug}</span> does not
        exist. Pick up the argument from any point below.
      </p>
      <div className="mt-8 grid w-full gap-2 sm:grid-cols-2">
        {CHAPTERS.map((c) => (
          <Link
            key={c.slug}
            href={chapterHref(c.slug)}
            className="interactive-control glass flex items-baseline gap-3 rounded-lg px-4 py-3 text-left"
          >
            <span className="font-mono text-[10px] text-accent-gold">
              {c.label}
            </span>
            <span className="text-sm">{c.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
