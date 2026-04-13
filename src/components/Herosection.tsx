"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
});

export function HeroSection() {
    const t = useTranslations("hero");

    return (
        <section
            className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 overflow-hidden"
            id="hero"
        >
            <div
                className="absolute pointer-events-none rounded-full"
                style={{
                    width: 800, height: 800,
                    top: -400, right: -200,
                    background: "radial-gradient(circle, rgba(123,97,255,0.12) 0%, transparent 70%)",
                    filter: "blur(100px)",
                }}
            />
            <div
                className="absolute pointer-events-none rounded-full"
                style={{
                    width: 600, height: 600,
                    bottom: -300, left: -150,
                    background: "radial-gradient(circle, rgba(0,229,255,0.1) 0%, transparent 70%)",
                    filter: "blur(100px)",
                }}
            />

            <div className="relative z-10 max-w-5xl mx-auto text-center">
                <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8 sm:mb-10 text-xs sm:text-sm font-medium"
                    style={{
                        background: "rgba(0,229,255,0.06)",
                        border: "1px solid rgba(0,229,255,0.15)",
                        color: "var(--accent)",
                    }}
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] pulse-dot" />
                    {t("badge")}
                </motion.div>

                <motion.h1
                    {...fadeUp(0.1)}
                    className="mb-6 sm:mb-8"
                    style={{
                        fontFamily: "var(--font-syne)",
                        fontSize: "clamp(40px, 8vw, 88px)",
                        fontWeight: 800,
                        letterSpacing: "-2px",
                        lineHeight: 1.05,
                    }}
                >
                    <span className="block">{t("title1")}</span>
                    <span className="block gradient-text mt-2">{t("title2")}</span>
                </motion.h1>

                <motion.p
                    {...fadeUp(0.2)}
                    className="mb-10 sm:mb-12 text-base sm:text-xl leading-relaxed font-normal max-w-2xl mx-auto px-4"
                    style={{ color: "var(--text-dim)" }}
                >
                    {t("subtitle")}
                </motion.p>

                <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
                    <a
                        href="#cta"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm sm:text-base font-bold no-underline transition-all duration-300 hover:translate-y-[-2px] active:scale-[0.98]"
                        style={{
                            fontFamily: "var(--font-syne)",
                            background: "var(--accent)",
                            color: "#000",
                            boxShadow: "0 0 40px rgba(0,229,255,0.25)",
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 60px rgba(0,229,255,0.45)";
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(0,229,255,0.25)";
                        }}
                    >
                        {t("cta")} →
                    </a>
                    <a
                        href="#pipeline"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm sm:text-base font-medium no-underline transition-all duration-300 hover:bg-white/[0.04] active:scale-[0.98]"
                        style={{
                            color: "var(--text)",
                            border: "1px solid rgba(255,255,255,0.12)",
                        }}
                    >
                        {t("ctaSecondary")}
                    </a>
                </motion.div>

                <motion.div
                    {...fadeUp(0.4)}
                    className="mt-20 sm:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 px-4"
                >
                    {[
                        { value: "10x", label: "Faster Testing" },
                        { value: "95%", label: "Coverage" },
                        { value: "500+", label: "Teams" },
                        { value: "24/7", label: "AI Powered" },
                    ].map((stat, i) => (
                        <div
                            key={i}
                            className="rounded-xl p-4 sm:p-6 text-center"
                            style={{
                                background: "rgba(255,255,255,0.02)",
                                border: "1px solid var(--border)",
                            }}
                        >
                            <div
                                className="text-2xl sm:text-3xl font-extrabold mb-2"
                                style={{ fontFamily: "var(--font-syne)", color: "var(--accent)" }}
                            >
                                {stat.value}
                            </div>
                            <div className="text-xs sm:text-sm" style={{ color: "var(--text-dim)" }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 glow-line" />
        </section>
    );
}
