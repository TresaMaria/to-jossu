"use client";

import ScrapbookItem from "@/components/ScrapbookItem";
import LandingSection from "@/components/LandingSection";
import TimelineSection from "@/components/TimelineSection";
import ReasonsSection from "@/components/ReasonsSection";
import LoveLetterSection from "@/components/LoveLetterSection";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <LandingSection />

      <div className="flex flex-col items-center justify-center gap-16 pb-32 p-8 min-h-screen relative z-10 bg-[#0f172a]/20">

        {/* Terms & Conditions Section - MOVED TO MODAL IN LAYOUT */}

        {/* Open When Sad Feature */}
        <div className="mt-12">
          <ScrapbookItem rotation={-2} className="p-8 bg-white" hasTape={true}>
            <h1 className="font-handwriting text-5xl md:text-7xl text-blue-900 text-center">
              Our Scrapbook
            </h1>
            <p className="font-sans text-center text-slate-500 mt-2">
              A collection of memories
            </p>
          </ScrapbookItem>
        </div>

        {/* Grid of empty items to demonstrate layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full max-w-6xl">

          <ScrapbookItem rotation={3} className="h-80 p-4 bg-white">
            <div className="relative w-full h-[85%] overflow-hidden">
              <Image
                src="/images/scrapbook/start.jpg"
                alt="First memory"
                fill
                className="object-cover rounded-sm hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="h-[15%] flex items-center justify-center">
              <span className="font-handwriting text-2xl text-slate-600 rotate-[-1deg] pt-2">
                Where it all began...
              </span>
            </div>
          </ScrapbookItem>

          <ScrapbookItem rotation={-2} className="h-80 flex flex-col items-center justify-center p-8 bg-[#fffdf5] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-8 bg-black/5 rotate-[-5deg] translate-y-[-10px] blur-sm"></div>
            <p className="font-handwriting text-3xl text-slate-700 text-center leading-relaxed drop-shadow-sm">
              "Every moment with you is a page I want to bookmark forever."
            </p>
            <span className="font-sans text-xs text-slate-400 mt-6 tracking-widest uppercase border-t border-slate-300 pt-2 w-1/2 text-center">
              Chapter One
            </span>
          </ScrapbookItem>

          <ScrapbookItem rotation={2} className="h-80 p-4 bg-white">
            <div className="relative w-full h-[85%] overflow-hidden">
              <Image
                src="/images/scrapbook/sc-img2.jpg"
                alt="Adventures"
                fill
                className="object-cover rounded-sm hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="h-[15%] flex items-center justify-center">
              <span className="font-handwriting text-2xl text-slate-600 rotate-[2deg] pt-2">
                Chaos & Cuddles ❤️
              </span>
            </div>
          </ScrapbookItem>

        </div>

        {/* Timeline Section */}
        <div className="w-full mt-32">
          <TimelineSection />
        </div>

        {/* Reasons Section */}
        <div className="w-full mt-32">
          <ReasonsSection />
        </div>

        {/* Love Letter Section */}
        <div className="w-full">
          <LoveLetterSection />
        </div>

        {/* Open When Sad Feature */}
      </div>
    </main>
  );
}
