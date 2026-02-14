"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Background from "@/components/Background";
import UnlockScreen from "@/components/UnlockScreen";
import TermsSection from "@/components/TermsSection";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);

    return (
        <>
            {!isUnlocked && <UnlockScreen onUnlock={() => setIsUnlocked(true)} />}

            {isUnlocked && !isTermsAccepted && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative z-50"
                >
                    <Background /> {/* Valid to have background here too for aesthetics */}
                    <TermsSection onAccept={() => setIsTermsAccepted(true)} />
                </motion.div>
            )}

            {isUnlocked && isTermsAccepted && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <Background />
                    <main className="min-h-screen relative z-0">
                        {children}
                    </main>
                </motion.div>
            )}
        </>
    );
}
