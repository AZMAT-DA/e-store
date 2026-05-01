import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "SoleStride | Elite Footwear",
  description: "Experience the next level of premium footwear with SoleStride.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} antialiased selection:bg-primary selection:text-white`}>
        <Navbar />
        <main>{children}</main>
        {/* Footer could be here too */}
      </body>
    </html>
  );
}
