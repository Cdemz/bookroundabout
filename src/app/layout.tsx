"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Stickytop from "./components/Stickytop";
import Footer from "./components/Footer";
import AdvancedNav from "./components/AdvancedNav";
import NavBar from "./components/NavBar";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Books Roundabouts",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="bottom-center" />

        <section>
          <Stickytop />
        </section>
        <section>
          <AdvancedNav />
        </section>
        {children}
        <section>
          <Footer />
        </section>
      </body>
    </html>
  );
}
