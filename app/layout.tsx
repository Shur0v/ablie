import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Abliefernachweis Pro | Digitales Installationsprotokoll',
  description: 'Professionelles Tool zur Erfassung von Installationsnachweisen mit digitaler Unterschrift.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="de" className={inter.variable}>
      <body suppressHydrationWarning className="antialiased">{children}</body>
    </html>
  );
}
