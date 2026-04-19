"use client";

import { useEffect, useRef, useState } from "react";

const RING_LAG = 0.12;

export function CustomCursor() {
    const dotRef  = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    // smooth ring position
    const ring = useRef({ x: -100, y: -100 });
    const dot  = useRef({ x: -100, y: -100 });
    const hover = useRef(false);
    const click  = useRef(false);
    const rafId  = useRef<number>(0);

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Only show on non-touch devices
        if (window.matchMedia("(pointer: coarse)").matches) return;

        setVisible(true);

        const onMove = (e: MouseEvent) => {
            dot.current.x  = e.clientX;
            dot.current.y  = e.clientY;
        };

        const onEnter = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            hover.current = !!(
                target.closest("a, button, [role='button'], input, textarea, select, label")
            );
        };

        const onDown = ()  => { click.current = true;  };
        const onUp   = ()  => { click.current = false; };
        const onLeave = () => { setVisible(false); };
        const onEnterWindow = () => { setVisible(true); };

        document.addEventListener("mousemove",  onMove);
        document.addEventListener("mouseover",  onEnter);
        document.addEventListener("mousedown",  onDown);
        document.addEventListener("mouseup",    onUp);
        document.addEventListener("mouseleave", onLeave);
        document.addEventListener("mouseenter", onEnterWindow);

        function animate() {
            /* lerp ring towards dot */
            ring.current.x += (dot.current.x - ring.current.x) * RING_LAG;
            ring.current.y += (dot.current.y - ring.current.y) * RING_LAG;

            const dotEl  = dotRef.current;
            const ringEl = ringRef.current;

            if (dotEl) {
                dotEl.style.transform = `translate(${dot.current.x}px, ${dot.current.y}px)`;
            }
            if (ringEl) {
                const scale    = click.current ? 0.6 : hover.current ? 1.6 : 1;
                const opacity  = hover.current ? 0.8 : 0.5;
                const bg       = hover.current
                    ? "rgba(0,229,255,0.1)"
                    : "transparent";
                const border   = hover.current
                    ? "rgba(0,229,255,0.85)"
                    : "rgba(0,229,255,0.55)";

                ringEl.style.transform   = `translate(${ring.current.x}px, ${ring.current.y}px) scale(${scale})`;
                ringEl.style.opacity     = String(opacity);
                ringEl.style.background  = bg;
                ringEl.style.borderColor = border;
            }

            rafId.current = requestAnimationFrame(animate);
        }

        rafId.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(rafId.current);
            document.removeEventListener("mousemove",  onMove);
            document.removeEventListener("mouseover",  onEnter);
            document.removeEventListener("mousedown",  onDown);
            document.removeEventListener("mouseup",    onUp);
            document.removeEventListener("mouseleave", onLeave);
            document.removeEventListener("mouseenter", onEnterWindow);
        };
    }, []);

    if (!visible) return null;

    return (
        <>
            {/* Dot — snaps to cursor */}
            <div
                ref={dotRef}
                aria-hidden="true"
                style={{
                    position: "fixed",
                    top: -4,
                    left: -4,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#00e5ff",
                    boxShadow: "0 0 8px rgba(0,229,255,0.9)",
                    pointerEvents: "none",
                    zIndex: 99999,
                    willChange: "transform",
                    transition: "width 0.15s, height 0.15s",
                }}
            />

            {/* Ring — lags behind */}
            <div
                ref={ringRef}
                aria-hidden="true"
                style={{
                    position: "fixed",
                    top: -20,
                    left: -20,
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: "1.5px solid rgba(0,229,255,0.55)",
                    pointerEvents: "none",
                    zIndex: 99998,
                    willChange: "transform, opacity",
                    transition: "border-color 0.2s, background 0.2s, opacity 0.2s",
                }}
            />
        </>
    );
}
