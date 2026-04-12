"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "@/lib/useInView";
import { useEffect, useRef, useState } from "react";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const { ref, inView } = useInView(0.5);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1400;
    const update = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p < 1) rafRef.current = requestAnimationFrame(update);
    };
    rafRef.current = requestAnimationFrame(update);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [inView, value]);

  return (
    <span ref={ref as React.Ref<HTMLSpanElement>}>
      {display}{suffix}
    </span>
  );
}

export function StatsBar() {
  const t = useTranslations("stats");
  const { ref, inView } = useInView();

  const stats = [
    { raw: 10, suffix: "x", label: t("s1label") },
    { raw: 95, suffix: "%", label: t("s2label") },
    { raw: 500, suffix: "+", label: t("s3label") },
    { raw: null, display: "24/7", label: t("s4label") },
  ];

  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      className="py-10"
      style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--surface)" }}
    >
      <div className="max-w-5xl mx-auto px-10 grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="px-8 py-6"
            style={{ borderRight: i < 3 ? "1px solid var(--border)" : "none" }}
          >
            <div
              className="text-4xl font-extrabold tracking-tight gradient-text"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {stat.raw !== null ? (
                <AnimatedNumber value={stat.raw} suffix={stat.suffix} />
              ) : (
                <span>{stat.display}</span>
              )}
            </div>
            <div className="mt-2 text-base" style={{ color: "var(--text-dim)" }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}