
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {AntdRegistry} from "@ant-design/nextjs-registry";
import React from "react";


import Providers from "./providers";
import {CookiesProvider} from "next-client-cookies/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
    <html lang="en">
        <body className={inter.className}>
        <Providers>
            <CookiesProvider>
                <AntdRegistry>{children}</AntdRegistry>
            </CookiesProvider>
            </Providers>
        </body>
    </html>
    );
}
