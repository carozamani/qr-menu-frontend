// src/hooks/useBottomSheet.ts
import { useCallback } from "react";
import { PanInfo } from "framer-motion";

interface UseBottomSheetProps {
  onClose: () => void;
  threshold?: number;  // فاصله drag برای بستن
  velocityThreshold?: number; // سرعت drag برای بستن
}

export const useBottomSheet = ({
  onClose,
  threshold = 100,
  velocityThreshold = 500,
}: UseBottomSheetProps) => {
  const handleDragEnd = useCallback(
    (_: any, info: PanInfo) => {
      if (info.offset.y > threshold || info.velocity.y > velocityThreshold) {
        onClose();
      }
    },
    [onClose, threshold, velocityThreshold]
  );

  return { handleDragEnd };
};
