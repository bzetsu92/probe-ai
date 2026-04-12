"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "@/lib/useInView";

export function TechStackSection() {
  const t = useTranslations("stack");
  const { ref, inView } = useInView();
  const items = t.raw("items") as Array<{ icon: string; name: string; detail: string }>;

  return (
    <section id="stack" className="py-24">
      <div className="max-w-5xl mx-auto px-10" ref={ref as React.Ref<HTMLDivElement>}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-sm uppercase tracking-widest mb-4" style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}>
            // {t("label")}
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight" style={{ fontFamily: "var(--font-syne)" }}>
            {t("title1")}<br />{t("title2")}
          </h2>
        </motion.div>

        <div
          className="grid grid-cols-2 md:grid-cols-4 overflow-hidden rounded-xl"
          style={{ border: "1px solid rgba(255,255,255,0.1)" }}
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="p-8 flex flex-col gap-3 group cursor-default transition-colors duration-200"
              style={{
                background: "var(--surface)",
                borderRight: (i + 1) % 4 !== 0 ? "1px solid var(--border)" : "none",
                borderBottom: i < 4 ? "1px solid var(--border)" : "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface2)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--surface)")}
            >
              <span className="text-3xl">{item.icon}</span>
              <span className="text-base font-bold" style={{ fontFamily: "var(--font-syne)" }}>{item.name}</span>
              <span className="text-sm" style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>{item.detail}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
