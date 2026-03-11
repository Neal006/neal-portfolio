import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import CustomCursor from "@/components/layout/CustomCursor";
import LenisWrapper from "@/components/layout/LenisWrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neal Daftary — AI & ML Portfolio",
  description:
    "Portfolio of Neal Daftary — AI Engineer specializing in Computer Vision, Deep Learning, and Full-Stack AI solutions. Published IEEE researcher and hackathon winner.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
          themes={["dark", "light"]}
        >
          <LenisWrapper>
            <CustomCursor />
            {children}
          </LenisWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
