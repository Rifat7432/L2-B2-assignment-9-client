import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/Provider";
import CustomNavbar from "@/component/CustomNavbar";
import CustomFooter from "@/component/CustomFooter";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bark Buddies",
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
          <header className="w-full mb-16">
            <CustomNavbar />
          </header>
          <main className="min-h-screen">{children}</main>
          <CustomFooter />
        </Providers>
      </body>
    </html>
  );
}
