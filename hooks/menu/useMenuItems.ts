// src/hooks/useMenuItems.ts
import { useState, useEffect } from "react";
import { getMenuItems } from "@/lib/queries/menu";
import { MenuItem } from "@/types/menu";

export const useMenuItems = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMenuItems()
      .then((data) => setItems(data))
      .finally(() => setLoading(false));
  }, []);

  return { items, loading };
};
