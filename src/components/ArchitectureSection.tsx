"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "@/lib/useInView";

export function ArchitectureSection() {
  const t = useTranslations("architecture");
  const { ref, inView } = useInView();

  const rules = t.raw("rules") as Array<{ ok: boolean; text: string }>;
  const layers = t.raw("layers") as Array<{ num: string; name: string; tech: string; color: string }>;

  return (
    <section id="architecture" className="py-20 sm:py-28" style={{ background: "var(--surface)" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref as React.Ref<HTMLDivElement>}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="text-sm uppercase tracking-widest mb-4" style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}>
              // {t("label")}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4" style={{ fontFamily: "var(--font-syne)" }}>
              {t("title1")}<br />{t("title2")}
            </h2>
            <p className="text-base sm:text-lg leading-relaxed mb-8 sm:mb-10" style={{ color: "var(--text-dim)" }}>
              {t("subtitle")}
            </p>

            <div className="flex flex-col gap-4 sm:gap-6">
              {rules.map((rule, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                  className="flex gap-3 sm:gap-4 items-start rounded-xl p-3 sm:p-4"
                  style={{
                    background: rule.ok ? "rgba(0,255,163,0.04)" : "rgba(255,77,109,0.04)",
                    border: `1px solid ${rule.ok ? "rgba(0,255,163,0.1)" : "rgba(255,77,109,0.1)"}`,
                  }}
                >
                  <div
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-sm sm:text-base flex-shrink-0"
                    style={{ background: rule.ok ? "rgba(0,255,163,0.12)" : "rgba(255,77,109,0.12)" }}
                  >
                    {rule.ok ? "✅" : "❌"}
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
            className="rounded-xl p-5 sm:p-6 md:p-8"
            style={{ background: "var(--bg)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            {layers.map((layer, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.07, duration: 0.4 }}
                className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 sm:py-3.5 rounded-lg mb-1 group cursor-default transition-colors duration-200 hover:bg-white/[0.04]"
              >
                <div
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0"
                  style={{ background: `${layer.color}20`, color: layer.color }}
                >
                  {layer.num}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-sm sm:text-base font-semibold" style={{ color: "var(--text)" }}>{layer.name}</span>
                  <span className="block text-xs sm:text-sm mt-0.5 truncate" style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>{layer.tech}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
