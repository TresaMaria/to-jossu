"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const IMAGES = [
    "/images/landing/img1.jpg",
    "/images/landing/img2.jpg",
    "/images/landing/img3.jpg",
    "/images/landing/img4_fixed.jpg",
    "/images/landing/img5.jpg",
    "/images/landing/img6.jpg",
];

export default function LandingSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getTimeRemaining());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    function getTimeRemaining() {
        // Set the date we're counting down to
        const countDownDate = new Date("Feb 16, 2026 10:00:00").getTime();
        const now = new Date().getTime();
        const distance = countDownDate - now;

        if (distance < 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000),
        };
    }

    return (
        <motion.section
            ref={containerRef}
            style={{ opacity }}
            className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Floating Polaroids Background */}
            <div className="absolute inset-0 z-0">
                {IMAGES.map((src, i) => (
                    <FloatingPolaroid key={i} src={src} index={i} />
                ))}
            </div>

            {/* Top Countdown Timer */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                className="absolute top-[15%] z-20 text-center"
            >
                <div className="flex flex-wrap justify-center gap-4 md:gap-6 font-handwriting text-sky-200 drop-shadow-[0_0_10px_rgba(186,230,253,0.4)]">
                    <div className="flex flex-col items-center">
                        <span className="text-2xl md:text-4xl font-bold">{timeLeft.days}</span>
                        <span className="text-[10px] md:text-xs font-sans text-sky-200/60 uppercase tracking-widest">Days</span>
                    </div>
                    <span className="text-2xl md:text-4xl font-bold animate-pulse">:</span>
                    <div className="flex flex-col items-center">
                        <span className="text-2xl md:text-4xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
                        <span className="text-[10px] md:text-xs font-sans text-sky-200/60 uppercase tracking-widest">Hrs</span>
                    </div>
                    <span className="text-2xl md:text-4xl font-bold animate-pulse">:</span>
                    <div className="flex flex-col items-center">
                        <span className="text-2xl md:text-4xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
                        <span className="text-[10px] md:text-xs font-sans text-sky-200/60 uppercase tracking-widest">Min</span>
                    </div>
                    <span className="text-2xl md:text-4xl font-bold animate-pulse">:</span>
                    <div className="flex flex-col items-center">
                        <span className="text-2xl md:text-4xl font-bold w-[2ch]">{String(timeLeft.seconds).padStart(2, '0')}</span>
                        <span className="text-[10px] md:text-xs font-sans text-sky-200/60 uppercase tracking-widest">Sec</span>
                    </div>
                </div>
                <div className="mt-2 font-handwriting text-sky-200/80 text-lg md:text-xl tracking-wide">
                    remaining until we meet again
                </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
                style={{ y }}
                className="relative z-10 text-center space-y-6 px-4 mt-20"
            >

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                    className="font-handwriting text-7xl md:text-9xl text-sky-100 drop-shadow-[0_0_15px_rgba(186,230,253,0.5)]"
                >
                    Hi Jossu 💙
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                    className="font-sans text-xl md:text-2xl text-sky-200/80 tracking-wide"
                >
                    You survived 4 years of me.
                </motion.p>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 2.5, ease: "easeOut" }}
                    className="font-mono text-sm text-sky-400/60 animate-pulse"
                >
                    Loading 4 years of chaos...
                </motion.p>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1 }}
                className="absolute bottom-8 z-20"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ChevronDown className="w-8 h-8 text-sky-200/50" />
                </motion.div>
            </motion.div>
        </motion.section>
    );
}

function FloatingPolaroid({ src, index }: { src: string; index: number }) {
    // Manual chaos positions based on index to avoid hydration mismatch
    const positions = [
        { top: "10%", left: "10%", rotate: -10 },
        { top: "15%", right: "15%", rotate: 5 },
        { bottom: "20%", left: "15%", rotate: -5 },
        { bottom: "10%", right: "10%", rotate: 8 },
        { top: "40%", left: "5%", rotate: -15 },
        { top: "35%", right: "5%", rotate: 12 },
    ];

    const pos = positions[index % positions.length];
    const delay = index * 0.5;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
            animate={{
                opacity: [0, 0.4, 0.4, 0],
                scale: [0.8, 1, 1, 0.8],
                rotate: [0, pos.rotate, pos.rotate, 0],
                y: [0, -20, -40, -60]
            }}
            transition={{
                duration: 10,
                delay: delay,
                repeat: Infinity,
                repeatDelay: 5,
                ease: "easeInOut",
            }}
            className="absolute w-48 h-60 bg-white p-3 shadow-2xl transform hover:z-20 hover:opacity-100 hover:scale-110 transition-all duration-500 will-change-transform"
            style={{
                top: pos.top,
                left: pos.left,
                right: pos.right,
                bottom: pos.bottom,
            }}
        >
            <div className="relative w-full h-[85%] bg-gray-100 overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                <Image
                    src={src}
                    alt="Memory"
                    fill
                    className="object-cover"
                    sizes="200px"
                />
            </div>
            <div className="w-full h-[15%] flex items-center justify-center">
                <span className="font-handwriting text-gray-400 text-lg">???</span>
            </div>
        </motion.div>
    );
}
