"use client";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex items-center px-1"
      style={{
        width: 56,
        height: 28,
        borderRadius: 14,
        background: "var(--bg-elevated)",
        border: "1px solid var(--border)",
      }}
      whileTap={{ scale: 0.93 }}
    >
      <motion.div
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "var(--accent-y)",
        }}
        animate={{ x: isDark ? 0 : 28 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
      <span
        className="absolute text-[10px]"
        style={{ left: 6, pointerEvents: "none" }}
      >
        {isDark ? "🌙" : ""}
      </span>
      <span
        className="absolute text-[10px]"
        style={{ right: 6, pointerEvents: "none" }}
      >
        {!isDark ? "☀️" : ""}
      </span>
    </motion.button>
  );
}
