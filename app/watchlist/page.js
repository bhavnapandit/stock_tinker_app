"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Search } from "lucide-react";

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([]);
  const [stockData, setStockData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getFavoritedStocks = () => {
    try {
      return JSON.parse(localStorage.getItem("favoriteStocks")) || [];
    } catch {
      return [];
    }
  };

  const fetchStockData = async (symbol) => {
    try {
      const res = await fetch(
        `https://portal.tradebrains.in/api/assignment/stock/${symbol}/prices?days=1&type=INTRADAY&limit=1`
      );
      const data = await res.json();
      if (!data?.length) return null;
      const latest = data[0];
      return {
        symbol: symbol.toUpperCase(),
        price: latest.close,
        change: latest.change,
        percent: latest.percent,
        high: latest.high,
        low: latest.low,
      };
    } catch {
      return null;
    }
  };

  const loadWatchlist = async () => {
    setRefreshing(true);
    const favorites = getFavoritedStocks();
    setWatchlist(favorites);
    const promises = favorites.map(async (stock) => ({
      symbol: stock.symbol,
      data: await fetchStockData(stock.symbol),
    }));
    const results = await Promise.all(promises);
    const newStockData = {};
    results.forEach(({ symbol, data }) => {
      if (data) newStockData[symbol] = data;
    });
    setStockData(newStockData);
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    loadWatchlist();
  }, []);

  const filteredWatchlist = watchlist.filter((stock) =>
    stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
   <div className="p-4  mx-auto bg-gradient-to-br from-red-50 to-white min-h-screen">
      <Link href="/" className="text-red-600 underline mb-4 inline-block hover:text-red-800 transition-colors font-medium">← Back</Link>
      <h1 className="text-3xl font-bold mb-6 text-red-900 bg-gradient-to-r from-red-800 to-red-600 bg-clip-text ">My Watchlist</h1>

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-3 border-2 border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white/80 backdrop-blur-sm shadow-sm placeholder-red-300"
        />
      </div>

      {filteredWatchlist.length === 0 ? (
        <p className="text-red-500 bg-red-50 p-4 rounded-lg border border-red-200">No stocks found for &quot;{searchTerm}&quot;</p>
      ) : (
        <div className="space-y-4">
          {filteredWatchlist.map((stock) => {
            const data = stockData[stock.symbol];
            return (
              <div key={stock.symbol} className="border-2 border-red-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm hover:border-red-200 hover:-translate-y-1">
                <h2 className="font-bold text-xl text-red-900 mb-3">{stock.name} ({stock.symbol})</h2>
                {data ? (
                  <div className="text-sm mt-3 text-red-800 space-y-2">
                    <p className="bg-red-50 p-2 rounded-md border-l-4 border-red-400">
                      <span className="font-semibold">Price:</span> ₹{data.price.toFixed(2)}
                    </p>
                    <p className="bg-red-50 p-2 rounded-md border-l-4 border-red-400">
                      <span className="font-semibold">Change:</span> {data.change.toFixed(2)} ({data.percent.toFixed(2)}%)
                    </p>
                    <p className="bg-red-50 p-2 rounded-md border-l-4 border-red-400">
                      <span className="font-semibold">High:</span> ₹{data.high.toFixed(2)}, <span className="font-semibold">Low:</span> ₹{data.low.toFixed(2)}
                    </p>
                    <Link href={`/stock/${stock.symbol.toLowerCase()}`} className="inline-block mt-4 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-medium">
                      View Details
                    </Link>
                  </div>
                ) : (
                  <p className="text-sm text-red-400 bg-red-50 p-3 rounded-lg border border-red-200">No data available</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
