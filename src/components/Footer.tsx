"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "@/lib/useInView";

export function Footer() {
  const t = useTranslations("footer");
  const { ref, inView } = useInView();
  const links = t.raw("links") as string[];

  return (
    <motion.footer
      ref={ref as React.Ref<HTMLDivElement>}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6"
      style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
    >
      <a href="#" className="flex items-center gap-2 no-underline">
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: "var(--accent)", boxShadow: "0 0 12px var(--accent)" }}
        />
        <span
          className="text-lg font-extrabold tracking-tight"
          style={{ fontFamily: "var(--font-syne)", color: "var(--text)" }}
        >
          ProbeAI
        </span>
      </a>

      <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 list-none">
        {links.map((link, i) => (
          <li key={i}>
            <a
              href="#"
              className="text-sm sm:text-base no-underline transition-colors duration-200 hover:text-[var(--text)]"
              style={{ color: "var(--text-dim)" }}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>

      <span
        className="text-xs sm:text-sm text-center sm:text-right"
        style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
      >
        {t("copy")}
      </span>
    </motion.footer>
  );
}
