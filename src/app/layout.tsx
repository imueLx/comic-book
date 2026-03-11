import type { Metadata } from "next";
import { Baloo_2, Nunito, Bangers } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-baloo",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-nunito",
});

const bangers = Bangers({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bangers",
});

export const metadata: Metadata = {
  title: "The Word Pattern Adventure",
  description:
    "A fun educational comic app for Grade 3 learners to master word patterns through interactive comics, quizzes, and activities.",
  manifest: "/manifest.json",
  keywords: [
    "educational",
    "comic book",
    "grade 3",
    "word patterns",
    "reading",
    "phonics",
    "kids learning app",
  ],
  authors: [{ name: "Word Pattern Adventure Team" }],
  openGraph: {
    title: "The Word Pattern Adventure",
    description:
      "Read an interactive comic and learn word patterns! For Grade 3 learners.",
    type: "website",
    siteName: "The Word Pattern Adventure",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="theme-color" content="#7C3AED" />
        <meta
          name="description"
          content="A fun educational comic app for Grade 3 learners to master word patterns through interactive comics, quizzes, and activities."
        />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${baloo.variable} ${nunito.variable} ${bangers.variable} antialiased overflow-x-hidden`}
      >
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
