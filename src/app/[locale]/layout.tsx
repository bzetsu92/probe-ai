import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing, type Locale } from '../../i18n/routing';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export function generateStaticParams(): { locale: Locale }[] {
  return routing.locales.map((locale: Locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <NextIntlClientProvider>
      <div style={{ minHeight: '100vh', background: 'var(--bg, #04050a)', color: 'var(--text, #e8eaf0)' }}>
        <Navbar />
        {children}
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
