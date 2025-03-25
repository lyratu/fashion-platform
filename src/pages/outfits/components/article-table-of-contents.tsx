import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

interface ArticleTableOfContentsProps {
  toc: TableOfContentsItem[];
}

export function ArticleTableOfContents({ toc }: ArticleTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      toc.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [toc]);

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold tracking-tight">Table of Contents</h3>
      <nav className="space-y-1">
        {toc.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              "block text-sm transition-colors hover:text-foreground",
              item.level === 2 ? "pl-0" : "pl-4",
              activeId === item.id
                ? "font-medium text-primary"
                : "text-muted-foreground"
            )}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector(`#${item.id}`)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
          >
            {item.title}
          </a>
        ))}
      </nav>
    </div>
  );
}
