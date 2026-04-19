"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "@/lib/useInView";

function CheckIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="7.5" stroke="rgba(0,255,163,0.4)" />
            <path d="M4.5 8l2.5 2.5 4.5-5" stroke="#00ffa3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function CrossIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="7.5" stroke="rgba(255,77,109,0.4)" />
            <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#ff4d6d" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

export function ArchitectureSection() {
  const t = useTranslations("architecture");
  const { ref, inView } = useInView();

  const rules = t.raw("rules") as Array<{ ok: boolean; text: string }>;
  const layers = t.raw("layers") as Array<{ num: string; name: string; tech: string; color: string }>;

  return (
    <section id="architecture" className="py-20 sm:py-28" style={{ background: "var(--surface)" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref as React.Ref<HTMLDivElement>}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-start">

          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label">{t("label")}</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4 mt-2" style={{ fontFamily: "var(--font-syne)" }}>
              {t("title1")}<br />{t("title2")}
            </h2>
            <p className="text-base sm:text-lg leading-relaxed mb-8 sm:mb-10" style={{ color: "var(--text-dim)" }}>
              {t("subtitle")}
            </p>

            <div className="flex flex-col gap-3 sm:gap-4">
              {rules.map((rule, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                  className="flex gap-3 sm:gap-4 items-start rounded-xl p-3.5 sm:p-4"
                  style={{
                    background: rule.ok ? "rgba(0,255,163,0.04)" : "rgba(255,77,109,0.04)",
                    border: `1px solid ${rule.ok ? "rgba(0,255,163,0.12)" : "rgba(255,77,109,0.12)"}`,
                  }}
                >
                  <div
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: rule.ok ? "rgba(0,255,163,0.10)" : "rgba(255,77,109,0.10)" }}
                  >
                    {rule.ok ? <CheckIcon /> : <CrossIcon />}
                  </div>
                  <p
                    className="text-sm sm:text-base leading-relaxed"
                    style={{ color: "var(--text-dim)" }}
                    dangerouslySetInnerHTML={{ __html: rule.text }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-2xl p-5 sm:p-6 md:p-8"
            style={{ background: "var(--bg)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
              Why teams switch →
            </p>
            {layers.map((layer, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.07, duration: 0.4 }}
                className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl mb-2 group cursor-default transition-all duration-200 hover:bg-white/[0.04]"
              >
                <div
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0"
                  style={{ background: `${layer.color}18`, color: layer.color }}
                >
                  {layer.num}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-sm sm:text-base font-semibold" style={{ color: "var(--text)" }}>{layer.name}</span>
                  <span className="block text-xs sm:text-sm mt-0.5" style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>{layer.tech}</span>
                </div>
                {/* Mini accent dot */}
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: layer.color }}
                />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
