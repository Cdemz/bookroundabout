import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Stickytop from "./components/Stickytop";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "./context/ReduxProvider";
import NavBar from "./components/NavBar";
import DesktopNavbar from "./components/DesktopNavbar";
import TopMessage from "./components/TopMessage";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Books Roundabouts",
  description: "Book store website",
};

export default function RootLayout({
  children,
  session, // Pass the session data as a prop
}: {
  children: React.ReactNode;
  session: any; // Adjust the type as needed
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="bottom-center" />

        <ReduxProvider>
          <section>
            <TopMessage />
            <Stickytop />
          </section>
          <section>
            <NavBar />
            <DesktopNavbar />
          </section>
          {children}
          <section>
            <Footer />
          </section>
        </ReduxProvider>
      </body>
    </html>
  );
}
