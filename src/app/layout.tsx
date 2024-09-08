import { fontSans, plusJak, poppins } from "@/config/fonts";
import { NextUiProvider } from "@/providers/NextUiProvider";
import clsx from "clsx";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lunacal",
  description: "I love Next.JS and, You?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${fontSans.variable} ${poppins.variable} ${plusJak.variable}`}
    >
      <body
        className={clsx(
          "min-h-screen antialiased bg-black",
          fontSans.className,
        )}
      >
        <NextUiProvider>
          <main className="max-w-screen-1728 w-full mx-auto h-full px-2 overflow-auto">
            {children}
          </main>
        </NextUiProvider>
      </body>
    </html>
  );
}
