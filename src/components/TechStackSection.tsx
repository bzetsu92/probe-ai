"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "@/lib/useInView";

// Tool icon initials + accent colors
const TOOL_META: Record<string, { letter: string; bg: string; color: string }> = {
    "GitHub Actions":   { letter: "GH", bg: "rgba(30,30,30,0.8)",         color: "#e6edf3" },
    "GitLab CI":        { letter: "GL", bg: "rgba(252,109,38,0.12)",       color: "#fc6d26" },
    "Figma":            { letter: "Fi", bg: "rgba(162,89,255,0.12)",        color: "#a259ff" },
    "Slack":            { letter: "Sl", bg: "rgba(74,21,75,0.2)",           color: "#e01e5a" },
    "Jira":             { letter: "Ji", bg: "rgba(0,82,204,0.12)",          color: "#0052cc" },
    "Jenkins":          { letter: "Je", bg: "rgba(210,53,42,0.12)",         color: "#d2352a" },
    "Datadog":          { letter: "DD", bg: "rgba(99,52,207,0.12)",         color: "#6334cf" },
    "Any Web App":      { letter: "W",  bg: "rgba(0,229,255,0.08)",         color: "var(--accent)" },
};

function ToolAvatar({ name }: { name: string }) {
    const meta = TOOL_META[name] ?? { letter: name.charAt(0), bg: "rgba(255,255,255,0.06)", color: "var(--text-dim)" };
    return (
        <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0"
            style={{
                background: meta.bg,
                color: meta.color,
                border: `1px solid ${meta.color}30`,
                fontFamily: "var(--font-mono)",
            }}
        >
            {meta.letter}
        </div>
    );
}

export function TechStackSection() {
    const t = useTranslations("stack");
    const { ref, inView } = useInView();
    const items = t.raw("items") as Array<{ icon: string; name: string; detail: string }>;

    return (
        <section id="stack" className="py-20 sm:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref as React.Ref<HTMLDivElement>}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <div className="flex justify-center mb-5">
                        <span className="section-label">{t("label")}</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight" style={{ fontFamily: "var(--font-syne)" }}>
                        {t("title1")}<br />{t("title2")}
                    </h2>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                    {items.map((item, i) => {
                        const meta = TOOL_META[item.name] ?? { letter: item.name.charAt(0), bg: "rgba(255,255,255,0.06)", color: "var(--text-dim)" };
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={inView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: i * 0.06, duration: 0.5 }}
                                className="group rounded-xl p-4 sm:p-5 card-hover flex items-center gap-3"
                                style={{
                                    background: "var(--surface)",
                                    border: "1px solid var(--border)",
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.borderColor = `${meta.color}33`;
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                                }}
                            >
                                <ToolAvatar name={item.name} />
                                <div className="min-w-0">
                                    <h3 className="text-sm sm:text-base font-bold truncate" style={{ fontFamily: "var(--font-syne)" }}>
                                        {item.name}
                                    </h3>
                                    <p className="text-xs mt-0.5 truncate" style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>
                                        {item.detail}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
