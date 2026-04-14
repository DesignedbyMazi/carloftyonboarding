import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Carlofty - Complete Your Profile",
  description: "KYC Onboarding for Carlofty dealers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // h-full on html + body = the height chain that makes h-full work on any descendant
    <html lang="en" className="h-full">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="h-full">{children}</body>
    </html>
  );
}
