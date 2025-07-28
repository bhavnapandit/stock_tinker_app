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
    <div className="p-4 max-w-3xl mx-auto">
      <Link href="/" className="text-blue-600 underline mb-4 inline-block">← Back</Link>
      <h1 className="text-2xl font-bold mb-4">My Watchlist</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-3 py-2 border rounded"
        />
        <button
          onClick={loadWatchlist}
          disabled={refreshing}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          <RefreshCw className="w-4 h-4 inline mr-1" />
          Refresh
        </button>
      </div>

      {filteredWatchlist.length === 0 ? (
        <p>No stocks found for &quot;{searchTerm}&quot;</p>
      ) : (
        <div className="space-y-4">
          {filteredWatchlist.map((stock) => {
            const data = stockData[stock.symbol];
            return (
              <div key={stock.symbol} className="border p-4 rounded">
                <h2 className="font-semibold">{stock.name} ({stock.symbol})</h2>
                {data ? (
                  <div className="text-sm mt-2">
                    <p>Price: ₹{data.price.toFixed(2)}</p>
                    <p>Change: {data.change.toFixed(2)} ({data.percent.toFixed(2)}%)</p>
                    <p>High: ₹{data.high.toFixed(2)}, Low: ₹{data.low.toFixed(2)}</p>
                    <Link href={`/stock/${stock.symbol.toLowerCase()}`} className="text-blue-600 underline mt-2 inline-block">
                      View Details
                    </Link>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No data available</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
