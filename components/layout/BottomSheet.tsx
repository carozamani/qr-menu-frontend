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
          <motion.div
            className="fixed inset-0 bg-black/40 z-[3000] mx-auto"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            ref={sheetRef}
            className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[450px] z-[5000]  bg-[var(--bg-surface-3)] backdrop-blur-md rounded-t-[28px] shadow-black"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          >
            <div className="flex justify-center py-4 cursor-grab">
              <div className="w-12 h-1.5 bg-[var(--bg-surface-3)] rounded-full" />
            </div>
            <div className="px-6 pb-10">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}