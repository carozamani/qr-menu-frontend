import { useState } from "react";
import { MenuItem } from "@/types/menu";

export function useMenuSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const openSheet = (item: MenuItem) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  const closeSheet = () => {
    setIsOpen(false);
    setSelectedItem(null);
  };

  return {
    isOpen,
    selectedItem,
    openSheet,
    closeSheet,
  };
}
