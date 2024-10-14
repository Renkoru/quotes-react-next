import type { Metadata } from "next";
import localFont from "next/font/local";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import "@styles/globals.css";

import NavBar from "../components/NavBar";
import Layout from "../components/Layout";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Quotes",
  description: "Discover & share quotes",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppRouterCacheProvider>
          <NavBar />
          <Layout>
            {children}
          </Layout>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
