"use client";

import { useEffect, useState } from "react";
import { getMenuItems } from "@/lib/queries/menu";
import { MenuItem } from "@/types/menu";
import FoodMenu from "@/components/menu/FoodMenu";
import FeaturedSection from "@/components/menu/FeaturedSection";
import GeneralMenuSection from "@/components/menu/GeneralMenuSection";
import MenuLoader from "@/components/menu/MenuLoader";
import Header from "@/components/layout/Header";
import DailyMenuCard from "@/components/menu/DailyMenuCard";
import SearchBox from "@/components/menu/SearchBox";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const categories = ["Kebab", "Traditional", "Appetizer", "Dessert", "Drinks"];

  useEffect(() => {
    getMenuItems()
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (loading || items.length === 0) return;
    const observerOptions = { root: null, rootMargin: "-30% 0px -60% 0px", threshold: 0 };
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveCategory(entry.target.id);
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    categories.forEach((cat) => {
      const el = document.getElementById(cat);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [loading, items]);

  const scrollToCategory = (category: string) => {
    const element = document.getElementById(category);
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      window.scrollTo({ top: elementRect - bodyRect - offset, behavior: "smooth" });
      setActiveCategory(category);
    }
  };

  const dailyMenu = items.find((i) => i.is_featured && i.is_active);

  return (
    <main className="min-h-screen relative">
      {loading && <MenuLoader />}

      {/* هدر ثابت در بالای صفحه */}
      <div className="relative z-[1200]">
        <Header
          isSearchOpen={isSearchOpen}
          toggleSearch={() => {
            setIsSearchOpen((prev) => !prev);
            if (isSearchOpen) setShowOverlay(false);
          }}
        />
      </div>

      {/* لایه سیاه پس‌زمینه هنگام فوکوس سرچ */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 z-[1800] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative">
        
        {/* بخش سرچ‌باکس داینامیک */}
        <motion.div
          layout
          initial={false}
          animate={{ 
            height: isSearchOpen ? "auto" : 0, 
            marginTop: isSearchOpen ? 80 : 0,
            opacity: isSearchOpen ? 1 : 0
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ 
            overflow: isSearchOpen ? "visible" : "hidden", 
            position: "relative",
            zIndex: showOverlay ? 1900 : 10 
          }}
        >
          <div className="py-2">
            <SearchBox
              onFocusChange={(focused) => setShowOverlay(focused)}
              onSelect={() => setShowOverlay(false)}
            />
          </div>
        </motion.div>

        {/* محتوای اصلی - Daily Menu و لیست‌ها */}
        <motion.div 
          layout
          // تنظیم فاصله بر اساس باز/بسته بودن سرچ (سازگار با موبایل)
          animate={{ marginTop: isSearchOpen ? 10 : 60 }} 
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-full"
        >
          {!loading && dailyMenu && (
            <div className="w-full">
              <DailyMenuCard
                title={dailyMenu.title}
                description={dailyMenu.description}
                image_url={dailyMenu.image_url}
                price={dailyMenu.price}
                discountText="Today's Special!"
              />
            </div>
          )}

          {!loading && (
            <div className="flex flex-col space-y-12 md:space-y-20 mt-10 pb-32">
              {/* بخش محصولات ویژه با اسکرول افقی */}
              <div className="w-full overflow-hidden">
                 <FeaturedSection items={items.filter((i) => i.is_featured && i.is_active)} />
              </div>
              
              {/* بخش‌های دسته‌بندی عمومی */}
              {categories.map((cat) => {
                const categoryItems = items.filter(
                  (item) => item.category === cat && item.is_active
                );
                if (!categoryItems.length) return null;
                return (
                  <div key={cat} id={cat} className="scroll-mt-28 w-full">
                    <GeneralMenuSection items={categoryItems} categoryTitle={cat} />
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>

      {/* منوی ناوبری پایینی (ثابت) */}
      <div className="fixed bottom-6 left-0 right-0 px-4 z ">
        <div className="max-w-[400] mx-auto rounded-4xl shadow-[0_4px_55px_rgba(75,44,94,0.35)]">
          <div className="bg-white/90 backdrop-blur-xl rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-white/20 overflow-hidden">
            <FoodMenu activeTab={activeCategory} setActiveTab={scrollToCategory} />
          </div>
        </div>
      </div>

      <style jsx global>{`
        html, body { 
          overflow-x: hidden; 
          scroll-behavior: smooth;
          background-color: #fafafa;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}