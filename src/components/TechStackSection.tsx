"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "@/lib/useInView";

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
                    <div className="text-sm uppercase tracking-widest mb-4" style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}>
            // {t("label")}
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight" style={{ fontFamily: "var(--font-syne)" }}>
                        {t("title1")}<br />{t("title2")}
                    </h2>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: i * 0.06, duration: 0.5 }}
                            className="group rounded-xl p-5 sm:p-6 card-hover"
                            style={{
                                background: "var(--surface)",
                                border: "1px solid var(--border)",
                            }}
                        >
                            <div className="mb-4">
                                <h3 className="text-sm sm:text-base font-bold" style={{ fontFamily: "var(--font-syne)" }}>
                                    {item.name}
                                </h3>
                            </div>
                            <p className="text-xs sm:text-sm" style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>
                                {item.detail}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
