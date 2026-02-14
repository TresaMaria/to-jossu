"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Background() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0f172a]">
      {/* Animated Gradient Mesh */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-[-10%] left-[-10%] h-[50%] w-[50%] rounded-full bg-blue-900 blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[50%] w-[50%] rounded-full bg-indigo-900 blur-[100px] animate-pulse delay-1000" />
        <div className="absolute top-[40%] left-[40%] h-[30%] w-[30%] rounded-full bg-sky-900 blur-[80px] animate-pulse delay-2000" />
      </div>

      {/* Floating Hearts */}
      {Array.from({ length: 15 }).map((_, i) => (
        <Heart key={i} index={i} />
      ))}
    </div>
  );
}

function Heart({ index }: { index: number }) {
  const randomX = Math.random() * 100;
  const randomDelay = Math.random() * 5;
  const randomDuration = 10 + Math.random() * 10;
  const size = 10 + Math.random() * 20;

  return (
    <motion.div
      className="absolute text-sky-200/20"
      initial={{ x: `${randomX}vw`, y: "110vh", opacity: 0, scale: 0.5 }}
      animate={{
        y: "-10vh",
        opacity: [0, 1, 1, 0],
        rotate: [0, index % 2 === 0 ? 45 : -45, 0],
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{ fontSize: size }}
    >
      ♥
    </motion.div>
  );
}
