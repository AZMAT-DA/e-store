import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: "SoleStride - Premium Footwear",
  description: "Premium shoes e-store",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{margin:0,background:"#0a0a0a",color:"#f5f5f5",fontFamily:"DM Sans, sans-serif"}}>
        <CartProvider>
          <Navbar />
          <main style={{paddingTop:64}}>{children}</main>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
