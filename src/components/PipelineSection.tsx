"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "@/lib/useInView";

const STEPS = [
  { icon: "🧠", type: "AI",  keyI18n: "compile" },
  { icon: "🔗", type: "DET", keyI18n: "bind" },
  { icon: "⚡", type: "DET", keyI18n: "execute" },
  { icon: "🔍", type: "AI",  keyI18n: "analyze" },
];

export function PipelineSection() {
  const t = useTranslations("pipeline");
  const { ref, inView } = useInView();

  return (
    <section id="pipeline" className="py-28" style={{ background: "linear-gradient(180deg, var(--bg) 0%, var(--surface) 50%, var(--bg) 100%)" }}>
      <div className="max-w-5xl mx-auto px-10" ref={ref as React.Ref<HTMLDivElement>}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="text-sm uppercase tracking-widest mb-4" style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}>
            // {t("label")}
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight" style={{ fontFamily: "var(--font-syne)" }}>
            {t("title1")}<br />{t("title2")}
          </h2>
          <p className="mt-5 text-lg leading-relaxed max-w-xl mx-auto" style={{ color: "var(--text-dim)" }}>
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="flex items-center justify-center flex-wrap gap-0">
          {STEPS.map((step, i) => (
            <div key={step.keyI18n} className="flex items-center">
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="flex flex-col items-center gap-4 min-w-[120px]"
              >
                {/* Icon box */}
                <div
                  className="relative w-20 h-20 rounded-2xl flex items-center justify-center text-3xl"
                  style={{
                    background: step.type === "AI"
                      ? "linear-gradient(135deg, rgba(123,97,255,0.15), rgba(0,229,255,0.08))"
                      : "linear-gradient(135deg, rgba(0,229,255,0.1), rgba(0,255,163,0.08))",
                    border: `1px solid ${step.type === "AI" ? "rgba(123,97,255,0.3)" : "rgba(0,229,255,0.25)"}`,
                  }}
                >
                  {step.icon}
                  <span
                    className="absolute -top-1.5 -right-1.5 text-[9px] px-1.5 py-0.5 rounded font-semibold"
                    style={{
                      fontFamily: "var(--font-mono)",
                      background: step.type === "AI" ? "rgba(123,97,255,0.9)" : "rgba(0,229,255,0.9)",
                      color: step.type === "AI" ? "#fff" : "#000",
                    }}
                  >
                    {step.type}
                  </span>
                </div>
                <div className="text-base font-bold tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
                  {t(`steps.${step.keyI18n}.label`)}
                </div>
                <div className="text-sm text-center leading-snug max-w-[130px]" style={{ color: "var(--text-dim)" }}>
                  {t(`steps.${step.keyI18n}.desc`)}
                </div>
              </motion.div>

              {/* Arrow */}
              {i < STEPS.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={inView ? { opacity: 1, scaleX: 1 } : {}}
                  transition={{ delay: i * 0.12 + 0.1, duration: 0.4 }}
                  className="flex items-center px-4 pb-10"
                  style={{ color: "var(--text-muted)" }}
                >
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}