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
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 sm:mb-20"
                >
                    <div className="text-sm uppercase tracking-widest mb-4" style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}>
            // {t("label")}
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight" style={{ fontFamily: "var(--font-syne)" }}>
                        {t("title1")}<br />{t("title2")}
                    </h2>
                    <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto px-4" style={{ color: "var(--text-dim)" }}>
                        {t("subtitle")}
                    </p>
                </motion.div>

                <div className="relative">
                    <div
                        className="hidden md:block absolute top-1/2 left-0 right-0 h-px -translate-y-1/2"
                        style={{
                            background: "linear-gradient(90deg, transparent, var(--accent), var(--accent2), var(--accent), transparent)",
                            opacity: 0.2,
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
                                    className="rounded-2xl p-6 text-center card-hover h-full"
                                    style={{
                                        background: "var(--surface)",
                                        border: "1px solid var(--border)",
                                    }}
                                >
                                    <div
                                        className="inline-flex items-center justify-center w-10 h-10 rounded-full mb-4 text-sm font-bold"
                                        style={{
                                            fontFamily: "var(--font-mono)",
                                            background: step.type === "AI"
                                                ? "linear-gradient(135deg, rgba(123,97,255,0.2), rgba(0,229,255,0.15))"
                                                : "linear-gradient(135deg, rgba(0,229,255,0.2), rgba(0,255,163,0.15))",
                                            border: `1px solid ${step.type === "AI" ? "rgba(123,97,255,0.3)" : "rgba(0,229,255,0.25)"}`,
                                            color: "var(--accent)",
                                        }}
                                    >
                                        {i + 1}
                                    </div>

                                    <h3 className="text-lg font-bold tracking-tight mb-3" style={{ fontFamily: "var(--font-syne)" }}>
                                        {t(`steps.${step.keyI18n}.label`)}
                                    </h3>
                                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-dim)" }}>
                                        {t(`steps.${step.keyI18n}.desc`)}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
