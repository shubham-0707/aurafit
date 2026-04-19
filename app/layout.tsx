import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AuraFit — AI-Adaptive Workouts",
  description: "AI-powered fitness app that adapts to your readiness",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground font-sans">
        {/* Ambient gradient blobs */}
        <div className="gradient-blob" style={{ top: "-200px", left: "-100px", background: "radial-gradient(circle, #a855f7 0%, transparent 70%)" }} />
        <div className="gradient-blob" style={{ bottom: "-200px", right: "-100px", background: "radial-gradient(circle, #6366f1 0%, transparent 70%)" }} />
        <div className="relative z-10 bg-grid min-h-full">
          {children}
        </div>
      </body>
    </html>
  );
}
