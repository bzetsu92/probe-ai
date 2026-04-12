import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig: NextConfig = {
  // output: 'standalone', // Only enable for Docker production builds
};

export default withNextIntl(nextConfig);
