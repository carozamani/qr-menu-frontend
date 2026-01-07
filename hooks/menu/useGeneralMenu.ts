// src/hooks/useGeneralMenu.ts
import { useState, useMemo } from "react";
import { MenuItem } from "@/types/menu";

export const useGeneralMenu = (items: MenuItem[]) => {
  const activeItems = useMemo(() => items.filter(item => item.is_active), [items]);

  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const openItem = (item: MenuItem) => setSelectedItem(item);
  const closeItem = () => setSelectedItem(null);

  return { activeItems, selectedItem, openItem, closeItem };
};
