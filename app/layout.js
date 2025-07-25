import  React from "react"
import { Inter } from "next/font/google"
import './globals.css';
import TickerBar from "@/components/ticker-bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Stock Ticker - Real-time Stock Market Data",
  description:
    "Track real-time stock prices, search stocks, and analyze market trends with our comprehensive stock ticker application.",
  keywords: "stocks, stock market, trading, finance, investment, stock prices, market data",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TickerBar />
        <main className="min-h-screen bg-background">{children}</main>
      </body>
    </html>
  );
}
