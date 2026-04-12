"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
});

const terminalLines = [
  { type: "comment", text: "# Just describe what to test" },
  { type: "key", text: "name", val: "Checkout E2E Test" },
  { type: "key", text: "target", val: "https://app.example.com" },
  { type: "key", text: "steps", val: null },
  { type: "step", text: '"Sign in as premium user"' },
  { type: "step", text: '"Add item to cart"' },
  { type: "step", text: '"Proceed to checkout"' },
  { type: "step", text: '"Fill in shipping address"' },
  { type: "step", text: '"Submit order"' },
  { type: "assert", text: '"Order confirmation is shown"' },
];

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-10 pt-28 pb-20 overflow-hidden"
      id="hero"
    >
      {/* Grid BG */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      {/* Orbs */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 640, height: 640,
          top: -240, left: -120,
          background: "radial-gradient(circle, rgba(123,97,255,0.15) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 520, height: 520,
          bottom: -120, right: -120,
          background: "radial-gradient(circle, rgba(0,229,255,0.12) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <motion.div {...fadeUp(0)} className="flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 text-xs"
        style={{
          fontFamily: "var(--font-mono)",
          background: "rgba(0,229,255,0.08)",
          border: "1px solid rgba(0,229,255,0.2)",
          color: "var(--accent)",
        }}
      >
        <span className="pulse-dot" style={{ fontSize: 8, lineHeight: 1 }}>●</span>
        {t("badge")}
      </motion.div>

      <motion.h1
        {...fadeUp(0.1)}
        className="text-center"
        style={{
          fontFamily: "var(--font-syne)",
          fontSize: "clamp(44px, 7vw, 84px)",
          fontWeight: 800,
          letterSpacing: "-1.5px",
          lineHeight: 1.1,
          maxWidth: 900,
        }}
      >
        {t("title1")}
        <br />
        <span className="gradient-text">{t("title2")}</span>
      </motion.h1>

      <motion.p
        {...fadeUp(0.2)}
        className="mt-7 text-center text-xl leading-relaxed font-normal max-w-2xl"
        style={{ color: "var(--text-dim)" }}
      >
        {t("subtitle")}
      </motion.p>

      <motion.div {...fadeUp(0.3)} className="mt-11 flex gap-4 flex-wrap justify-center">
        <a
          href="#cta"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-base font-bold no-underline transition-all duration-200"
          style={{
            fontFamily: "var(--font-syne)",
            background: "var(--accent)",
            color: "#000",
            boxShadow: "0 0 32px rgba(0,229,255,0.22)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 52px rgba(0,229,255,0.42)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(0,229,255,0.22)";
          }}
        >
          {t("cta")} →
        </a>
        <a
          href="#pipeline"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-base no-underline transition-all duration-200"
          style={{
            color: "var(--text)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
          }}
        >
          {t("ctaSecondary")}
        </a>
      </motion.div>

      {/* Terminal */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mt-20 w-full max-w-2xl rounded-xl overflow-hidden relative z-10"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)",
        }}
      >
        {/* Terminal bar */}
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{ background: "var(--surface2)", borderBottom: "1px solid var(--border)" }}
        >
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
          <span
            className="flex-1 text-center text-xs"
            style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
          >
            test_checkout_flow.yaml
          </span>
        </div>

        {/* Terminal body */}
        <div className="p-6" style={{ fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.85 }}>
          {terminalLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.06, duration: 0.3 }}
            >
              {line.type === "comment" && (
                <span style={{ color: "#4b5563" }}>{line.text}</span>
              )}
              {line.type === "key" && (
                <>
                  <span style={{ color: "var(--accent2)" }}>{line.text}</span>
                  <span style={{ color: "var(--text-dim)" }}>: </span>
                  {line.val && <span style={{ color: "var(--green)" }}>{line.val}</span>}
                </>
              )}
              {line.type === "step" && (
                <>
                  <span style={{ color: "var(--text-dim)" }}>{"  - "}</span>
                  <span style={{ color: "var(--green)" }}>{line.text}</span>
                </>
              )}
              {line.type === "assert" && (
                <>
                  <span style={{ color: "var(--text-dim)" }}>{"  - "}</span>
                  <span style={{ color: "var(--accent2)" }}>assert</span>
                  <span style={{ color: "var(--text-dim)" }}>: </span>
                  <span style={{ color: "var(--green)" }}>{line.text}</span>
                </>
              )}
            </motion.div>
          ))}
          <br />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            <span style={{ color: "var(--accent2)" }}>▶ </span>
            <span style={{ color: "var(--text)" }}>probeai run test_checkout_flow.yaml</span>
            <span className="typing-cursor" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}