"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const REASONS = [
    "You are my Spotify lifetime subscription — and I will cry if the password changes.",
    "You are the only person who can make me laugh mid-argument and completely ruin my dramatic performance.",
    "You are dangerously honest, and I hate it… but I’d fight anyone who says you should change.",
    "You are the only man allowed to annoy me and still get a forehead kiss.",
    "You are not just my boyfriend — you are my emotional support human and I’m slightly unhinged about it.",
    "You are the reason that makes long distance worth it.",
    "You understand my mood shifts faster than my own brain does.",
    "You stay. Even when I overthink. Even when I spiral.",
    "With you, love feels chaotic, loud, safe, dramatic, soft — all at once.",
    "You are the place I mentally run to when everything feels overwhelming.",
];

export default function ReasonsSection() {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextReason = () => {
        setActiveIndex((prev) => (prev + 1) % REASONS.length);
    };

    const prevReason = () => {
        setActiveIndex((prev) => (prev - 1 + REASONS.length) % REASONS.length);
    };

    // Calculate generic positions for a 3-card visible window
    // But strictly, we mostly care about active, prev, next for the 3D effect
    const getCardStyle = (index: number) => {
        // Normalizing index logic for infinite-like feel is complex in small arrays without duplication, 
        // but for 10 items, standard mapping relative to activeIndex works best for a "slider" feel.

        // We'll render ALL cards but only style them based on distance from active
        const distance = index - activeIndex;

        // Check for wrap-around distance to make it feel circular
        // e.g. if active is 9 and index is 0, distance should be +1, not -9
        let effectiveDistance = distance;
        if (distance > REASONS.length / 2) effectiveDistance -= REASONS.length;
        if (distance < -REASONS.length / 2) effectiveDistance += REASONS.length;

        const isActive = effectiveDistance === 0;
        const isPrev = effectiveDistance === -1;
        const isNext = effectiveDistance === 1;

        // Hide cards that are far away to prevent clutter
        const isVisible = Math.abs(effectiveDistance) <= 1;

        // 3D Transforms
        let x = "0%";
        let scale = 0.8;
        let opacity = 0;
        let zIndex = 0;
        let rotateY = 0;

        if (isActive) {
            x = "0%";
            scale = 1;
            opacity = 1;
            zIndex = 10;
            rotateY = 0;
        } else if (isPrev) {
            x = "-60%"; // Move left
            scale = 0.85;
            opacity = 0.6;
            zIndex = 5;
            rotateY = 15; // Mild turn towards center
        } else if (isNext) {
            x = "60%"; // Move right
            scale = 0.85;
            opacity = 0.6;
            zIndex = 5;
            rotateY = -15; // Mild turn towards center
        }

        return { x, scale, opacity, zIndex, rotateY, isVisible, isActive, isPrev, isNext };
    };

    return (
        <section className="relative w-full py-32 px-4 overflow-hidden bg-[#0f172a]/20 flex flex-col justify-center items-center min-h-[800px]">

            <div className="text-center mb-16 relative z-20">
                <h2 className="font-handwriting text-5xl md:text-7xl text-sky-200 drop-shadow-[0_0_10px_rgba(186,230,253,0.3)] transform -rotate-1">
                    10 Reasons I Love You
                </h2>
                <div className="mt-6 text-slate-400 font-sans tracking-[0.2em] text-sm uppercase">
                    (Click the arrows or cards to navigate)
                </div>
            </div>

            <div className="relative w-full max-w-5xl h-[400px] flex justify-center items-center perspective-1000">
                <AnimatePresence mode="popLayout">
                    {REASONS.map((reason, index) => {
                        const style = getCardStyle(index);

                        if (!style.isVisible) return null;

                        return (
                            <motion.div
                                key={index}
                                initial={false}
                                animate={{
                                    x: style.x,
                                    scale: style.scale,
                                    opacity: style.opacity,
                                    zIndex: style.zIndex,
                                    rotateY: style.rotateY,
                                }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className={cn(
                                    "absolute w-[280px] md:w-[450px] aspect-square bg-[#fffdf5] rounded-sm p-6 md:p-12 shadow-2xl flex flex-col justify-center items-center text-center cursor-pointer border border-sky-100",
                                    style.isActive ? "cursor-default ring-4 ring-sky-100/20" : "hover:brightness-95"
                                )}
                                onClick={() => {
                                    if (style.isPrev) prevReason();
                                    if (style.isNext) nextReason();
                                }}
                            >
                                {/* Card Content */}
                                <Quote className="w-8 md:w-10 h-8 md:h-10 text-sky-200 mb-4 md:mb-6 mx-auto opacity-50" />

                                <h3 className="font-handwriting text-4xl md:text-5xl text-sky-900/10 absolute top-3 md:top-4 left-4 md:left-6">
                                    {String(index + 1).padStart(2, '0')}
                                </h3>

                                <p className="font-handwriting text-xl md:text-3xl text-slate-800 leading-snug">
                                    {reason}
                                </p>

                                {style.isActive && (
                                    <div className="absolute bottom-6 left-0 w-full flex justify-center gap-1">
                                        {REASONS.map((_, i) => (
                                            <div
                                                key={i}
                                                className={cn(
                                                    "w-2 h-2 rounded-full transition-all duration-300",
                                                    i === index ? "bg-sky-400 w-4" : "bg-slate-200"
                                                )}
                                            />
                                        ))}
                                    </div>
                                )}

                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <button
                    onClick={prevReason}
                    className="absolute left-4 md:left-20 z-30 p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all hover:scale-110"
                >
                    <ChevronLeft size={32} />
                </button>
                <button
                    onClick={nextReason}
                    className="absolute right-4 md:right-20 z-30 p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all hover:scale-110"
                >
                    <ChevronRight size={32} />
                </button>

            </div>
        </section>
    );
}
