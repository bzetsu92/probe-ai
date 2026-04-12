"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { locales, type Locale } from "@/i18n/routing";

const LANG_LABELS: Record<Locale, string> = {
  en: "EN",
  vi: "VI",
  ja: "JP",
};

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const switchLocale = (next: Locale) => {
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/"));
  };

  const navLinks = [
    { href: "#pipeline", label: t("pipeline") },
    { href: "#features", label: t("features") },
    { href: "#architecture", label: t("architecture") },
    { href: "#stack", label: t("stack") },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-[rgba(4,5,10,0.88)] border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 no-underline shrink-0">
          <span
            className="w-2 h-2 rounded-full pulse-dot"
            style={{ background: "var(--accent)", boxShadow: "0 0 12px var(--accent)" }}
          />
          <span
            className="text-xl font-extrabold tracking-tight"
            style={{ fontFamily: "var(--font-syne)", color: "var(--text)" }}
          >
            ProbeAI
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-2 rounded-lg text-[13px] font-medium transition-colors duration-200 no-underline"
              style={{ fontFamily: "var(--font-sans)", color: "var(--text-dim)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--text)";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--text-dim)";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side: Language + CTA */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Language switcher */}
          <div
            className="flex items-center rounded-lg overflow-hidden"
            style={{ border: "1px solid var(--border)", background: "rgba(255,255,255,0.02)" }}
          >
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className="px-2.5 py-1.5 text-[11px] font-semibold tracking-wide transition-all duration-200 cursor-pointer"
                style={{
                  fontFamily: "var(--font-mono)",
                  background: loc === locale ? "rgba(0,229,255,0.12)" : "transparent",
                  color: loc === locale ? "var(--accent)" : "var(--text-muted)",
                  border: "none",
                  borderRight: loc !== locales[locales.length - 1] ? "1px solid var(--border)" : "none",
                }}
              >
                {LANG_LABELS[loc]}
              </button>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#cta"
            className="px-5 py-2 rounded-lg text-[13px] font-bold no-underline transition-all duration-200"
            style={{
              fontFamily: "var(--font-syne)",
              background: "var(--accent)",
              color: "#000",
              boxShadow: "0 0 20px rgba(0,229,255,0.15)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(0,229,255,0.35)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(0,229,255,0.15)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            {t("getStarted")} →
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none" }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block h-0.5 w-5 rounded"
              style={{ background: "var(--text)" }}
              animate={{
                rotate: menuOpen && i === 0 ? 45 : menuOpen && i === 2 ? -45 : 0,
                y: menuOpen && i === 0 ? 8 : menuOpen && i === 2 ? -8 : 0,
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden"
            style={{
              background: "var(--surface)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div className="flex flex-col px-6 py-5 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm no-underline transition-colors duration-200"
                  style={{ fontFamily: "var(--font-sans)", color: "var(--text-dim)" }}
                >
                  {link.label}
                </a>
              ))}

              <div className="flex items-center gap-2 mt-4 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                <div
                  className="flex items-center rounded-lg overflow-hidden"
                  style={{ border: "1px solid var(--border)" }}
                >
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => { switchLocale(loc); setMenuOpen(false); }}
                      className="px-3 py-2 text-xs font-semibold tracking-wide cursor-pointer"
                      style={{
                        fontFamily: "var(--font-mono)",
                        background: loc === locale ? "rgba(0,229,255,0.12)" : "transparent",
                        color: loc === locale ? "var(--accent)" : "var(--text-dim)",
                        border: "none",
                        borderRight: loc !== locales[locales.length - 1] ? "1px solid var(--border)" : "none",
                      }}
                    >
                      {LANG_LABELS[loc]}
                    </button>
                  ))}
                </div>

                <a
                  href="#cta"
                  onClick={() => setMenuOpen(false)}
                  className="ml-auto px-5 py-2 rounded-lg text-sm font-bold no-underline"
                  style={{
                    fontFamily: "var(--font-syne)",
                    background: "var(--accent)",
                    color: "#000",
                  }}
                >
                  {t("getStarted")} →
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
