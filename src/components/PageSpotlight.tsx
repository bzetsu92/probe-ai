"use client";

import { useCallback, useEffect, useRef } from "react";

/*
  PageSpotlight — a fixed radial glow that follows the mouse across
  the entire page. Mounted once in the locale layout so it's always
  active regardless of which section is visible.
*/
export function PageSpotlight() {
    const ref = useRef<HTMLDivElement>(null);

    const onMove = useCallback((e: MouseEvent) => {
        const el = ref.current;
        if (!el) return;
        el.style.left    = `${e.clientX}px`;
        el.style.top     = `${e.clientY}px`;
        el.style.opacity = "1";
    }, []);

    const onLeave = useCallback(() => {
        if (ref.current) ref.current.style.opacity = "0";
    }, []);

    useEffect(() => {
        document.addEventListener("mousemove",  onMove);
        document.addEventListener("mouseleave", onLeave);
        return () => {
            document.removeEventListener("mousemove",  onMove);
            document.removeEventListener("mouseleave", onLeave);
        };
    }, [onMove, onLeave]);

    return (
        <div
            ref={ref}
            aria-hidden="true"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: 700,
                height: 700,
                borderRadius: "50%",
                /* dual-tone: purple core → cyan mid → transparent edge */
                background:
                    "radial-gradient(circle, rgba(123,97,255,0.13) 0%, rgba(0,229,255,0.07) 38%, transparent 68%)",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
                zIndex: 1,          /* sits just above the neural canvas (z:0), below content (z:10+) */
                opacity: 0,
                filter: "blur(18px)",
                willChange: "transform, left, top",
                transition: "opacity 0.35s ease",
            }}
        />
    );
}
