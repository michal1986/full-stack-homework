import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navigation } from './components/Navigation';
import ClientErrorBoundary from './components/ClientErrorBoundary';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Full Stack Homework",
  description: "Full stack developer assessment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ClientErrorBoundary>
            <Navigation />
            <main style={{ padding: '24px' }}>
              {children}
            </main>
          </ClientErrorBoundary>
        </Providers>
      </body>
    </html>
  );
}
