"use client";

import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

/* ─────────────────────────────────────────
   Typewriter hook
───────────────────────────────────────── */
function useTypewriter(text: string, delay = 700, speed = 20) {
    const [displayed, setDisplayed] = useState("");
    const [done, setDone] = useState(false);

    useEffect(() => {
        setDisplayed("");
        setDone(false);
        let i = 0;
        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                i++;
                setDisplayed(text.slice(0, i));
                if (i >= text.length) {
                    clearInterval(interval);
                    setDone(true);
                }
            }, speed);
            return () => clearInterval(interval);
        }, delay);
        return () => clearTimeout(timeout);
    }, [text, delay, speed]);

    return { displayed, done };
}

/* ─────────────────────────────────────────
   Headline — word-by-word spring entrance
───────────────────────────────────────── */
const EASE_SPRING = [0.22, 1, 0.36, 1] as [number, number, number, number];

const wordVariants: Variants = {
    hidden: { opacity: 0, y: 40, rotateX: -20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            delay: 0.08 + i * 0.1,
            duration: 0.55,
            ease: EASE_SPRING,
        },
    }),
};

function AnimatedHeadline({ line1, line2 }: { line1: string; line2: string }) {
    const words1 = line1.split(" ");
    const words2 = line2.split(" ");

    return (
        <h1
            className="mb-6 sm:mb-8"
            style={{
                fontFamily: "var(--font-syne)",
                fontSize: "clamp(40px, 8vw, 88px)",
                fontWeight: 800,
                letterSpacing: "-2px",
                lineHeight: 1.05,
                perspective: "800px",
            }}
        >
            {/* Line 1 */}
            <span className="block overflow-hidden">
                {words1.map((word, i) => (
                    <motion.span
                        key={`l1-${i}`}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={wordVariants}
                        className="inline-block mr-[0.22em]"
                    >
                        {word}
                    </motion.span>
                ))}
            </span>
            {/* Line 2 — gradient color */}
            <span className="block mt-2 overflow-hidden">
                {words2.map((word, i) => (
                    <motion.span
                        key={`l2-${i}`}
                        custom={words1.length + i}
                        initial="hidden"
                        animate="visible"
                        variants={wordVariants}
                        className="inline-block mr-[0.22em] gradient-text"
                    >
                        {word}
                    </motion.span>
                ))}
            </span>
        </h1>
    );
}

/* ─────────────────────────────────────────
   Floating "live test" badges
───────────────────────────────────────── */
const LIVE_BADGES = [
    { text: "✓  Login test passed",  color: "#00ffa3", delay: 1.0, x: "6%",   y: "24%" },
    { text: "✓  Checkout: OK",       color: "#00e5ff", delay: 1.8, x: "76%",  y: "20%" },
    { text: "⚡ 3 tests running…",   color: "#a78bfa", delay: 1.4, x: "4%",   y: "66%" },
    { text: "✓  Signup: 230 ms",     color: "#00ffa3", delay: 2.5, x: "80%",  y: "70%" },
    { text: "🛡  Coverage: 95%",      color: "#00e5ff", delay: 3.0, x: "68%",  y: "42%" },
];

function LiveBadge({ text, color, delay, x, y }: typeof LIVE_BADGES[0]) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.75, y: 10 }}
            animate={{
                opacity: [0, 1, 1, 0],
                scale:   [0.75, 1, 1, 0.92],
                y:       [10, 0, 0, -8],
            }}
            transition={{
                delay,
                duration: 3.5,
                repeat: Infinity,
                repeatDelay: 4 + delay * 0.8,
                ease: "easeOut",
            }}
            className="absolute pointer-events-none hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold"
            style={{
                left: x,
                top: y,
                background: `${color}18`,
                border: `1px solid ${color}45`,
                color,
                fontFamily: "var(--font-mono)",
                backdropFilter: "blur(10px)",
                whiteSpace: "nowrap",
                zIndex: 5,
                boxShadow: `0 0 20px ${color}20`,
            }}
        >
            {text}
        </motion.div>
    );
}

/* Mouse spotlight is handled globally by PageSpotlight in layout.tsx */

/* ─────────────────────────────────────────
   Main component
───────────────────────────────────────── */
const SOCIAL_PROOF_INITIALS = ["AK", "MB", "JS", "LP", "RC"];
const SOCIAL_PROOF_COLORS   = ["#7b61ff", "#00e5ff", "#00ffa3", "#ff4d6d", "#ff8c00"];

