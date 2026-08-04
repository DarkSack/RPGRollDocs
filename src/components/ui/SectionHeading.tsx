import type { ReactNode } from "react";

export function SectionHeading({
  id,
  level = 2,
  children,
}: {
  id: string;
  level?: 2 | 3;
  children: ReactNode;
}) {
  const Tag = level === 2 ? "h2" : "h3";

  return (
    <Tag
      id={id}
      className={
        "group scroll-mt-24 font-semibold tracking-tight text-slate-900 dark:text-slate-100 " +
        (level === 2 ? "text-2xl mt-12 mb-4" : "text-lg mt-8 mb-2")
      }
    >
      <a href={`#${id}`} className="no-underline">
        {children}
        <span className="ml-2 text-violet-400 opacity-0 transition-opacity group-hover:opacity-100">#</span>
      </a>
    </Tag>
  );
}
