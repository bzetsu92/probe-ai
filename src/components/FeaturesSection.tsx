"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "@/lib/useInView";

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
                    className="mb-16 sm:mb-20"
                >
                    <div className="text-sm uppercase tracking-widest mb-4" style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}>
            // {t("label")}
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight" style={{ fontFamily: "var(--font-syne)" }}>
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
                            <div
                                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{
                                    background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
                                }}
                            />

                            <div className="mb-6">
                                <h3 className="text-xl font-bold tracking-tight mb-3" style={{ fontFamily: "var(--font-syne)" }}>
                                    {card.title}
                                </h3>
                                <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-dim)" }}>
                                    {card.desc}
                                </p>
                            </div>

                            <span
                                className="inline-block text-xs px-3 py-1.5 rounded-lg"
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    background: "rgba(0,229,255,0.06)",
                                    color: "var(--accent)",
                                    letterSpacing: "0.05em",
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
