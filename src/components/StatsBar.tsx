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

const STAT_ICONS = [
  // Speed / rocket
  <svg key="speed" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>,
  // Shield
  <svg key="shield" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  // Users
  <svg key="users" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  // Clock
  <svg key="clock" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
];

export function StatsBar() {
  const t = useTranslations("stats");
  const { ref, inView } = useInView();

  const stats = [
    { raw: 10, suffix: "x", label: t("s1label"), icon: STAT_ICONS[0] },
    { raw: 95, suffix: "%", label: t("s2label"), icon: STAT_ICONS[1] },
    { raw: 500, suffix: "+", label: t("s3label"), icon: STAT_ICONS[2] },
    { raw: null, display: "24/7", label: t("s4label"), icon: STAT_ICONS[3] },
  ];

  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="py-8 sm:py-10"
      style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--surface)" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="relative px-4 sm:px-8 py-5 sm:py-7 text-center"
            style={{
              borderRight: i < stats.length - 1 ? "1px solid var(--border)" : "none",
            }}
          >
            {/* Icon */}
            <div
              className="flex items-center justify-center w-8 h-8 rounded-lg mx-auto mb-3"
              style={{
                background: "rgba(0,229,255,0.08)",
                color: "var(--accent)",
              }}
            >
              {stat.icon}
            </div>

            {/* Number */}
            <div
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight gradient-text"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {stat.raw !== null ? (
                <AnimatedNumber value={stat.raw} suffix={stat.suffix} />
              ) : (
                <span>{stat.display}</span>
              )}
            </div>

            {/* Label */}
            <div className="mt-1.5 sm:mt-2 text-xs sm:text-sm" style={{ color: "var(--text-dim)" }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}