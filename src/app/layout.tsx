import "./globals.css";
import { Syne, DM_Mono, DM_Sans } from "next/font/google";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "ProbeAI | Intelligent QA Testing Architecture",
        template: "%s | ProbeAI",
    },
    description:
        "Transform your web & mobile app testing pipeline with ProbeAI. An intelligent, self-scaling, and self-healing automated testing platform specifically designed for enterprise workflows.",
    keywords: [
        "AI Testing",
        "QA Automation",
        "Self-healing Tests",
        "ProbeAI",
        "E2E Testing",
        "DevOps",
    ],
    authors: [{ name: "ProbeAI Team" }],
    creator: "ProbeAI",
    publisher: "ProbeAI",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: "ProbeAI | Next-Gen Software Testing",
        description:
            "Automate your QA tests with zero configuration. AI-driven test pipelines that scale with your team.",
        url: "https://probe-ai.app",
        siteName: "ProbeAI",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "ProbeAI | Intelligent QA Testing Architecture",
        description: "Transform your QA pipeline with intelligent automated testing.",
        creator: "@probeai_hq",
    },
    icons: {
        icon: [
            { url: "/icon.svg", type: "image/svg+xml" },
        ],
        apple: [
            { url: "/icon.svg", type: "image/svg+xml" },
        ],
    },
};
import { getLocale } from "next-intl/server";

const syne = Syne({
    subsets: ["latin"],
    variable: "--font-syne",
    weight: ["400", "600", "700", "800"],
    display: "swap",
});

const dmMono = DM_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
    weight: ["300", "400", "500"],
    display: "swap",
});

const dmSans = DM_Sans({
    subsets: ["latin"],
    variable: "--font-sans",
    weight: ["300", "400", "500"],
    display: "swap",
});

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const locale = await getLocale();

    return (
        <html lang={locale} className={`${syne.variable} ${dmMono.variable} ${dmSans.variable}`}>
            <body>
                {children}
            </body>
        </html>
    );
}
