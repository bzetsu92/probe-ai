"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "@/lib/useInView";

function ProbeAILogoFooter() {
  return (
    <svg width="22" height="22" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="13" cy="13" r="12" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.35" />
      <circle cx="13" cy="13" r="7" fill="rgba(0,229,255,0.08)" stroke="var(--accent)" strokeWidth="1.5" />
      <circle cx="13" cy="13" r="3" fill="var(--accent)" />
      <line x1="13" y1="6" x2="13" y2="3" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="13" x2="23" y2="13" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

const SOCIAL_LINKS = [
  { icon: <GitHubIcon />, label: "GitHub", href: "https://github.com/batd92" },
  { icon: <TwitterIcon />, label: "X (Twitter)", href: "#" },
  { icon: <LinkedInIcon />, label: "LinkedIn", href: "#" },
];

export function Footer() {
  const t = useTranslations("footer");
  const { ref, inView } = useInView();
  const links = t.raw("links") as string[];

  return (
    <motion.footer
      ref={ref as React.Ref<HTMLDivElement>}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 sm:pb-10"
      style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 mb-10 sm:mb-12">

          <div>
            <a href="#" className="flex items-center gap-2.5 no-underline mb-3">
              <ProbeAILogoFooter />
              <span
                className="text-lg font-extrabold tracking-tight"
                style={{ fontFamily: "var(--font-syne)", color: "var(--text)" }}
              >
                ProbeAI
              </span>
            </a>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--text-muted)" }}>
              AI-powered QA testing for teams who ship fast. No brittle scripts, no flaky tests.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  aria-label={s.label}
                  className="flex items-center justify-center w-8 h-8 rounded-lg no-underline transition-all duration-200 hover:bg-white/[0.06]"
                  style={{ color: "var(--text-muted)", border: "1px solid var(--border)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--text)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.14)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
              Resources
            </p>
            <ul className="flex flex-col gap-3 list-none">
              {links.map((link, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-sm no-underline transition-colors duration-200 hover:text-[var(--text)]"
                    style={{ color: "var(--text-dim)" }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
              Company
            </p>
            <div
              className="inline-flex items-center gap-2 rounded-lg px-4 py-3 mb-4"
              style={{
                background: "rgba(0,229,255,0.04)",
                border: "1px solid rgba(0,229,255,0.12)",
              }}
            >
              <span className="w-2 h-2 rounded-full pulse-dot" style={{ background: "var(--green)" }} />
              <span className="text-xs font-medium" style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>
                All systems operational
              </span>
            </div>
            <p className="text-sm" style={{ color: "var(--text-dim)" }}>
              Questions?{" "}
              <a href="mailto:hello@probeai.dev" className="no-underline" style={{ color: "var(--accent)" }}>
                hello@probeai.dev
              </a>
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span
            className="text-xs text-center sm:text-left"
            style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
          >
            {t("copy")}
          </span>
          <div className="flex items-center gap-4">
            {["Privacy", "Terms"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs no-underline transition-colors hover:text-[var(--text-dim)]"
                style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
