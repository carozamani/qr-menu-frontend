"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

import Header from "@/components/layout/Header";
import MenuLoader from "@/components/menu/MenuLoader";
import SearchBox from "@/components/menu/search/SearchBox";
import DailyMenuCard from "@/components/menu/DailyMenuCard";
import FeaturedSection from "@/components/menu/sections/FeaturedSection";
import GeneralMenuSection from "@/components/menu/sections/GeneralMenuSection";
import FoodMenu from "@/components/menu/FoodMenu";
import { useMenuItems } from "@/hooks/menu/useMenuItems";
import { useScrollToCategory } from "@/hooks/menu/useScrollToCategory";
import { useScrollSpy } from "@/hooks/menu/useScrollSpy";
import { useScrollTopFab } from "@/hooks/menu/useScrollTopFab";



export default function Home() {
  // =========================
  // Hooks
  // =========================
  const { items, loading, activeItems, featuredItems, dailyMenu } = useMenuItems();

  const categories = useMemo(
    () => ["Kebab", "Traditional", "Appetizer", "Dessert", "Drinks"],
    []
  );

  const { isProgrammaticScroll, scrollToCategory } = useScrollToCategory();
  const { activeCategory, secondCategoryRef } = useScrollSpy(categories, isProgrammaticScroll);
  const showScrollTop = useScrollTopFab(secondCategoryRef);

  // =========================
  // UI State
  // =========================
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <main className="min-h-screen bg-[var(--bg-surface-1)] w-full max-w-[450px] mx-auto relative shadow-2xl overflow-hidden">
      {loading && <MenuLoader />}

      <Header
        isSearchOpen={isSearchOpen}
        toggleSearch={() => {
          setIsSearchOpen((prev) => !prev);
          if (isSearchOpen) setShowOverlay(false);
        }}
      />

      {/* Overlay */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[1800] backdrop-blur-[2px] max-w-[450px] mx-auto"
          />
        )}
      </AnimatePresence>

      <div className="w-full px-4 relative">
        {/* Search */}
        <motion.div
          layout
          animate={{
            height: isSearchOpen ? "auto" : 0,
            marginTop: isSearchOpen ? 20 : 0,
            opacity: isSearchOpen ? 1 : 0,
          }}
          className="relative z-[1900]"
          style={{ overflow: isSearchOpen ? "visible" : "hidden" }}
        >
          <SearchBox
            onFocusChange={(focused) => setShowOverlay(focused)}
            onSelect={() => setShowOverlay(false)}
          />
        </motion.div>

        {/* Content */}
        <motion.div
          layout
          animate={{ marginTop: isSearchOpen ? 30 : 30 }}
          className="relative w-full"
        >
          {!loading && dailyMenu && (
            <DailyMenuCard {...dailyMenu} discountText="Today's Special!" />
          )}

          {!loading && (
            <div className="flex flex-col space-y-10 mt-15 ">
              <FeaturedSection items={featuredItems} />

              {categories.map((cat, index) => {
                const categoryItems = activeItems.filter((item) => item.category === cat);
                if (!categoryItems.length) return null;

                return (
                  <div
                    key={cat}
                    id={cat}
                    ref={index === 1 ? secondCategoryRef : null}
                    className="scroll-mt-28 w-full"
                  >
                    <GeneralMenuSection items={categoryItems} categoryTitle={cat} />
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>

      {/* FAB Scroll To Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-28 left-1/2 -translate-x-1/2 w-full max-w-[450px] px-4 z-[1300] flex justify-start"
          >
            <div className="relative flex items-center justify-start w-full">
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-16 h-16 rounded-full bg-gray-400/20"
                  initial={{ scale: 0.8, opacity: 0.3 }}
                  animate={{ scale: 1.4, opacity: 0 }}
                  transition={{
                    duration: 0.6 + i * 0.2,
                    delay: i * 0.1,
                  }}
                />
              ))}

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="relative w-14 h-14 rounded-full 
                           bg-white/20 backdrop-blur-md 
                           border border-white/30
                           text-gray-800 shadow-md 
                           flex items-center justify-center
                           hover:scale-105 transition-transform duration-300"
              >
                <ArrowUp size={28} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Menu */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[410px] z-[1200]">
        <div className="bg-white backdrop-blur-xl rounded-[24px] shadow-[0_10px_40px_rgba(75,44,94,0.2)] border border-white/20 overflow-hidden">
          <FoodMenu activeTab={activeCategory} setActiveTab={scrollToCategory} />
        </div>
      </div>
    </main>
  );
}
