"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "@/lib/useInView";
import { useEffect, useRef, useMemo } from "react";

/* ── Floating particles config ── */
const PARTICLE_COUNT = 22;

type Particle = {
    id: number;
    x: number;
    size: number;
    color: string;
    duration: number;
    delay: number;
    dx: number;
};

const TRUST_BADGES = [
    {
        icon: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
        label: "SOC 2 Compliant",
    },
    {
        icon: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
        ),
        label: "No credit card",
    },
    {
        icon: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
            </svg>
        ),
        label: "Free plan forever",
    },
];

/* ── Rotating border wrapper (canvas trick) ── */
function RotatingBorderCard({ children }: { children: React.ReactNode }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const frameRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let angle = 0;
        function draw() {
            if (!canvas || !ctx) return;
            const w = canvas.width;
            const h = canvas.height;
            const r = 20; // border-radius

            ctx.clearRect(0, 0, w, h);

            // Clip to rounded rect
            ctx.beginPath();
            ctx.roundRect(0, 0, w, h, r);
            ctx.clip();

            // Draw rotating conic glow behind card edge
            const cx = w / 2;
            const cy = h / 2;
            const grad = ctx.createConicGradient(0, cx, cy)
                ? null  // fallback below
                : null;

            // Use rotation transform trick
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(angle);
            ctx.translate(-cx, -cy);

            const g = ctx.createLinearGradient(0, 0, w, h);
            g.addColorStop(0, "rgba(0,229,255,0.0)");
            g.addColorStop(0.25, "rgba(0,229,255,0.75)");
            g.addColorStop(0.5, "rgba(123,97,255,0.9)");
            g.addColorStop(0.75, "rgba(0,255,163,0.7)");
            g.addColorStop(1, "rgba(0,229,255,0.0)");

            ctx.fillStyle = g;
            // Draw a big rotated rectangle — only the 1.5px padding ring will show
            ctx.fillRect(-w, -h, w * 3, h * 3);
            ctx.restore();

            angle += 0.012;
            frameRef.current = requestAnimationFrame(draw);
        }

        const resize = () => {
            if (!canvas) return;
            const rect = canvas.parentElement?.getBoundingClientRect();
            if (rect) {
                canvas.width = rect.width;
                canvas.height = rect.height;
            }
        };

        resize();
        draw();
        window.addEventListener("resize", resize);
        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(frameRef.current);
        };
    }, []);

    return (
        <div className="relative" style={{ padding: "2px", borderRadius: "20px" }}>
            {/* Canvas draws the animated border */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none"
                style={{ borderRadius: "20px", opacity: 0.85 }}
            />
            {/* Static fallback border underneath */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    borderRadius: "20px",
                    border: "1px solid rgba(123,97,255,0.18)",
                }}
            />
            {/* Inner card */}
            <div
                className="relative"
                style={{
                    borderRadius: "18px",
                    background: "rgba(11,13,20,0.94)",
                    backdropFilter: "blur(24px)",
                    overflow: "hidden",
                }}
            >
                {children}
            </div>
        </div>
    );
}

/* ── Floating particles ── */
function FloatingParticles({ particles }: { particles: Particle[] }) {
    return (
        <>
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="particle"
                    style={{
                        left: `${p.x}%`,
                        bottom: "0%",
                        width: p.size,
                        height: p.size,
                        background: p.color,
                        boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                        animationDuration: `${p.duration}s`,
                        animationDelay: `${p.delay}s`,
                        // @ts-expect-error CSS custom property
                        "--dx": `${p.dx}px`,
                    }}
                />
            ))}
        </>
    );
}

