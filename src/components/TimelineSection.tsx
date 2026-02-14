"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const TIMELINE_DATA = [
    {
        year: "2020",
        title: "Online Strangers",
        description: "Who knew a random online class at MEC would ruin my peaceful life?",
        images: ["/images/timeline/2020_1.jpg", "/images/timeline/2020_2.jpg"],
        rotate: -2,
    },
    {
        year: "2021",
        title: "Best “Friends”",
        description: "Yeah… totally just friends. Sure.",
        images: ["/images/timeline/2021_1.jpg", "/images/timeline/2021_2.jpg"],
        rotate: 3,
    },
    {
        year: "March 2022",
        title: "The Confession",
        description: "Plot twist: We caught feelings.",
        images: ["/images/timeline/2022_confession.jpg"],
        rotate: -1,
    },
    {
        year: "April 30, 2022",
        title: "Ragam’22",
        description: "Music. Chaos. Accidental hand-holding. Not so accidental. Got the taste of being with you.",
        images: ["/images/timeline/2022_ragam.jpg"],
        rotate: 2,
    },
    {
        year: "May 1, 2022",
        title: "Official",
        description: "Promotion unlocked: Boyfriend. and Your First Kiss - Served!",
        images: ["/images/timeline/2022_official_1.jpg", "/images/timeline/2022_official_2.jpg"],
        rotate: -3,
    },
    {
        year: "2023 May-June",
        title: "IV happened",
        description: "The well needed bonding time.",
        images: ["/images/timeline/2023_iv_1.jpg", "/images/timeline/2023_iv_2.jpg"],
        rotate: 1,
    },
    {
        year: "2023",
        title: "MEC was our home",
        description: "A second home.",
        images: ["/images/timeline/2023_mec_1.jpg", "/images/timeline/2023_mec_2.jpg"],
        rotate: -2,
    },
    {
        year: "2024 Feb",
        title: "Long Distance Era",
        description: "Different cities. Same obsession.",
        images: ["/images/timeline/2024_long_distance.jpg"],
        rotate: 3,
    },
    {
        year: "2024 March",
        title: "Bangalore Weekends",
        description: "Chasing trains and Goodbyes and hugs at KSR station. core memory.",
        images: ["/images/timeline/2024_bangalore_1.jpg", "/images/timeline/2024_bangalore_2.jpg"],
        rotate: -1,
    },
    {
        year: "June 2025",
        title: "Still Crazy",
        description: "Toook my first flight. Things people do for love allee...Hyderabad days.",
        images: ["/images/timeline/2025_jun_1.jpg", "/images/timeline/2025_jun_2.jpg"],
        rotate: 2,
    },
    {
        year: "Nov 2025",
        title: "Jossu and Tresa",
        description: "You got closer but still far.",
        images: ["/images/timeline/2025_nov.jpg"],
        rotate: -2,
    },
    {
        year: "2026",
        title: "Still holding on",
        description: "To each other.",
        images: ["/images/timeline/2026.jpg"],
        rotate: 1,
    },
];

export default function TimelineSection() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-90%"]);

    return (
        <section ref={targetRef} className="relative h-[500vh] bg-[#0f172a]/20">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">

                {/* The Clothesline Rope */}
                <div className="absolute top-[40%] left-0 right-0 h-1 bg-white/20 z-0 shadow-sm" />

                <motion.div style={{ x }} className="flex gap-16 px-24 items-center">
                    {/* Intro Card */}
                    <div className="flex-shrink-0 w-80 p-8 flex flex-col justify-center items-center text-center">
                        <h2 className="font-handwriting text-5xl text-sky-200 mb-4">Our Timeline</h2>
                        <p className="font-sans text-slate-400">Scroll down to take a walk down memory lane...</p>
                        <div className="mt-8 animate-bounce text-2xl">👉</div>
                    </div>

                    {TIMELINE_DATA.map((item, index) => (
                        <TimelineCard key={index} item={item} />
                    ))}

                    {/* End Card */}
                    <div className="flex-shrink-0 w-80 p-8 flex flex-col justify-center items-center text-center">
                        <h2 className="font-handwriting text-5xl text-sky-200 mb-4">To Be Continued...</h2>
                        <div className="text-4xl">💙</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function TimelineCard({ item }: { item: typeof TIMELINE_DATA[0] }) {
    return (
        <div className="relative flex-shrink-0 w-[450px] group">
            {/* The Clip */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-8 bg-amber-800/80 rounded-sm z-20 shadow-sm" />
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-5 h-2 bg-amber-900/40 rounded-sm z-20 mt-6" />

            {/* The Card */}
            <motion.div
                className={cn(
                    "bg-[#fdfbf7] p-4 pb-8 shadow-xl relative",
                    "transform transition-transform duration-500 hover:z-10 hover:scale-105"
                )}
                style={{ rotate: item.rotate }}
            >
                {/* Images Container - Fixed Height, Contain Mode to show full image */}
                <div className="relative w-full h-80 bg-zinc-50 rounded-sm mb-4 border border-zinc-100 shadow-inner">
                    {item.images.length === 1 ? (
                        <div className="relative w-full h-full p-2">
                            <Image
                                src={item.images[0]}
                                alt={item.title}
                                fill
                                className="object-contain drop-shadow-md"
                            />
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 h-full w-full gap-2 p-2">
                            {item.images.map((src, i) => (
                                <div key={i} className="relative w-full h-full">
                                    <Image
                                        src={src}
                                        alt={`${item.title} ${i + 1}`}
                                        fill
                                        className="object-contain drop-shadow-sm"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Text Content */}
                <div className="text-center px-2">
                    <div className="inline-block border-b-2 border-sky-100 mb-2 pb-1">
                        <span className="font-sans text-xs font-bold text-sky-900/70 tracking-widest uppercase">
                            {item.year}
                        </span>
                    </div>

                    <h3 className="font-handwriting text-3xl text-slate-800 mb-2">
                        {item.title}
                    </h3>
                    <p className="font-sans text-sm text-slate-600 leading-relaxed font-medium">
                        "{item.description}"
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
