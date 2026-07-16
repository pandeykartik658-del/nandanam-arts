import type { Metadata } from "next";
import { Cinzel, Sora, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel", display: "swap" });
const sora = Sora({ 
  subsets: ["latin"], 
  weight: ["300", "400", "600"],
  variable: "--font-sora", 
  display: "swap" 
});
const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["400", "600"],
  variable: "--font-poppins",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nandanamartfoundation.vercel.app"),
  title: "Nandanam Center for Arts",
  description: "Experience the divine geometry of Indian classical dance.",
  verification: {
    google: "CHqMeqOFjlJ-gITvguA1OQ42tgpx2U9j7D8xTQqacgE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark overflow-x-hidden" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Nandanam Center for Arts",
              url: "https://nandanamartfoundation.vercel.app",
              logo: "https://nandanamartfoundation.vercel.app/favicon.ico",
              sameAs: [
                "https://www.instagram.com/nandanamarts/",
                "https://www.youtube.com/@nandanamarts2322"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${sora.variable} ${cinzel.variable} ${poppins.variable} font-body antialiased overflow-x-hidden`}
      >
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
