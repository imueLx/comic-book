import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Word Pattern Adventure",
  description:
    "A fun educational app for Grade 3 learners to master word patterns through comics and activities.",
  manifest: "/manifest.json",
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
      </head>
      <body className="antialiased overflow-x-hidden">{children}</body>
    </html>
  );
}
