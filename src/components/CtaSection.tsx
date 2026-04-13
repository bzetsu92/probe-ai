"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "@/lib/useInView";

export function CtaSection() {
  const t = useTranslations("cta");
  const { ref, inView } = useInView();

  return (
    <section id="cta" className="py-20 sm:py-28 relative overflow-hidden text-center">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full"
        style={{
          width: 800, height: 400,
          background: "radial-gradient(ellipse, rgba(123,97,255,0.13) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref as React.Ref<HTMLDivElement>}>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="font-extrabold tracking-tight leading-tight px-4"
          style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(32px, 5vw, 56px)" }}
        >
          {t("title1")}<br />{t("title2")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-4 sm:mt-6 text-base sm:text-xl max-w-lg mx-auto px-4"
          style={{ color: "var(--text-dim)" }}
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 sm:mt-12 flex gap-3 sm:gap-4 justify-center flex-wrap px-4"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 px-7 py-3 sm:px-9 sm:py-4 rounded-lg text-sm sm:text-base font-bold no-underline transition-all duration-200 hover:translate-y-[-2px] active:scale-[0.98]"
            style={{
              fontFamily: "var(--font-syne)",
              background: "var(--accent)",
              color: "#000",
              boxShadow: "0 0 32px rgba(0,229,255,0.22)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 56px rgba(0,229,255,0.45)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(0,229,255,0.22)";
            }}
          >
            {t("primary")} →
          </a>
          <a
            href="#architecture"
            className="inline-flex items-center gap-2 px-7 py-3 sm:px-9 sm:py-4 rounded-lg text-sm sm:text-base no-underline transition-all duration-200 hover:bg-white/[0.04] active:scale-[0.98]"
            style={{ color: "var(--text)", border: "1px solid rgba(255,255,255,0.15)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.25)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
            }}
          >
            {t("secondary")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
