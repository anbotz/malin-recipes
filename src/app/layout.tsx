import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppBarComponent from "../_components/app-bar";
import SessionProvider from "../_components/session-provider";
import { getRequiredSession } from "@/lib/auth";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Malin Recipe",
  description: "Best recipes from Malin",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getRequiredSession();

  return (
    <html lang="en" className="overflow-hidden" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ThemeProvider>
            <div className="flex h-dvh flex-col">
              <AppBarComponent />
              <div className="flex flex-1 flex-col overflow-auto">
                {children}
              </div>
            </div>
            <Toaster richColors />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
