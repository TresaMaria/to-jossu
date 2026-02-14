"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, Flower2, Stars } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef } from "react";

export default function LoveLetterSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 2]);

    return (
        <section ref={containerRef} className="relative w-full py-40 px-4 flex justify-center items-center overflow-hidden bg-[#0f172a]/20 min-h-screen">

            {/* Background - Dynamic Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Floating Dust / Stars */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white rounded-full opacity-20"
                        initial={{
                            x: Math.random() * 100 + "%",
                            y: Math.random() * 100 + "%",
                            scale: Math.random() * 0.5 + 0.5,
                        }}
                        animate={{
                            y: [null, Math.random() * -100 + "%"],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        style={{
                            width: Math.random() * 4 + "px",
                            height: Math.random() * 4 + "px",
                        }}
                    />
                ))}
                {/* Tiny Blurred Hearts in Background */}
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={`heart-${i}`}
                        className="absolute text-pink-300/10 blur-sm"
                        initial={{
                            x: Math.random() * 100 + "%",
                            y: Math.random() * 100 + "%",
                            rotate: Math.random() * 360,
                        }}
                        animate={{
                            y: [null, Math.random() * -50 + "%"],
                            rotate: [null, Math.random() * 360],
                        }}
                        transition={{
                            duration: Math.random() * 20 + 20,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        <Heart size={Math.random() * 30 + 20} fill="currentColor" />
                    </motion.div>
                ))}
            </div>

            <div className="relative max-w-4xl w-full perspective-1000">
                {/* Depth - Second Paper Layer */}
                <motion.div
                    className="absolute inset-0 bg-[#f0ebd8] rounded-sm transform rotate-[-2deg] translate-x-[-10px] translate-y-[10px] shadow-lg"
                    style={{ y, rotate }}
                />

                {/* Main Paper */}
                <motion.div
                    initial={{ opacity: 0, y: 50, rotateX: 10 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    whileHover={{ scale: 1.01, rotate: 0.5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                    className="relative bg-[#fffdf5] shadow-2xl rounded-sm mx-auto transform rotate-[1deg] origin-top overflow-hidden"
                    style={{
                        boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), inset 0 0 40px rgba(0,0,0,0.02)"
                    }}
                >
                    {/* Paper Texture Details */}
                    {/* Grain Texture */}
                    <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply"
                        style={{
                            backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png"), 
                                            linear-gradient(to bottom right, rgba(255,255,255,0.8), rgba(240,230,220,0.5))`,
                            filter: "contrast(1.1) brightness(1.02)"
                        }}
                    />
                    {/* Fold Line */}
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-900/5 to-transparent pointer-events-none" />
                    <div className="absolute top-1/2 left-0 right-0 h-[100px] -mt-[50px] bg-gradient-to-b from-transparent via-white/20 to-transparent pointer-events-none mix-blend-overlay" />

                    {/* Decorative Border Frame - Strictly Defined */}
                    {/* Outer Line */}
                    <div className="absolute inset-6 md:inset-12 border-2 border-slate-900/10 pointer-events-none rounded-sm z-20" />
                    {/* Inner Line */}
                    <div className="absolute inset-8 md:inset-14 border border-slate-900/5 pointer-events-none rounded-sm z-20" />


                    {/* Scrapbook Details */}
                    {/* Washi Tape - Positioned to not cover text space */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-40 h-10 bg-rose-200/80 transform -rotate-1 shadow-sm opacity-90 z-30"
                        style={{ clipPath: "polygon(0% 0%, 100% 2%, 98% 100%, 2% 98%)", maskImage: "repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 0, transparent 4px)" }}
                    />

                    {/* Pressed Flower - Top Right */}
                    <div className="absolute top-24 right-24 opacity-80 pointer-events-none transform rotate-12 mix-blend-multiply z-10 hidden md:block">
                        <Flower2 className="w-16 h-16 text-rose-300 stroke-[1]" />
                    </div>

                    {/* Pressed Flower - Mobile Adj (Smaller) */}
                    <div className="absolute top-16 right-12 opacity-80 pointer-events-none transform rotate-12 mix-blend-multiply z-10 md:hidden">
                        <Flower2 className="w-12 h-12 text-rose-300 stroke-[1]" />
                    </div>

                    {/* Scribbled Heart - Bottom Right */}
                    <div className="absolute bottom-32 right-24 opacity-60 pointer-events-none transform -rotate-12 z-10 hidden md:block">
                        <svg width="60" height="60" viewBox="0 0 100 100" className="text-rose-400 fill-none stroke-current stroke-2">
                            <path d="M50,30 Q70,5 90,30 T50,90 Q30,55 10,30 T50,30" style={{ strokeDasharray: "1000", strokeDashoffset: "0" }} />
                        </svg>
                    </div>


                    {/* Content Container - Mobile Optimized */}
                    {/* Border insets: inset-8 (2rem/32px) mobile, inset-14 (3.5rem/56px) desktop */}
                    {/* Padding: px-12 mobile (48px), px-24 desktop (96px) for proper margin */}
                    <div className="relative z-10 font-handwriting text-slate-800 leading-relaxed md:leading-loose space-y-6 md:space-y-12 
                                    pt-16 pb-12 px-12 
                                    md:pt-28 md:pb-24 md:px-24 
                                    w-full mx-auto text-left">

                        <div className="mb-8 md:mb-12">
                            <p className="text-3xl md:text-6xl font-bold text-sky-900 mb-3 md:mb-4 font-script">My Love,</p>
                            <div className="h-0.5 md:h-1 w-20 md:w-24 bg-pink-300/50 rounded-full transform -rotate-1" />
                        </div>

                        <p className="text-lg md:text-2xl">
                            If someone told 2020-me that my MEC life would lead to this, I would've laughed.
                            And yet here we are.
                        </p>

                        <p className="text-base md:text-xl pl-4 md:pl-6 border-l-2 md:border-l-4 border-pink-200/50 italic text-slate-600">
                            Somewhere between "just friends" and "why are you smiling at your phone like that," you quietly became my favorite person.
                        </p>

                        <p className="text-lg md:text-2xl">
                            You slipped into my life so naturally that I don't even remember the exact moment it changed — I just know that one day, you weren't optional anymore. You were essential. <br />
                            <span className="bg-pink-100/50 px-2 py-0.5 rounded-sm inline-block transform rotate-1 mt-2 text-base md:text-xl">You became my daily prayer.</span>
                        </p>

                        <p className="text-lg md:text-2xl">
                            You have this very annoying talent of living in my head rent-free.
                        </p>

                        <div className="pl-4 md:pl-6 space-y-2 md:space-y-3 text-base md:text-xl text-slate-700 border-l-2 border-slate-200 ml-1 md:ml-2">
                            <p>You've seen me dramatic.</p>
                            <p>You've seen me overthink.</p>
                            <p>You've seen me pretend I'm not soft and My fake "I don't care" attitude.</p>
                        </div>

                        <p className="text-xl md:text-4xl text-center font-script text-sky-800/80 py-4 md:py-6 transform -rotate-1">
                            And instead of running away, you stayed.
                        </p>

                        <p className="text-lg md:text-2xl">
                            You argue with me, but you also pull me closer.<br />
                            You annoy me, but you also kiss my forehead.<br />
                            You expose my fake anger in under five minutes.
                        </p>

                        <p className="text-base md:text-lg text-slate-500 italic text-right pr-4 md:pr-12">
                            It's unfair, honestly.
                        </p>

                        <p className="text-lg md:text-2xl">
                            Loving you feels like chaos and calm at the same time.<br />
                            Like laughing mid-fight.<br />
                            Like missing someone who is very much yours.<br />
                            Like counting days but never doubting the choice.
                        </p>

                        <div className="py-6 md:py-8 border-t border-b double-border-slate-200 my-6 md:my-8 text-center space-y-2 md:space-y-3 relative">
                            <Stars className="w-6 md:w-8 h-6 md:h-8 text-yellow-400 mx-auto mb-3 md:mb-4 animate-pulse" />
                            <p className="text-lg md:text-2xl">You're not just my boyfriend.</p>
                            <p className="text-lg md:text-2xl">You're my comfort place.</p>
                            <p className="text-xl md:text-3xl font-bold text-sky-700 font-script">My favorite distraction.</p>
                            <p className="text-lg md:text-2xl">My safe chaos.</p>
                        </div>

                        <p className="text-lg md:text-2xl">
                            Distance has tried us.<br />
                            Timing has tested us.<br />
                            My mood swings have definitely tested you.
                        </p>

                        <p className="text-2xl md:text-5xl font-script text-center text-rose-400 py-3 md:py-4 transform rotate-1">
                            But you still choose me.
                        </p>

                        <p className="text-lg md:text-2xl">
                            And that's the part that undoes me every time.
                        </p>

                        <p className="text-lg md:text-2xl">
                            You're not just the person I love.<br />
                            You're the person I want to tell everything to.<br />
                            The one I mentally run to when something funny happens.<br />
                            The one I imagine next to me in rooms you're not even in yet.
                        </p>

                        <p className="text-lg md:text-2xl pl-4 md:pl-6 border-l-2 md:border-l-4 border-sky-200">
                            If love is dramatic, loud, soft, stubborn, and slightly unhinged —
                            then I guess we're doing it perfectly.
                        </p>

                        <p className="text-lg md:text-2xl">
                            And if I had to do it all over again?<br />
                            I'd still pick you.<br />
                            Even knowing you'd steal my peace, my sleep, and my entire heart.<br />
                            <span className="text-3xl md:text-5xl font-script text-rose-500 block mt-3 md:mt-4">Always you.</span>
                        </p>

                        {/* Signature Ending - With Extra Space at Bottom */}
                        <div className="pt-16 md:pt-24 pb-8 md:pb-12 text-right relative">
                            <p className="text-2xl md:text-3xl text-slate-600 mb-4 md:mb-6 font-handwriting">Always yours,</p>
                            <div className="inline-block relative transform -rotate-6">
                                <p className="text-5xl md:text-8xl text-sky-800 font-script z-10 relative">
                                    Tresa
                                </p>
                                {/* Scribble underline under signature */}
                                <svg className="absolute -bottom-4 md:-bottom-6 left-0 w-[120%] -ml-[10%] h-8 md:h-12 text-sky-200/60" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0,5 Q50,15 100,5" fill="none" stroke="currentColor" strokeWidth="3" />
                                </svg>
                            </div>
                            <p className="text-xs md:text-base text-slate-400 mt-6 md:mt-8 font-sans tracking-[0.15em] md:tracking-[0.2em] uppercase">(whether you like it or not) 🤍</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
