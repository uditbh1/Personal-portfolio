
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import AppHeader from '@/components/layout/Header';
import AppFooter from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: "Udit's Personal Portfolio",
  description: 'Full Stack Developer showcasing projects, skills, and experience.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          <AppHeader />
          <main>{children}</main>
          <AppFooter />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
