"use client";

import React, { useState } from "react";
import { MenuItem } from "@/types/menu";
import { LucideSearch, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useMenuSearch } from "@/hooks/menu/useMenuSearch";
import BottomSheet from "@/components/layout/BottomSheet";
import MenuDetails from "../details/MenuDetails";
import Typography from "@/components/Typography";

interface SearchBoxProps {
  onSelect?: (item: MenuItem) => void;
  onFocusChange?: (isFocused: boolean) => void;
}

export default function SearchBox({ onSelect, onFocusChange }: SearchBoxProps) {
  const { query, setQuery, results, loading, selectedItem, setSelectedItem, handleSelect } = useMenuSearch();
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleItemSelect = (item: MenuItem) => {
    handleSelect(item);
    onSelect?.(item);
    onFocusChange?.(false);
    setIsInputFocused(false);
  };

  return (
    <>
      {/* BottomSheet for selected item */}
      <BottomSheet open={!!selectedItem} onClose={() => setSelectedItem(null)}>
        {selectedItem && (
          <MenuDetails
            title={selectedItem.title}
            description={selectedItem.description}
            image_url={selectedItem.image_url}
            price={selectedItem.price}
          />
        )}
      </BottomSheet>

      <div className="relative w-full max-w-md mx-auto">
        {/* Search input */}
        <div className="relative z-[1100]">
          <input
            type="text"
            value={query}
            onFocus={() => { onFocusChange?.(true); setIsInputFocused(true); }}
            onBlur={() => { onFocusChange?.(false); setIsInputFocused(false); }}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Menüde ara..."
            className="w-full px-4 py-3.5 pl-10 pr-10 rounded-[var(--radius-lg)] border border-[var(--color-border-light)] shadow-[var(--shadow-md)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] bg-[var(--bg-surface-2)] text-[var(--color-primary)] placeholder:text-[var(--color-primary)]/40 transition-all duration-300"
          />
          <LucideSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-primary)]/40 w-5 h-5" />
          {query && (
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors hover:bg-[var(--bg-surface-3)]"
            >
              <X className="w-4 h-4 text-[var(--color-primary)]/50" />
            </button>
          )}
        </div>

        {/* Search results */}
        <AnimatePresence>
          {isInputFocused && query.trim() && (
            <motion.ul
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute left-0 right-0 mt-3 w-full bg-[var(--bg-surface-2)] rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] border border-[var(--color-border-light)] max-h-80 overflow-y-auto z-[1101] no-scrollbar"
            >
              {loading ? (
                <div className="p-8 text-center">
                  <Typography variant="bodyMuted">
                    Aranıyor...
                  </Typography>
                </div>
              ) : results.length > 0 ? (
                results.map((item) => (
                  <li
                    key={item.id}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleItemSelect(item)}
                    className="flex items-center px-4 py-4 cursor-pointer transition-colors border-b border-[var(--color-border-light)] last:border-none"
                  >
                    {item.image_url && (
                      <img
                        src={item.image_url}
                        className="w-12 h-12 rounded-xl object-cover mr-4 flex-shrink-0 shadow-sm"
                        alt={item.title}
                      />
                    )}
                    <div className="flex flex-col text-left overflow-hidden">
                      <Typography
                        variant="body"
                        className="text-[var(--color-primary)] font-semibold truncate"
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="h2"
                        className="text-[var(--color-secondary)] mt-0.5"
                      >
                        {item.price}₺
                      </Typography>
                    </div>
                  </li>
                ))
              ) : (
                <div className="p-8 text-center">
                  <Typography variant="bodyMuted" className="italic">
                    Sonuç bulunamadı.
                  </Typography>
                </div>
              )}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
