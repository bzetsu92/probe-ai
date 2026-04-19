"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "@/lib/useInView";

const STEPS = [
    { type: "AI", keyI18n: "compile" },
    { type: "DET", keyI18n: "bind" },
    { type: "DET", keyI18n: "execute" },
    { type: "AI", keyI18n: "analyze" },
];

const STEP_ICONS = [
    // Pen/Write
    <svg key="compile" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    // Settings
    <svg key="bind" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M19.07 19.07l-1.41-1.41M4.93 19.07l1.41-1.41M12 2v2M12 20v2M2 12h2M20 12h2"/></svg>,
    // Play
    <svg key="execute" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
    // Chart
    <svg key="analyze" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
];

export function PipelineSection() {
    const t = useTranslations("pipeline");
    const { ref, inView } = useInView();

    return (
        <section id="pipeline" className="py-20 sm:py-28 relative">
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "linear-gradient(180deg, var(--bg) 0%, var(--surface) 50%, var(--bg) 100%)",
                }}
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref as React.Ref<HTMLDivElement>}>
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 sm:mb-20"
                >
                    <div className="flex justify-center mb-5">
                        <span className="section-label">{t("label")}</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight" style={{ fontFamily: "var(--font-syne)" }}>
                        {t("title1")}<br />{t("title2")}
                    </h2>
                    <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto px-4" style={{ color: "var(--text-dim)" }}>
                        {t("subtitle")}
                    </p>
                </motion.div>

                {/* Steps grid */}
                <div className="relative">
                    {/* Connector line */}
                    <div
                        className="hidden md:block absolute top-[52px] left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-px"
                        style={{
                            background: "linear-gradient(90deg, transparent 0%, var(--accent2) 20%, var(--accent) 50%, var(--accent2) 80%, transparent 100%)",
                            opacity: 0.25,
                        }}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
                        {STEPS.map((step, i) => (
                            <motion.div
                                key={step.keyI18n}
                                initial={{ opacity: 0, y: 32 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: i * 0.12, duration: 0.6 }}
                                className="relative"
                            >
                                <div
                                    className="rounded-2xl p-6 text-center card-hover h-full relative overflow-hidden"
                                    style={{
                                        background: "var(--surface)",
                                        border: "1px solid var(--border)",
                                    }}
                                >
                                    {/* Top gradient accent */}
                                    <div
                                        className="absolute top-0 left-0 right-0 h-[2px]"
                                        style={{
                                            background: step.type === "AI"
                                                ? "linear-gradient(90deg, transparent, rgba(123,97,255,0.7), transparent)"
                                                : "linear-gradient(90deg, transparent, rgba(0,229,255,0.6), transparent)",
                                        }}
                                    />

                                    {/* Step badge */}
                                    <div
                                        className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 relative z-10"
                                        style={{
                                            background: step.type === "AI"
                                                ? "linear-gradient(135deg, rgba(123,97,255,0.2), rgba(0,229,255,0.15))"
                                                : "linear-gradient(135deg, rgba(0,229,255,0.2), rgba(0,255,163,0.15))",
                                            border: `1px solid ${step.type === "AI" ? "rgba(123,97,255,0.3)" : "rgba(0,229,255,0.25)"}`,
                                            color: step.type === "AI" ? "var(--accent2)" : "var(--accent)",
                                        }}
                                    >
                                        {STEP_ICONS[i]}
                                    </div>

                                    {/* Type tag */}
                                    <div className="flex justify-center mb-3">
                                        <span
                                            className="text-[10px] font-bold tracking-widest px-2 py-0.5 rounded"
                                            style={{
                                                fontFamily: "var(--font-mono)",
                                                background: step.type === "AI" ? "rgba(123,97,255,0.12)" : "rgba(0,229,255,0.08)",
                                                color: step.type === "AI" ? "var(--accent2)" : "var(--accent)",
                                            }}
                                        >
                                            {step.type === "AI" ? "AI ✦" : "AUTO"}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold tracking-tight mb-2" style={{ fontFamily: "var(--font-syne)" }}>
                                        {t(`steps.${step.keyI18n}.label`)}
                                    </h3>
                                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-dim)" }}>
                                        {t(`steps.${step.keyI18n}.desc`)}
                                    </p>

                                    {/* Step number */}
                                    <div
                                        className="absolute bottom-4 right-4 text-[10px] font-bold"
                                        style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)", opacity: 0.5 }}
                                    >
                                        0{i + 1}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
