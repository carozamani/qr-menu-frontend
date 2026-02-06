// src/hooks/useScrollToCategory.ts
import { useState } from "react";

export function useScrollToCategory() {
  const [isProgrammaticScroll, setIsProgrammaticScroll] = useState(false);

  const scrollToCategory = (category: string) => {
    const element = document.getElementById(category);
    if (!element) return;

    setIsProgrammaticScroll(true);

    // اسکرول نرم با احترام به scroll-margin-top
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    // بعد از پایان اسکرول، اجازه بده ScrollSpy دوباره فعال بشه
    const timeoutId = window.setTimeout(() => {
      setIsProgrammaticScroll(false);
    }, 10);

    return () => window.clearTimeout(timeoutId);
  };

  return {
    isProgrammaticScroll,
    scrollToCategory,
  };
}
