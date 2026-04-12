import "./globals.css";
import { Syne, DM_Mono, DM_Sans } from "next/font/google";
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
