"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "@/lib/useInView";

export function HowItWorksSection() {
  const t = useTranslations("howItWorks");
  const { ref, inView } = useInView();
  const steps = t.raw("steps") as Array<{ num: string; title: string; text: string; code: string | null }>;

  return (
    <section id="how" className="py-28" style={{ background: "linear-gradient(180deg, var(--bg) 0%, var(--surface) 100%)" }}>
      <div className="max-w-5xl mx-auto px-10" ref={ref as React.Ref<HTMLDivElement>}>
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

        <div className="relative max-w-3xl mx-auto">
          <div
            className="absolute left-[23px] top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(180deg, var(--accent2), var(--accent), transparent)", opacity: 0.3 }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.13, duration: 0.6 }}
              className="flex gap-8 py-9"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 text-sm font-bold"
                style={{
                  fontFamily: "var(--font-mono)",
                  background: "var(--bg)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "var(--accent)",
                }}
              >
                {step.num}
              </div>

              <div className="flex-1 pt-1">
                <h3 className="text-2xl font-bold tracking-tight mb-3" style={{ fontFamily: "var(--font-syne)" }}>
                  {step.title}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: "var(--text-dim)" }}>
                  {step.text}
                </p>
                {step.code && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.13 + 0.2, duration: 0.4 }}
                    className="mt-5 rounded-lg p-5 text-sm leading-relaxed whitespace-pre"
                    style={{
                      fontFamily: "var(--font-mono)",
                      background: "var(--surface2)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "var(--accent)",
                    }}
                  >
                    {step.code}
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
