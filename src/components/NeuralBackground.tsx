"use client";

import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────
   Neural Network background canvas
   – nodes drift slowly across the screen
   – edges draw when nodes come within range
   – a "signal" pulse travels along edges
   – everything is very subtle (low alpha)
───────────────────────────────────────── */

interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    pulseOffset: number;
}

interface Signal {
    fromNode: number;
    toNode: number;
    progress: number;   // 0 → 1
    speed: number;
    color: string;
}

const NODE_COUNT  = 55;
const LINK_DIST   = 180;   // px – max distance for an edge
const NODE_ALPHA  = 0.45;
const EDGE_ALPHA  = 0.10;
const SIGNAL_COLORS = [
    "rgba(0,229,255,",
    "rgba(123,97,255,",
    "rgba(0,255,163,",
];

function randomBetween(a: number, b: number) {
    return a + Math.random() * (b - a);
}

export function NeuralBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let W = window.innerWidth;
        let H = document.documentElement.scrollHeight;
        canvas.width  = W;
        canvas.height = H;

        /* --- build nodes --- */
        const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
            x: randomBetween(0, W),
            y: randomBetween(0, H),
            vx: randomBetween(-0.18, 0.18),
            vy: randomBetween(-0.12, 0.12),
            radius: randomBetween(1.5, 3),
            pulseOffset: randomBetween(0, Math.PI * 2),
        }));

        /* --- active signals --- */
        const signals: Signal[] = [];
        let tick = 0;

        function spawnSignal() {
            for (let attempt = 0; attempt < 30; attempt++) {
                const a = Math.floor(Math.random() * nodes.length);
                const b = Math.floor(Math.random() * nodes.length);
                if (a === b) continue;
                const dx = nodes[a].x - nodes[b].x;
                const dy = nodes[a].y - nodes[b].y;
                if (Math.sqrt(dx * dx + dy * dy) < LINK_DIST) {
                    signals.push({
                        fromNode: a,
                        toNode: b,
                        progress: 0,
                        speed: randomBetween(0.004, 0.012),
                        color: SIGNAL_COLORS[Math.floor(Math.random() * SIGNAL_COLORS.length)],
                    });
                    break;
                }
            }
        }

        let rafId: number;

        function draw() {
            ctx!.clearRect(0, 0, W, H);
            tick++;

            /* spawn signals occasionally */
            if (tick % 28 === 0 && signals.length < 12) spawnSignal();

            /* move nodes */
            for (const n of nodes) {
                n.x += n.vx;
                n.y += n.vy;
                if (n.x < -40)  n.x = W + 40;
                if (n.x > W + 40) n.x = -40;
                if (n.y < -40)  n.y = H + 40;
                if (n.y > H + 40) n.y = -40;
            }

            /* draw edges */
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < LINK_DIST) {
                        const fade = 1 - dist / LINK_DIST;
                        ctx!.beginPath();
                        ctx!.moveTo(nodes[i].x, nodes[i].y);
                        ctx!.lineTo(nodes[j].x, nodes[j].y);
                        ctx!.strokeStyle = `rgba(0,229,255,${EDGE_ALPHA * fade})`;
                        ctx!.lineWidth = 0.7;
                        ctx!.stroke();
                    }
                }
            }

            /* draw signals (travelling dots on edges) */
            for (let s = signals.length - 1; s >= 0; s--) {
                const sig = signals[s];
                sig.progress += sig.speed;
                if (sig.progress >= 1) { signals.splice(s, 1); continue; }

                const nA = nodes[sig.fromNode];
                const nB = nodes[sig.toNode];
                const sx = nA.x + (nB.x - nA.x) * sig.progress;
                const sy = nA.y + (nB.y - nA.y) * sig.progress;

                // glowing dot
                const grd = ctx!.createRadialGradient(sx, sy, 0, sx, sy, 7);
                grd.addColorStop(0, `${sig.color}0.9)`);
                grd.addColorStop(0.4, `${sig.color}0.4)`);
                grd.addColorStop(1, `${sig.color}0)`);
                ctx!.beginPath();
                ctx!.arc(sx, sy, 7, 0, Math.PI * 2);
                ctx!.fillStyle = grd;
                ctx!.fill();
            }

            /* draw nodes */
            for (const n of nodes) {
                const pulse = 0.6 + 0.4 * Math.sin(tick * 0.025 + n.pulseOffset);
                ctx!.beginPath();
                ctx!.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
                ctx!.fillStyle = `rgba(0,229,255,${NODE_ALPHA * pulse})`;
                ctx!.fill();
            }

            rafId = requestAnimationFrame(draw);
        }

        draw();

        const onResize = () => {
            W = window.innerWidth;
            H = document.documentElement.scrollHeight;
            canvas.width  = W;
            canvas.height = H;
        };
        window.addEventListener("resize", onResize);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: 0,
                opacity: 0.55,
            }}
        />
    );
}
