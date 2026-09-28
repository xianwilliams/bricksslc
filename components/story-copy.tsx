import type { ReactNode } from 'react';

export function Highlight({ children }: { children: ReactNode }) {
  return (
    <mark className="scroll-highlight">
      <span>{children}</span>
    </mark>
  );
}

/** Preserve the source wording; emphasis changes its presentation, never its copy. */
export function StoryCopy({
  paragraphs,
  emphasis = [],
}: {
  paragraphs: readonly string[];
  emphasis?: string[];
}) {
  const pattern = emphasis.length
    ? new RegExp(
        `(${emphasis.map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
        'gi',
      )
    : null;
  return (
    <div className="story-copy">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>
          {pattern
            ? paragraph
                .split(pattern)
                .map((part, i) =>
                  emphasis.some((word) => word.toLowerCase() === part.toLowerCase()) ? (
                    <Highlight key={i}>{part}</Highlight>
                  ) : (
                    part
                  ),
                )
            : paragraph}
        </p>
      ))}
    </div>
  );
}
