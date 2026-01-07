"use client";

import Image from "next/image";
import { Search, X } from "lucide-react";

interface HeaderProps {
  isSearchOpen: boolean;
  toggleSearch: () => void;
}

export default function Header({ isSearchOpen, toggleSearch }: HeaderProps) {
  return (
    <header
      className="relative w-full h-35 flex justify-center items-center shadow-lg overflow-visible
      bg-gradient-to-r from-[#4B2C5E] via-[#6B3C7F] to-[#4B2C5E] z-[1200]"
    >
      {/* لوگو */}
      <div className="relative w-40 h-40 top-7 drop-shadow-2xl z-10">
        <Image
          src="/Logo.png"
          alt="Restaurant Logo"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* دکمه جستجو */}
      <button
        onClick={toggleSearch}
        className="absolute right-4 top-8 p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 text-white group z-20"
        aria-label="Search"
      >
        {isSearchOpen ? (
          <X size={24} className="group-active:scale-90 transition-transform" />
        ) : (
          <Search size={24} className="group-active:scale-90 transition-transform" />
        )}
      </button>
    </header>
  );
}
