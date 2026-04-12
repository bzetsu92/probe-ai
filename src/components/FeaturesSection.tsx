"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "@/lib/useInView";

export function FeaturesSection() {
  const t = useTranslations("features");
  const { ref, inView } = useInView();
  const cards = t.raw("cards") as Array<{ icon: string; title: string; desc: string; tag: string }>;

  return (
    <section id="features" className="py-28">
      <div className="max-w-5xl mx-auto px-10" ref={ref as React.Ref<HTMLDivElement>}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-sm uppercase tracking-widest mb-4" style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}>
            // {t("label")}
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight" style={{ fontFamily: "var(--font-syne)" }}>
            {t("title1")}<br />{t("title2")}
          </h2>
          <p className="mt-5 text-lg leading-relaxed max-w-lg" style={{ color: "var(--text-dim)" }}>
            {t("subtitle")}
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 overflow-hidden rounded-2xl"
          style={{ border: "1px solid rgba(255,255,255,0.1)" }}
        >
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="relative p-10 group cursor-default transition-colors duration-300 overflow-hidden"
              style={{ background: "var(--surface)", borderRight: i % 3 !== 2 ? "1px solid var(--border)" : "none", borderBottom: i < 3 ? "1px solid var(--border)" : "none" }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: "linear-gradient(135deg, rgba(123,97,255,0.07) 0%, transparent 60%)" }}
              />

              <span className="text-4xl mb-5 block">{card.icon}</span>
              <h3 className="text-xl font-bold tracking-tight mb-3" style={{ fontFamily: "var(--font-syne)" }}>
                {card.title}
              </h3>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-dim)" }}>
                {card.desc}
              </p>
              <span
                className="inline-block mt-5 text-xs px-2.5 py-1 rounded"
                style={{
                  fontFamily: "var(--font-mono)",
                  background: "rgba(0,229,255,0.08)",
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
