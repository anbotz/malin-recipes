import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import darkTheme from "../theme";
import { Inter } from "next/font/google";
import "./globals.css";
import AppBarComponent from "../_components/app-bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Malin Recipe",
  description: "Best recipes from Malin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={darkTheme}>
            <AppBarComponent />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
