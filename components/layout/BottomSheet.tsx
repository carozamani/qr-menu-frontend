"use client";

import { useBottomSheet } from "@/hooks/menu/useBottomSheet";
import { motion, AnimatePresence } from "framer-motion";
import React, { useRef } from "react";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function BottomSheet({ open, onClose, children }: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const { handleDragEnd } = useBottomSheet({ onClose });

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-[3000]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Sheet */}
          <motion.div
            ref={sheetRef}
            className="
              fixed bottom-0 left-0 right-0 z-[5000]
              bg-[#FDF8F1]/90
              backdrop-blur-sm
              rounded-t-[28px]
              max-h-[90vh]
              overflow-y-auto
            "
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          >
            {/* Handle */}
            <div className="flex justify-center py-3 cursor-grab">
              <div className="w-12 h-1.5 bg-[#D2993B] rounded-full" />
            </div>

            <div className="px-6 pb-6">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
