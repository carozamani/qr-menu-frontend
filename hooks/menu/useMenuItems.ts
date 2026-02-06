// src/hooks/useMenuItems.ts
import { useState, useEffect, useMemo } from "react";
import { getMenuItems } from "@/lib/queries/menu";
import { MenuItem } from "@/types/menu";

export const useMenuItems = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getMenuItems()
      .then((data) => {
        if (!isMounted) return;
        setItems(data);
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // -------------------------
  // Derived Data (Memoized)
  // -------------------------
  const activeItems = useMemo(
    () => items.filter((i) => i.is_active),
    [items]
  );

  const featuredItems = useMemo(
    () => activeItems.filter((i) => i.is_featured),
    [activeItems]
  );

  const dailyMenu = useMemo(
    () => featuredItems.find((i) => i.is_featured),
    [featuredItems]
  );

  return {
    items,
    loading,
    activeItems,
    featuredItems,
    dailyMenu,
  };
};
