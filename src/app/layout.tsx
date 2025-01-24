import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "../app/components/Header"; // Asegúrate de tener el Header en esta ruta
import { Footer } from "../app/components/Footer"; // Asegúrate de tener el Footer en esta ruta

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Catálogo de Autos",
  description: "Explora y encuentra el auto perfecto para ti.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Header */}
        <Header />

        {/* Contenido principal */}
        <main className="min-h-screen">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
