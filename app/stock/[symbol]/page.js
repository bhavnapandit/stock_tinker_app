"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FavoriteButton } from "@/components/favourite_btn";
import StockChart from "@/components/stock_chart";
import { ArrowLeft, TrendingUp, TrendingDown, BarChart3, Activity } from "lucide-react";

export default function StockPage() {
  const { symbol } = useParams();
  const router = useRouter();
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getStockData = async (symbol) => {
    try {
      const res = await fetch(
        `https://portal.tradebrains.in/api/assignment/stock/${symbol}/prices?days=1&type=INTRADAY&limit=1`
      );
      const data = await res.json();
      if (!data || data.length === 0) return null;
      const latest = data[0];
      return {
        symbol: symbol.toUpperCase(),
        name: `${symbol.toUpperCase()} Limited`,
        price: latest.close,
        change: latest.change,
        changePercent: latest.percent,
        volume: latest.volume,
        valueTraded: latest.value,
        open: latest.open,
        high: latest.high,
        low: latest.low,
        prevClose: latest.prev_close,
      };
    } catch (error) {
      console.error("Failed to fetch stock price data:", error);
      return null;
    }
  };

  useEffect(() => {
    if (!symbol) return;

    (async () => {
      const data = await getStockData(symbol);
      setStockData(data);
      setLoading(false);
    })();
  }, [symbol]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        Loading stock data...
      </div>
    );
  }

  if (!stockData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center p-4">
        <div className="text-center p-6 sm:p-8 bg-white rounded-2xl shadow-xl border border-red-200 max-w-md w-full">
          <BarChart3 className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-red-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Stock Not Found</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4">The requested stock symbol could not be found.</p>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  const isPositive = stockData.change >= 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 px-3 py-3 sm:px-4 sm:py-4 lg:px-8">
      <div className="max-w-7xl mx-auto h-full flex flex-col min-h-[calc(100vh-1.5rem)] sm:min-h-[calc(100vh-2rem)]">
        {/* Compact Header */}
        <div className="mb-3 sm:mb-4 flex-shrink-0">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-red-600 transition-all duration-200 font-medium group mb-2 sm:mb-3 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Search
          </Link>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-red-100 p-3 sm:p-4">
            <div className="flex flex-col gap-3 sm:gap-4">
              {/* Top row - Icon, Name, and favorite button */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                      {stockData.name}
                    </h1>
                    <span className="inline-block text-xs sm:text-sm font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded-full mt-1">
                      {stockData.symbol}
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <FavoriteButton symbol={stockData.symbol} name={stockData.name} />
                </div>
              </div>

              {/* Bottom row - Price and change */}
              <div className="flex flex-col xs:flex-row xs:items-center gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                  ₹{stockData.price.toFixed(2)}
                </span>
                <div
                  className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-md w-fit ${isPositive
                    ? "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300"
                    : "bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300"
                    }`}
                >
                  {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span className="whitespace-nowrap">
                    {isPositive ? "+" : ""}
                    ₹{stockData.change.toFixed(2)} ({isPositive ? "+" : ""}{stockData.changePercent.toFixed(2)}%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Flexible Height */}
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-3 sm:gap-4 flex-1 min-h-0">
          {/* Stats Section - Mobile First */}
          <div className="lg:col-span-1 lg:order-2 flex flex-col min-h-0">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-red-100 p-3 sm:p-4 hover:shadow-2xl transition-shadow duration-300 flex-1 flex flex-col">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-shrink-0">
                <div className="w-2 h-4 sm:h-6 bg-gradient-to-b from-red-500 to-pink-500 rounded-full"></div>
                <h2 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">Key Statistics</h2>
              </div>

              {/* Stats Grid - 2 columns on mobile, 1 on lg+ */}
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 flex-1 overflow-y-auto">
                {[
                  { label: "Open", value: `₹${stockData.open.toFixed(2)}`, color: "text-blue-600" },
                  { label: "High", value: `₹${stockData.high.toFixed(2)}`, color: "text-green-600" },
                  { label: "Low", value: `₹${stockData.low.toFixed(2)}`, color: "text-red-600" },
                  { label: "Volume", value: stockData.volume.toLocaleString(), color: "text-purple-600" },
                  { label: "Value Traded", value: `₹${(stockData.valueTraded / 1e7).toFixed(2)} Cr`, color: "text-orange-600" },
                  { label: "Previous Close", value: `₹${stockData.prevClose.toFixed(2)}`, color: "text-gray-600" },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-2 sm:p-3 border border-red-100 hover:border-red-200 transition-colors">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-1">
                      <span className="text-gray-700 font-semibold text-xs sm:text-sm leading-tight">{stat.label}</span>
                      <span className={`${stat.color} font-bold text-xs sm:text-sm truncate`} title={stat.value}>
                        {stat.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Market Status */}
              <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg text-white flex-shrink-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs sm:text-sm">Market Status</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium">Live</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="lg:col-span-3 lg:order-1 flex flex-col min-h-0">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-red-100 p-3 sm:p-4 hover:shadow-2xl transition-shadow duration-300 flex-1 flex flex-col min-h-0">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-shrink-0">
                <div className="w-2 h-4 sm:h-6 bg-gradient-to-b from-red-500 to-pink-500 rounded-full"></div>
                <h2 className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900">Price Chart</h2>
                <div className="flex-1"></div>
                <div className="text-xs text-gray-500 bg-red-50 px-2 py-1 rounded-full">
                  Intraday
                </div>
              </div>
              <div className="flex-1 min-h-0 rounded-xl border-2 border-red-100 bg-gradient-to-br from-red-25 to-pink-25 p-1 sm:p-2 shadow-inner min-h-[250px] sm:min-h-[300px] md:min-h-[400px]">
                <StockChart symbol={stockData.symbol} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}