"use client";

import React, { useState } from "react";
import { MenuItem } from "@/types/menu";
import { LucideSearch, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MenuDetails from "@/components/menu/MenuDetails";
import BottomSheet from "../layout/BottomSheet";
import { useMenuSearch } from "@/hooks/menu/useMenuSearch";


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
        <div className="relative z-[1100]">
          <input
            type="text"
            value={query}
            onFocus={() => { onFocusChange?.(true); setIsInputFocused(true); }}
            onBlur={() => { onFocusChange?.(false); setIsInputFocused(false); }}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Menüde ara..."
            className="w-full px-4 py-3.5 pl-10 pr-10 rounded-2xl border border-[#4B2C5E]/15 shadow-xl focus:outline-none focus:ring-2 focus:ring-[#D2993B]/50 bg-white text-[#4B2C5E] placeholder:text-[#4B2C5E]/40 transition-all duration-300"
          />
          <LucideSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4B2C5E]/40 w-5 h-5" />
          {query && (
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-[#4B2C5E]/50" />
            </button>
          )}
        </div>

        <AnimatePresence>
          {isInputFocused && query.trim() && (
            <motion.ul
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute left-0 right-0 mt-3 w-full bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-[#4B2C5E]/10 max-h-80 overflow-y-auto z-[1101] no-scrollbar"
            >
              {loading ? (
                <div className="p-8 text-center text-[#4B2C5E]/50 text-sm">Aranıyor...</div>
              ) : results.length > 0 ? (
                results.map((item) => (
                  <li
                    key={item.id}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleItemSelect(item)}
                    className="flex items-center px-4 py-4 cursor-pointer hover:bg-[#FDF8F3] transition-colors border-b border-gray-50 last:border-none"
                  >
                    {item.image_url && (
                      <img src={item.image_url} className="w-12 h-12 rounded-xl object-cover mr-4 flex-shrink-0 shadow-sm" alt={item.title} />
                    )}
                    <div className="flex flex-col text-left overflow-hidden">
                      <span className="text-[#4B2C5E] font-semibold text-sm truncate">{item.title}</span>
                      <span className="text-xs font-bold text-[#D2993B] mt-0.5">{item.price}₺</span>
                    </div>
                  </li>
                ))
              ) : (
                <div className="p-8 text-center text-[#4B2C5E]/50 text-sm italic">Sonuç bulunamadı.</div>
              )}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
