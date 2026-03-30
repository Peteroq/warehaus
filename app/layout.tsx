import type { Metadata } from 'next';
import { Space_Grotesk, DM_Sans } from 'next/font/google';
import { VercelToolbar } from '@vercel/toolbar/next';
import { AppShell } from '@/components/layout/AppShell';
import '@/styles/global.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Warehaus',
  description: 'Dream. Design. Develop.',
  icons: [
    { rel: 'icon', type: 'image/svg+xml', url: '/favicon.svg' },
    { rel: 'icon', url: '/favicon.ico' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body className="bg-background text-foreground font-body antialiased" suppressHydrationWarning>
        <AppShell>{children}</AppShell>
        {(process.env.NODE_ENV === 'development' ||
          process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') && <VercelToolbar />}
      </body>
    </html>
  );
}