export function HeroSection() {
    const t = useTranslations("hero");
    const subtitleFull = t("subtitle");
    const { displayed, done } = useTypewriter(subtitleFull, 700, 20);

    return (
        <section
            className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 overflow-hidden"
            id="hero"
        >
            {/* Background orbs */}
            <div
                className="absolute pointer-events-none rounded-full"
                style={{
                    width: 900, height: 900,
                    top: -450, right: -250,
                    background: "radial-gradient(circle, rgba(123,97,255,0.18) 0%, transparent 70%)",
                    filter: "blur(110px)",
                    zIndex: 1,
                }}
            />
            <div
                className="absolute pointer-events-none rounded-full"
                style={{
                    width: 700, height: 700,
                    bottom: -350, left: -200,
                    background: "radial-gradient(circle, rgba(0,229,255,0.14) 0%, transparent 70%)",
                    filter: "blur(110px)",
                    zIndex: 1,
                }}
            />

            <div className="absolute inset-0 grid-bg pointer-events-none" style={{ zIndex: 1 }} />
            {LIVE_BADGES.map((badge) => (
                <LiveBadge key={badge.text} {...badge} />
            ))}

            <div className="relative max-w-5xl mx-auto text-center" style={{ zIndex: 10 }}>
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.05 }}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8 sm:mb-10 text-xs sm:text-sm font-medium"
                    style={{
                        background: "rgba(0,229,255,0.08)",
                        border: "1px solid rgba(0,229,255,0.22)",
                        color: "var(--accent)",
                    }}
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] pulse-dot" />
                    {t("badge")}
                </motion.div>

                {/* Headline */}
                <AnimatedHeadline line1={t("title1")} line2={t("title2")} />

                {/* Subtitle — typewriter */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.35, delay: 0.6 }}
                    className="mb-10 sm:mb-12 text-base sm:text-xl leading-relaxed font-normal max-w-2xl mx-auto px-4 min-h-[5rem] sm:min-h-[3.5rem]"
                    style={{ color: "#c9d1e0" /* brighter than var(--text-dim) */ }}
                >
                    {displayed}
                    {!done && (
                        <span className="typing-cursor" />
                    )}
                </motion.div>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.55, ease: EASE_SPRING }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
                >
                    <a
                        href="#cta"
                        className="btn-shimmer w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm sm:text-base font-bold no-underline transition-all duration-300 hover:translate-y-[-2px] active:scale-[0.98]"
                        style={{
                            fontFamily: "var(--font-syne)",
                            background: "var(--accent)",
                            color: "#000",
                            boxShadow: "0 0 40px rgba(0,229,255,0.35)",
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 70px rgba(0,229,255,0.60)";
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(0,229,255,0.35)";
                        }}
                    >
                        {t("cta")} →
                    </a>
                    <a
                        href="#pipeline"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm sm:text-base font-medium no-underline transition-all duration-300 hover:bg-white/[0.06] active:scale-[0.98]"
                        style={{
                            color: "var(--text)",
                            border: "1px solid rgba(255,255,255,0.16)",
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.28)";
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.16)";
                        }}
                    >
                        {t("ctaSecondary")}
                    </a>
                </motion.div>

                {/* Social proof */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.05, duration: 0.5 }}
                    className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
                >
                    <div className="flex items-center">
                        {SOCIAL_PROOF_INITIALS.map((initials, i) => (
                            <div
                                key={i}
                                className="w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 border-[var(--bg)]"
                                style={{
                                    background: `${SOCIAL_PROOF_COLORS[i]}28`,
                                    color: SOCIAL_PROOF_COLORS[i],
                                    marginLeft: i > 0 ? "-10px" : "0",
                                    zIndex: SOCIAL_PROOF_INITIALS.length - i,
                                    position: "relative",
                                    fontSize: "0.65rem",
                                }}
                            >
                                {initials}
                            </div>
                        ))}
                    </div>
                    <p className="text-sm" style={{ color: "#b0baca" }}>
                        <span style={{ color: "#e8edf5", fontWeight: 600 }}>500+ teams</span>
                        {" "}trust ProbeAI to ship faster
                    </p>
                </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 glow-line" style={{ zIndex: 10 }} />
        </section>
    );
}
