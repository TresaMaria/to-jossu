"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TermsSection({ onAccept }: { onAccept: () => void }) {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative max-w-2xl w-full bg-[#fffdf5] border-2 border-sky-100 p-8 md:p-12 shadow-2xl rounded-sm max-h-[90vh] overflow-y-auto"
                style={{
                    backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px)",
                    backgroundSize: "20px 20px"
                }}
            >
                {/* Stamp Effect */}
                <div className="absolute top-6 right-6 md:top-10 md:right-10 opacity-80 pointer-events-none transform rotate-[-15deg] z-10">
                    <div className="border-4 border-red-400 rounded-lg px-4 py-2 text-red-400 font-bold text-lg md:text-xl uppercase tracking-widest bg-red-50/50 backdrop-blur-sm shadow-sm">
                        Accepted
                        <div className="text-[0.6rem] md:text-xs text-center font-sans mt-1">
                            Since May 1, 2022
                        </div>
                    </div>
                </div>

                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="font-handwriting text-3xl md:text-5xl text-slate-800 mb-2">
                        Terms & Conditions
                    </h2>
                    <p className="font-sans text-xs md:text-sm text-slate-400 uppercase tracking-widest">
                        Of Being My Boyfriend
                    </p>
                </div>

                {/* Conditions List */}
                <ul className="space-y-4 font-handwriting text-xl md:text-2xl text-slate-700 leading-relaxed px-2 md:px-4 list-disc pl-6 md:pl-8 marker:text-sky-300">
                    <li>
                        Mandatory "I Love Yous" everyday at random times. (Surprise me.)
                    </li>
                    <li>
                        Must send a photo of you along with the good morning wish.
                    </li>
                    <li>
                        Strict "Kiss Me When I'm Grumpy" policy is in full effect.
                    </li>
                    <li>
                        Any issue between us must be fixed within two days. No lingering drama.
                    </li>
                    <li>
                        If you find good looking women, you must send me a pic or share the Insta ID. (Yes, really.)
                    </li>
                    <li>
                        Lifetime subscription to being my emotional support human.
                    </li>
                </ul>

                {/* Footer / Acceptance */}
                <div className="mt-10 pt-8 border-t border-dashed border-slate-200">

                    <label className="flex items-start gap-3 cursor-pointer group select-none">
                        <div className="relative mt-1">
                            <input
                                type="checkbox"
                                className="peer sr-only"
                                checked={isChecked}
                                onChange={(e) => setIsChecked(e.target.checked)}
                            />
                            <div className="w-6 h-6 border-2 border-slate-300 rounded peer-checked:bg-sky-500 peer-checked:border-sky-500 transition-colors" />
                            <Check className="w-4 h-4 text-white absolute top-1 left-1 opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="font-handwriting text-xl text-slate-600 group-hover:text-slate-800 transition-colors">
                            I accept all this for the better of my lady.
                        </span>
                    </label>

                    <button
                        onClick={onAccept}
                        disabled={!isChecked}
                        className={cn(
                            "w-full mt-8 py-4 rounded-xl font-sans font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2",
                            isChecked
                                ? "bg-sky-500 text-white shadow-lg hover:bg-sky-600 hover:shadow-sky-200/50 hover:-translate-y-1"
                                : "bg-slate-200 text-slate-400 cursor-not-allowed"
                        )}
                    >
                        Continue to Site
                        <ArrowRight className="w-5 h-5" />
                    </button>

                    <p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-widest">
                        Values are non-negotiable • No returns • No refunds
                    </p>
                </div>

            </motion.div>
        </div>
    );
}
