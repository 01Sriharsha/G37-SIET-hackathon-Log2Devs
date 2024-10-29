import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AppProvider from "@/provider";
import Header from "@/components/Header/Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Agriculture",
    default: "Agriculture",
  },
  description: "Agriculture app for SIET-HACKATHON",
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
        <AppProvider>
          <div className="h-screen bg-gradient-to-b from-green-100 to-green-200">
            <Header />
            <div className="pt-20 h-full overflow-auto">{children}</div>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
