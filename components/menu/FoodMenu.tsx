"use client";
import React from "react";
import { UtensilsCrossed, Soup, Beer, IceCream, Pizza } from "lucide-react";

interface FoodMenuProps {
  activeTab: string;
  setActiveTab: (category: string) => void;
}

const FoodMenu = ({ activeTab, setActiveTab }: FoodMenuProps) => {
  const menuItems = [
    { id: 1, label: "Kebab", icon: <Soup size={22} /> },
    { id: 2, label: "Traditional", icon: <UtensilsCrossed size={22} /> },
    { id: 3, label: "Appetizer", icon: <Pizza size={22} /> },
    { id: 4, label: "Dessert", icon: <IceCream size={22} /> },
    { id: 5, label: "Drinks", icon: <Beer size={22} /> },
  ];

  return (
    <div className="w-full ">
      <div className="flex items-center justify-between gap-2 p-1.5 ">
        {menuItems.map((item) => {
          const isActive = activeTab === item.label;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.label)}
              className={`
                relative flex-1 h-14 flex flex-col items-center justify-center rounded-2xl
                transition-all duration-500 shadow-[0_4px_18px_rgba(75,44,94,0.55)]
                ${isActive
                  ? "bg-gradient-to-r from-[#6D3B84] via-[#4B2C5E] to-[#8B57A4] shadow-[0_4px_5px_rgba(75,44,94,0.35)] scale-105 z-10"
                  : "bg-white/10 hover:bg-[#4B2C5E]/10 shadow-[0_0px_8px_rgba(75,44,94,0.15)]"
                }
              `}
            >
              <div className={`transition-transform duration-300 ${isActive ? "scale-110" : ""}`}>
                {React.cloneElement(item.icon as React.ReactElement, {
                  color: isActive ? "#FFD36E" : "#4B2C5E",
                  opacity: isActive ? 1 : 0.8,
                  strokeWidth: isActive ? 2.5 : 2
                })}
              </div>
              <span className={`text-[9px] mt-0.5 font-bold transition-colors duration-300
                ${isActive ? "text-white" : "text-[#4B2C5E]/70"}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FoodMenu;
