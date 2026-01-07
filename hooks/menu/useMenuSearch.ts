// src/hooks/useMenuSearch.ts
import { useState, useEffect, useRef } from "react";
import { MenuItem } from "@/types/menu";
import { getMenuItemsByQuery } from "@/lib/queries/menu";

export const useMenuSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // مدیریت overflow بدن هنگام باز شدن BottomSheet
  useEffect(() => {
    document.body.style.overflow = selectedItem ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedItem]);

  // جستجوی API با debounce
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);
    setLoading(true);

    debounceRef.current = setTimeout(async () => {
      try {
        const data = await getMenuItemsByQuery(query);
        setResults(data);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query]);

  const handleSelect = (item: MenuItem) => {
    setSelectedItem(item);
  };

  return {
    query,
    setQuery,
    results,
    loading,
    selectedItem,
    setSelectedItem,
    handleSelect,
  };
};
