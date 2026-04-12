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
      className="px-10 py-12 flex flex-wrap items-center justify-between gap-6"
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

      <ul className="flex flex-wrap gap-8 list-none">
        {links.map((link, i) => (
          <li key={i}>
            <a
              href="#"
              className="text-base no-underline transition-colors duration-200"
              style={{ color: "var(--text-dim)" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--text)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--text-dim)")}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>

      <span
        className="text-sm"
        style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
      >
        {t("copy")}
      </span>
    </motion.footer>
  );
}
