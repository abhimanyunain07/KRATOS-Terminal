import type { Metadata } from "next";
import "./globals.css";
import { TerminalShell } from "@/components/layout/terminal-shell";

export const metadata: Metadata = {
  title: "KRATOS Terminal",
  description: "Bloomberg-style PMAP geospatial analytics terminal for prediction markets.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-mono antialiased">
        <TerminalShell>{children}</TerminalShell>
      </body>
    </html>
  );
}
