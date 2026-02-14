"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Lock, Unlock } from "lucide-react";

const PASSWORD = "monkey";
const CLUES = [
    "You say I have character traits similar to this",
    "You got me one of these things (but not a real one)",
    "Name is Ben",
    "If you are still guessing you are a monkey!",
];

export default function UnlockScreen({ onUnlock }: { onUnlock: () => void }) {
    const [input, setInput] = useState("");
    const [clueIndex, setClueIndex] = useState(-1); // -1 means no clues yet
    const [isShake, setIsShake] = useState(false);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Initialize audio
        audioRef.current = new Audio("/music.mp3");
        audioRef.current.loop = true;
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (val.length <= 6) {
            setInput(val);
        }
    };

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();

        if (input.toLowerCase() === PASSWORD) {
            setIsUnlocked(true);
            audioRef.current?.play().catch(() => console.log("Audio play failed - user interaction required?"));
            setTimeout(() => {
                onUnlock();
            }, 1000); // Wait for unlock animation
        } else {
            // Wrong password
            setIsShake(true);
            setTimeout(() => setIsShake(false), 500);
            setInput("");

            // Reveal next clue if available
            if (clueIndex < CLUES.length - 1) {
                setClueIndex((prev) => prev + 1);
            }
        }
    };

    return (
        <AnimatePresence>
            {!isUnlocked && (
                <motion.div
                    exit={{ opacity: 0, transition: { duration: 1 } }}
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-xl text-white p-4"
                >
                    {/* Background Gradient */}
                    <div className="absolute inset-0 overflow-hidden -z-10">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]" />
                        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]" />
                        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" />
                    </div>

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-full max-w-md flex flex-col items-center gap-8"
                    >
                        {/* Lock Icon */}
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                            <Lock className="w-8 h-8 text-sky-200" />
                        </div>

                        <div className="text-center space-y-2">
                            <h1 className="font-handwriting text-4xl md:text-5xl text-sky-100">
                                This memory museum is private.
                            </h1>
                            <p className="text-slate-400 font-sans text-sm">
                                Enter password to continue
                            </p>
                        </div>

                        {/* Password Input Visualization */}
                        <form onSubmit={handleSubmit} className="relative w-full flex justify-center">
                            <input
                                type="text"
                                value={input}
                                onChange={handleInputChange}
                                className="absolute inset-0 opacity-0 cursor-text"
                                autoFocus
                            />
                            <motion.div
                                animate={isShake ? { x: [-10, 10, -10, 10, 0] } : {}}
                                className="flex gap-2 md:gap-4"
                            >
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            "w-10 h-12 md:w-12 md:h-14 border-2 rounded-lg flex items-center justify-center text-xl font-bold transition-all duration-300",
                                            input[i]
                                                ? "border-sky-400 bg-sky-400/20 text-sky-100"
                                                : "border-slate-700 bg-slate-800/50 text-slate-500"
                                        )}
                                    >
                                        {input[i] || ""}
                                    </div>
                                ))}
                            </motion.div>
                        </form>

                        <button
                            onClick={() => handleSubmit()}
                            className="px-8 py-2 bg-sky-500 hover:bg-sky-400 text-white rounded-full font-sans transition-colors"
                        >
                            Unlock
                        </button>

                        {/* Error / Clues */}
                        <div className="h-24 flex flex-col items-center justify-start text-center space-y-2">
                            <AnimatePresence mode="wait">
                                {isShake && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="text-red-400 font-handwriting text-xl"
                                        key="error"
                                    >
                                        Think harder, baby 😌
                                    </motion.p>
                                )}

                                {clueIndex >= 0 && !isShake && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-1"
                                        key={`clue-${clueIndex}`}
                                    >
                                        <p className="text-sky-300/80 text-xs uppercase tracking-widest">
                                            Clue {clueIndex + 1}
                                        </p>
                                        <p className="text-sky-100 font-medium max-w-xs">
                                            {CLUES[clueIndex]}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
