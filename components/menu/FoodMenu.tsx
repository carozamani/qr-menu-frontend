"use client";
import React from "react";
import { UtensilsCrossed, Soup, Beer, IceCream, Pizza } from "lucide-react";
import Typography from "../Typography";

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
    <div className="w-full">
      <div className="flex items-center justify-between gap-2 p-1.5">
        {menuItems.map((item) => {
          const isActive = activeTab === item.label;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.label)}
              className={`relative flex-1 h-14 flex flex-col items-center justify-center rounded-[var(--radius-lg)]
                transition-all duration-500
                ${isActive
                  ? "shadow-[var(--shadow-lg)] scale-105 z-10"
                  : "bg-[var(--bg-surface-2)] shadow-[var(--shadow-md)] hover:bg-[var(--bg-surface-3)]"
                }
              `}
              style={
                isActive
                  ? {
                      background: `linear-gradient(90deg, #6D3B84, #4B2C5E, #8B57A4`,
                    }
                  : {}
              }
            >
              {/* Icon */}
              <div className={`transition-transform duration-300 ${isActive ? "scale-110" : ""}`}>
                {React.cloneElement(item.icon as React.ReactElement, {
                  color: isActive ? "#FFD36E" : "var(--color-primary)",
                  opacity: isActive ? 1 : 0.8,
                  strokeWidth: isActive ? 2.5 : 2,
                })}
              </div>

              {/* Label */}
              <Typography
                variant="label"
                className={`mt-0.5 text-[9px] transition-colors duration-300 ${
                  isActive ? "text-white" : "text-[var(--color-text-muted)]"
                }`}
              >
                {item.label}
              </Typography>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FoodMenu;
