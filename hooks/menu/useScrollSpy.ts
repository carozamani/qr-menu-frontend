// src/hooks/useScrollSpy.ts
import { useEffect, useRef, useState } from "react";

export function useScrollSpy(categories: string[], isProgrammaticScroll: boolean) {
  const [activeCategory, setActiveCategory] = useState("");
  const lastActiveCategory = useRef<string>("");
  const secondCategoryRef = useRef<HTMLDivElement | null>(null);

  const firstCategory = categories[0];

  useEffect(() => {
    if (!categories.length) return;

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "-30% 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      if (isProgrammaticScroll) return;

      const visibleEntry = entries.find((entry) => entry.isIntersecting);

      if (visibleEntry) {
        const id = visibleEntry.target.id;
        lastActiveCategory.current = id;
        setActiveCategory(id);
        return;
      }

      const firstEl = document.getElementById(firstCategory);
      if (!firstEl) return;

      const firstTop = firstEl.getBoundingClientRect().top;

      if (firstTop > window.innerHeight * 0.4) {
        lastActiveCategory.current = "";
        setActiveCategory("");
        return;
      }

      if (lastActiveCategory.current) {
        setActiveCategory(lastActiveCategory.current);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    categories.forEach((cat) => {
      const el = document.getElementById(cat);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [categories, isProgrammaticScroll, firstCategory]);

  return {
    activeCategory,
    setActiveCategory,
    lastActiveCategory,
    secondCategoryRef,
  };
}
