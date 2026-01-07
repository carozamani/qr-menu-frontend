// src/hooks/useFoodMenu.ts
import { useState } from "react";

export const useFoodMenu = (initialTab: string = "Kebab") => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  return { activeTab, setActiveTab };
};
