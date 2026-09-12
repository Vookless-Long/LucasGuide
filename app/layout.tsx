import type { Metadata } from "next";
import { Inter, Lora, Space_Grotesk } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LucasGuide — Game guides by Luca",
    template: "%s | LucasGuide",
  },
  description:
    "Simple game walkthroughs from Luca, a German player. One hub per game, extra pages only when you get stuck.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://lucasguide.com"),
  other: {
    "msvalidate.01": "C81D7BD1D20BD0A8DE845A4514797CAC",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${lora.variable} ${spaceGrotesk.variable} font-sans min-h-screen flex flex-col`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
