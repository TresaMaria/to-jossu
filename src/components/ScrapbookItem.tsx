"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrapbookItemProps {
    children: ReactNode;
    rotation?: number; // Degrees
    className?: string;
    hasTape?: boolean;
}

export default function ScrapbookItem({
    children,
    rotation,
    className,
    hasTape = true,
}: ScrapbookItemProps) {
    // If no rotation provided, we could randomise - but let's stick to explicit for now to avoid hydration mismatch
    // or use a client-side only random with useEffect if needed later.

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
            whileInView={{ opacity: 1, scale: 1, rotate: rotation ?? 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={cn(
                "relative bg-[#fdfbf7] p-4 shadow-lg transition-transform hover:z-10 hover:scale-[1.02] duration-300 ease-out",
                "border border-gray-200/50",
                className
            )}
        >
            {hasTape && (
                <div className="absolute -top-3 left-1/2 h-8 w-24 -translate-x-1/2 rotate-[-2deg] bg-white/40 shadow-sm backdrop-blur-[1px] opacity-80"
                    style={{
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                        clipPath: "polygon(2% 0, 98% 0, 100% 100%, 0% 100%)"
                    }}
                />
            )}
            {children}
        </motion.div>
    );
}
