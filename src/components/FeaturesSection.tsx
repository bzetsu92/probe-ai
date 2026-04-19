"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "@/lib/useInView";

// Icons mapped by feature index
const FEATURE_ICONS = [
    // Write/No-code
    <svg key="nocode" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    // Figma / Design
    <svg key="figma" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/></svg>,
    // Analysis/Bug
    <svg key="analysis" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>,
    // Self-healing / Sync
    <svg key="heal" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>,
    // Parallel / Speed
    <svg key="parallel" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    // Workflow / Plug
    <svg key="workflow" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
];

const ICON_COLORS = [
    "var(--accent)",
    "var(--accent2)",
    "var(--accent3)",
    "var(--green)",
    "var(--accent)",
    "var(--accent2)",
];

const ICON_BG_COLORS = [
    "rgba(0,229,255,0.08)",
    "rgba(123,97,255,0.08)",
    "rgba(255,77,109,0.08)",
    "rgba(0,255,163,0.08)",
    "rgba(0,229,255,0.08)",
    "rgba(123,97,255,0.08)",
];

export function FeaturesSection() {
    const t = useTranslations("features");
    const { ref, inView } = useInView();
    const cards = t.raw("cards") as Array<{ icon: string; title: string; desc: string; tag: string }>;

    return (
        <section id="features" className="py-20 sm:py-28">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref as React.Ref<HTMLDivElement>}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-14 sm:mb-20"
                >
                    <span className="section-label">{t("label")}</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mt-2" style={{ fontFamily: "var(--font-syne)" }}>
                        {t("title1")}<br />{t("title2")}
                    </h2>
                    <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed max-w-2xl" style={{ color: "var(--text-dim)" }}>
                        {t("subtitle")}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cards.map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 24 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.08, duration: 0.6 }}
                            className="group relative rounded-2xl p-6 sm:p-8 card-hover"
                            style={{
                                background: "var(--surface)",
                                border: "1px solid var(--border)",
                            }}
                        >
                            {/* Top glow line on hover */}
                            <div
                                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-t-2xl"
                                style={{
                                    background: `linear-gradient(90deg, transparent, ${ICON_COLORS[i]}, transparent)`,
                                }}
                            />

                            {/* Icon */}
                            <div
                                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 flex-shrink-0"
                                style={{
                                    background: ICON_BG_COLORS[i],
                                    color: ICON_COLORS[i],
                                    border: `1px solid ${ICON_COLORS[i]}22`,
                                }}
                            >
                                {FEATURE_ICONS[i]}
                            </div>

                            <div className="mb-5">
                                <h3 className="text-lg sm:text-xl font-bold tracking-tight mb-2.5" style={{ fontFamily: "var(--font-syne)" }}>
                                    {card.title}
                                </h3>
                                <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-dim)" }}>
                                    {card.desc}
                                </p>
                            </div>

                            <span
                                className="tag-pill"
                                style={{
                                    background: `${ICON_BG_COLORS[i]}`,
                                    color: ICON_COLORS[i],
                                    borderColor: `${ICON_COLORS[i]}22`,
                                }}
                            >
                                {card.tag}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