export function CtaSection() {
    const t = useTranslations("cta");
    const { ref, inView } = useInView();

    /* Stable particle list — memoised so it doesn't re-randomise */
    const particles = useMemo<Particle[]>(() => {
        const colors = [
            "rgba(0,229,255,0.7)",
            "rgba(123,97,255,0.7)",
            "rgba(0,255,163,0.6)",
            "rgba(0,229,255,0.5)",
        ];
        return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
            id: i,
            x: 5 + ((i * 97) % 90),               // pseudo-random spread
            size: 2 + (i % 3) * 1.5,
            color: colors[i % colors.length],
            duration: 5 + (i % 7),
            delay: (i * 0.6) % 8,
            dx: -30 + ((i * 37) % 60),
        }));
    }, []);

    return (
        <section id="cta" className="py-20 sm:py-28 relative overflow-hidden">

            {/* ── Deep background orbs ── */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                    width: 1000, height: 600,
                    background: "radial-gradient(ellipse, rgba(123,97,255,0.15) 0%, transparent 68%)",
                    filter: "blur(80px)",
                    borderRadius: "50%",
                }}
            />
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                    width: 500, height: 300,
                    background: "radial-gradient(ellipse, rgba(0,229,255,0.09) 0%, transparent 70%)",
                    filter: "blur(50px)",
                    borderRadius: "50%",
                }}
            />

            {/* ── Pulsing glow ring behind the card ── */}
            <div
                className="cta-glow-ring"
                style={{
                    width: 640, height: 320,
                    background: "radial-gradient(ellipse, rgba(123,97,255,0.22) 0%, transparent 70%)",
                    left: "50%",
                    top: "50%",
                    filter: "blur(30px)",
                }}
            />
            <div
                className="cta-glow-ring"
                style={{
                    width: 400, height: 200,
                    background: "radial-gradient(ellipse, rgba(0,229,255,0.18) 0%, transparent 70%)",
                    left: "50%",
                    top: "50%",
                    filter: "blur(20px)",
                    animationDelay: "1.75s",
                }}
            />

            {/* ── Main card ── */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref as React.Ref<HTMLDivElement>}>
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <RotatingBorderCard>
                        {/* Floating particles inside card */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <FloatingParticles particles={particles} />
                            {/* Subtle radial highlight top-center */}
                            <div
                                className="absolute -top-20 left-1/2 -translate-x-1/2 pointer-events-none"
                                style={{
                                    width: 400, height: 200,
                                    background: "radial-gradient(ellipse, rgba(123,97,255,0.14) 0%, transparent 70%)",
                                    filter: "blur(24px)",
                                }}
                            />
                        </div>

                        <div className="relative text-center p-8 sm:p-12">
                            <motion.h2
                                initial={{ opacity: 0, y: 16 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.12, duration: 0.6 }}
                                className="font-extrabold tracking-tight leading-tight px-4"
                                style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(28px, 4.5vw, 52px)" }}
                            >
                                {t("title1")}
                                <br />
                                <span className="gradient-text">{t("title2")}</span>
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 12 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="mt-4 sm:mt-5 text-base sm:text-lg max-w-md mx-auto px-4"
                                style={{ color: "var(--text-dim)" }}
                            >
                                {t("subtitle")}
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.28, duration: 0.5 }}
                                className="mt-8 sm:mt-10 flex gap-3 sm:gap-4 justify-center flex-wrap px-4"
                            >
                                <a
                                    href="#"
                                    className="btn-shimmer inline-flex items-center gap-2 px-7 py-3.5 sm:px-9 sm:py-4 rounded-xl text-sm sm:text-base font-bold no-underline transition-all duration-200 hover:translate-y-[-2px] active:scale-[0.98]"
                                    style={{
                                        fontFamily: "var(--font-syne)",
                                        background: "var(--accent)",
                                        color: "#000",
                                        boxShadow: "0 0 32px rgba(0,229,255,0.28)",
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 60px rgba(0,229,255,0.55)";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(0,229,255,0.28)";
                                    }}
                                >
                                    {t("primary")} →
                                </a>
                                <a
                                    href="#architecture"
                                    className="inline-flex items-center gap-2 px-7 py-3.5 sm:px-9 sm:py-4 rounded-xl text-sm sm:text-base no-underline transition-all duration-200 hover:bg-white/[0.05] active:scale-[0.98]"
                                    style={{ color: "var(--text)", border: "1px solid rgba(255,255,255,0.14)" }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.28)";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.14)";
                                    }}
                                >
                                    {t("secondary")}
                                </a>
                            </motion.div>

                            {/* Trust badges */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={inView ? { opacity: 1 } : {}}
                                transition={{ delay: 0.44, duration: 0.5 }}
                                className="mt-6 sm:mt-8 flex items-center justify-center gap-5 sm:gap-6 flex-wrap"
                            >
                                {TRUST_BADGES.map((badge, i) => (
                                    <span key={i} className="trust-badge">
                                        <span style={{ color: "var(--green)" }}>{badge.icon}</span>
                                        {badge.label}
                                    </span>
                                ))}
                            </motion.div>
                        </div>
                    </RotatingBorderCard>
                </motion.div>
            </div>
        </section>
    );
}
