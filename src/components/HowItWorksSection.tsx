"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "@/lib/useInView";

export function HowItWorksSection() {
    const t = useTranslations("howItWorks");
    const { ref, inView } = useInView();
    const steps = t.raw("steps") as Array<{ num: string; title: string; text: string; code: string | null }>;

    return (
        <section id="how" className="py-20 sm:py-28" style={{ background: "linear-gradient(180deg, var(--bg) 0%, var(--surface) 100%)" }}>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref as React.Ref<HTMLDivElement>}>
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
                    <p className="mt-4 sm:mt-5 text-base sm:text-lg leading-relaxed max-w-xl mx-auto px-4" style={{ color: "var(--text-dim)" }}>
                        {t("subtitle")}
                    </p>
                </motion.div>

                <div className="relative max-w-3xl mx-auto">
                    {/* Timeline line */}
                    <div
                        className="absolute left-[19px] sm:left-[23px] top-0 bottom-0 w-px"
                        style={{
                            background: "linear-gradient(180deg, var(--accent2) 0%, var(--accent) 50%, transparent 100%)",
                            opacity: 0.25,
                        }}
                    />

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -24 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: i * 0.13, duration: 0.6 }}
                            className="flex gap-4 sm:gap-6 lg:gap-8 py-6 sm:py-8"
                        >
                            {/* Step number circle */}
                            <div
                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 text-xs sm:text-sm font-bold"
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    background: "var(--bg)",
                                    border: "1px solid rgba(0,229,255,0.2)",
                                    color: "var(--accent)",
                                    boxShadow: "0 0 16px rgba(0,229,255,0.1)",
                                }}
                            >
                                {step.num}
                            </div>

                            <div className="flex-1 pt-0.5 sm:pt-1">
                                <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2 sm:mb-3" style={{ fontFamily: "var(--font-syne)" }}>
                                    {step.title}
                                </h3>
                                <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-dim)" }}>
                                    {step.text}
                                </p>
                                {step.code && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={inView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: i * 0.13 + 0.2, duration: 0.4 }}
                                        className="mt-4 sm:mt-5 rounded-xl overflow-hidden"
                                        style={{
                                            border: "1px solid rgba(255,255,255,0.07)",
                                        }}
                                    >
                                        <div className="terminal-header">
                                            <span className="terminal-dot" style={{ background: "#ff5f57" }} />
                                            <span className="terminal-dot" style={{ background: "#febc2e" }} />
                                            <span className="terminal-dot" style={{ background: "#28c840" }} />
                                            <span
                                                className="ml-2 text-xs"
                                                style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
                                            >
                                                probe-config.yaml
                                            </span>
                                        </div>
                                        <div
                                            className="p-4 sm:p-5 text-xs sm:text-sm leading-relaxed whitespace-pre overflow-x-auto"
                                            style={{
                                                fontFamily: "var(--font-mono)",
                                                background: "var(--surface2)",
                                                color: "var(--text-dim)",
                                            }}
                                        >
                                            {step.code.split("\n").map((line, li) => {
                                                const isKey = line.includes(":") && !line.trimStart().startsWith("-") && !line.trimStart().startsWith('"');
                                                const isValue = line.trimStart().startsWith("-") || line.trimStart().startsWith('"');
                                                const isComment = line.trimStart().startsWith("#");
                                                return (
                                                    <div key={li}>
                                                        {isComment ? (
                                                            <span style={{ color: "var(--text-muted)" }}>{line}</span>
                                                        ) : isKey ? (
                                                            <>
                                                                <span style={{ color: "var(--accent)" }}>{line.split(":")[0]}</span>
                                                                <span style={{ color: "var(--text-dim)" }}>:{line.split(":").slice(1).join(":")}</span>
                                                            </>
                                                        ) : isValue ? (
                                                            <span style={{ color: "var(--green)" }}>{line}</span>
                                                        ) : (
                                                            <span>{line}</span>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
