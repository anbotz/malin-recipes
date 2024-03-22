import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppBarComponent from "../_components/app-bar";
import SessionProvider from "../_components/session-provider";
import { getRequiredSession } from "@/lib/auth";
import { Toaster } from "sonner";

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
    <html lang="en" data-theme="forest">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <div className="flex h-dvh flex-col">
            <AppBarComponent />
            <div className="flex flex-1 flex-col">{children}</div>
          </div>
          <Toaster richColors />
        </SessionProvider>
      </body>
    </html>
  );
}
