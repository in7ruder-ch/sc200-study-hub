import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "SC-200 Study Hub",
  description: "An interactive, open study reference for the Microsoft SC-200 exam.",
};

export default function RootRedirectLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
