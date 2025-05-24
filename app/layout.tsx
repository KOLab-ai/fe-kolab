import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "KOLab.ai - AI-Powered Influencer Matching Platform",
  description:
    "KOLab.ai uses AI to match marketers with the most relevant Key Opinion Leaders for their product campaigns.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
