import React from "react";
import { motion } from "framer-motion";
import { Download, Loader2, Check } from "lucide-react";
import clsx from "clsx";

type Size = "sm" | "md";

interface DownloadButtonProps {
  onClick: () => void;
  isLoading?: boolean;      // show spinner
  isDone?: boolean;         // show a quick success state (optional)
  tooltip?: string;
  className?: string;
  size?: Size;
  variant?: "subtle" | "solid"; // subtle (transparent) or solid background
}

const iconSizes: Record<Size, string> = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
};

const paddings: Record<Size, string> = {
  sm: "p-1.5",
  md: "p-2",
};

const DownloadButton: React.FC<DownloadButtonProps> = ({
  onClick,
  isLoading = false,
  isDone = false,
  tooltip = "Download",
  className,
  size = "sm",
  variant = "subtle",
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={isLoading}
      title={tooltip}
      aria-label={tooltip}
      className={clsx(
        "rounded-full transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
        paddings[size],
        variant === "solid"
          ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
          : "opacity-60 hover:opacity-100",
        className
      )}
    >
      {isLoading ? (
        <Loader2 className={clsx(iconSizes[size], "animate-spin")} />
      ) : isDone ? (
        <Check className={iconSizes[size]} />
      ) : (
        <Download className={iconSizes[size]} />
      )}
    </motion.button>
  );
};

export default DownloadButton;

