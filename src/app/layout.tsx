
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import AppHeader from '@/components/layout/Header';
import AppFooter from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import OpeningScreen from '@/components/shared/OpeningScreen';
import ScrollProgressDock from '@/components/shared/ScrollProgressDock';

export const metadata: Metadata = {
  title: "Udit's Personal Portfolio",
  description: 'Full Stack Developer showcasing projects, skills, and experience.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden max-w-full w-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased overflow-x-hidden max-w-full w-full" suppressHydrationWarning={true}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          {/* Procedural Anti-AI Grain Definition */}
          <svg className="hidden" aria-hidden="true">
            <filter id="grain-filter">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            </filter>
          </svg>
          <div className="grain-overlay" aria-hidden="true" />

          <OpeningScreen />
          <ScrollProgressDock />
          <AppHeader />
          <main className="overflow-x-hidden max-w-full w-full">{children}</main>
          <AppFooter />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
