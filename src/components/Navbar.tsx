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
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "backdrop-blur-xl bg-[rgba(4,5,10,0.88)] border-b border-white/[0.06]"
                    : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
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

                <div className="hidden lg:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 no-underline hover:bg-white/[0.04]"
                            style={{ fontFamily: "var(--font-sans)", color: "var(--text-dim)" }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.color = "var(--text)";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.color = "var(--text-dim)";
                            }}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                <div className="hidden lg:flex items-center gap-3">
                    <div
                        className="flex items-center rounded-lg overflow-hidden"
                        style={{ border: "1px solid var(--border)", background: "rgba(255,255,255,0.02)" }}
                    >
                        {locales.map((loc, idx) => (
                            <button
                                key={loc}
                                onClick={() => switchLocale(loc)}
                                className="px-2.5 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer hover:bg-white/[0.04]"
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    background: loc === locale ? "rgba(0,229,255,0.12)" : "transparent",
                                    color: loc === locale ? "var(--accent)" : "var(--text-muted)",
                                    border: "none",
                                    borderRight: idx < locales.length - 1 ? "1px solid var(--border)" : "none",
                                }}
                            >
                                {LANG_LABELS[loc]}
                            </button>
                        ))}
                    </div>

                    <a
                        href="#cta"
                        className="px-5 py-2 rounded-lg text-sm font-bold no-underline transition-all duration-200 hover:translate-y-[-1px]"
                        style={{
                            fontFamily: "var(--font-syne)",
                            background: "var(--accent)",
                            color: "#000",
                            boxShadow: "0 0 20px rgba(0,229,255,0.15)",
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(0,229,255,0.35)";
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(0,229,255,0.15)";
                        }}
                    >
                        {t("getStarted")} →
                    </a>
                </div>

                <button
                    className="lg:hidden flex flex-col justify-center items-center gap-1.5 p-2 cursor-pointer rounded-lg hover:bg-white/[0.04] transition-colors"
                    onClick={() => setMenuOpen(!menuOpen)}
                    style={{ background: "none", border: "none" }}
                    aria-label="Toggle menu"
                >
                    {[0, 1, 2].map((i) => (
                        <motion.span
                            key={i}
                            className="block h-0.5 w-5 rounded"
                            style={{ background: "#fbbf24" }}
                            animate={{
                                rotate: menuOpen && i === 0 ? 45 : menuOpen && i === 2 ? -45 : 0,
                                y: menuOpen && i === 0 ? 8 : menuOpen && i === 2 ? -8 : 0,
                                opacity: menuOpen && i === 1 ? 0 : 1,
                            }}
                            transition={{ duration: 0.2 }}
                        />
                    ))}
                </button>
            </div>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="lg:hidden overflow-hidden backdrop-blur-xl"
                        style={{
                            background: "rgba(4,5,10,0.95)",
                            borderBottom: "1px solid var(--border)",
                        }}
                    >
                        <div className="flex flex-col px-4 py-4 gap-1">
                            {navLinks.map((link, idx) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="px-4 py-3 rounded-lg text-base font-medium no-underline transition-all duration-200 hover:bg-white/[0.04] active:bg-white/[0.08]"
                                    style={{ fontFamily: "var(--font-sans)", color: "var(--text-dim)" }}
                                >
                                    {link.label}
                                </motion.a>
                            ))}

                            <div className="flex flex-col gap-3 mt-4 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                                <div
                                    className="flex items-center rounded-lg overflow-hidden self-start"
                                    style={{ border: "1px solid var(--border)", background: "rgba(255,255,255,0.02)" }}
                                >
                                    {locales.map((loc, idx) => (
                                        <button
                                            key={loc}
                                            onClick={() => { switchLocale(loc); setMenuOpen(false); }}
                                            className="px-3 py-2 text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer hover:bg-white/[0.04]"
                                            style={{
                                                fontFamily: "var(--font-mono)",
                                                background: loc === locale ? "rgba(0,229,255,0.12)" : "transparent",
                                                color: loc === locale ? "var(--accent)" : "var(--text-dim)",
                                                border: "none",
                                                borderRight: idx < locales.length - 1 ? "1px solid var(--border)" : "none",
                                            }}
                                        >
                                            {LANG_LABELS[loc]}
                                        </button>
                                    ))}
                                </div>
                                <a
                                    href="#cta"
                                    onClick={() => setMenuOpen(false)}
                                    className="px-5 py-3 rounded-lg text-base font-bold no-underline text-center transition-all duration-200 active:scale-[0.98]"
                                    style={{
                                        fontFamily: "var(--font-syne)",
                                        background: "var(--accent)",
                                        color: "#000",
                                        boxShadow: "0 0 20px rgba(0,229,255,0.15)",
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
