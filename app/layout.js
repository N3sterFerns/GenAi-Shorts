import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import ClientConvexProvider from "./ClientConvexProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Gen Ai Shorts & Reels",
  description: "Generated Reels & Shorts with teh power of Ai",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientConvexProvider>
          {children}
        </ClientConvexProvider>
      </body>
    </html>
  );
}
