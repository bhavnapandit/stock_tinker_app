"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FavoriteButton } from "@/components/favourite_btn";
import { 
  Heart, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  AlertCircle,
  RefreshCw,
  Search,
  BarChart3,
  ArrowLeft
} from "lucide-react";

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([]);
  const [stockData, setStockData] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Get favorited stocks from localStorage
  const getFavoritedStocks = () => {
    try {
      const favorites =  JSON.parse(localStorage.getItem("favoriteStocks"))
      console.log(favorites);
      

      return favorites ;
    } catch (error) {
      console.error("Error reading favorites from localStorage:", error);
      return [];
    }
  };


  // Fetch stock data for a single symbol
  const fetchStockData = async (symbol) => {
    try {
      const res = await fetch(
        `https://portal.tradebrains.in/api/assignment/stock/${symbol}/prices?days=1&type=INTRADAY&limit=1`
      );
      const data = await res.json();

      if (!data || data.length === 0) return null;
      
      const latest = data[0];
      return {
        symbol: symbol.toUpperCase(),
        price: latest.close,
        change: latest.change,
        changePercent: latest.percent,
        volume: latest.volume,
        open: latest.open,
        high: latest.high,
        low: latest.low,
        prevClose: latest.prev_close,
      };
    } catch (error) {
      console.error(`Failed to fetch data for ${symbol}:`, error);
      return null;
    }
  };

  // Load watchlist and fetch stock data
  const loadWatchlist = async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) setRefreshing(true);
    
    const favorites = getFavoritedStocks();
    setWatchlist(favorites);

    if (favorites.length === 0) {
      setLoading(false);
      setRefreshing(false);
      return;
    }

    // Fetch stock data for all favorites
    const stockDataPromises = favorites.map(async (stock) => {
      const data = await fetchStockData(stock.symbol);
      return { symbol: stock.symbol, data };
    });

    try {
      const results = await Promise.all(stockDataPromises);
      const newStockData = {};
      
      results.forEach(({ symbol, data }) => {
        if (data) {
          newStockData[symbol] = data;
        }
      });

      setStockData(newStockData);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Handle favorite removal
  const handleFavoriteToggle = (symbol) => {
    const updatedWatchlist = watchlist.filter(stock => stock.symbol !== symbol);
    setWatchlist(updatedWatchlist);
    console.log(watchlist);
    
    // Remove from stockData as well
    const updatedStockData = { ...stockData };
    delete updatedStockData[symbol];
    setStockData(updatedStockData);
  };

  // Filter watchlist based on search term
  const filteredWatchlist = watchlist.filter(stock =>
    stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    loadWatchlist();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your watchlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 px-3 py-3 sm:px-4 sm:py-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
           <Link
            href="/"
            className="inline-flex items-center px-4 py-1 mb-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              My Watchlist
            </h1>
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs sm:text-sm font-semibold">
              {watchlist.length} stocks
            </span>
          </div>

          {/* Search and Refresh Controls */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search your watchlist..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
              />
            </div>
            <button
              onClick={() => loadWatchlist(true)}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Empty State */}
        {watchlist.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-xl border border-red-200 p-8 max-w-md mx-auto">
              <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h2 className="text-xl font-bold text-gray-800 mb-2">Your watchlist is empty</h2>
              <p className="text-gray-600 mb-6">
                Start adding stocks to your watchlist by clicking the heart icon on any stock page.
              </p>
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
              >
                <Search className="w-4 h-4 mr-2" />
                Explore Stocks
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Filtered Results Info */}
            {searchTerm && (
              <div className="mb-4 text-sm text-gray-600">
                Showing {filteredWatchlist.length} of {watchlist.length} stocks
                {filteredWatchlist.length === 0 && (
                  <span className="text-red-600 font-semibold"> - No matches found</span>
                )}
              </div>
            )}

            {/* Watchlist Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredWatchlist.map((stock) => {
                const data = stockData[stock.symbol];
                const isPositive = data?.change >= 0;

                return (
                  <div
                    key={stock.symbol}
                    className="bg-white rounded-xl shadow-lg border border-red-100 hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    {/* Card Header */}
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <Activity className="w-5 h-5 text-red-500 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <h3 className="font-bold text-gray-900 text-sm sm:text-base truncate" title={stock.name}>
                              {stock.name}
                            </h3>
                            <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                              {stock.symbol}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4">
                      {data ? (
                        <div className="space-y-3">
                          {/* Price and Change */}
                          <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-gray-900">
                              ₹{data.price.toFixed(2)}
                            </span>
                            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
                              isPositive 
                                ? "bg-green-100 text-green-800" 
                                : "bg-red-100 text-red-800"
                            }`}>
                              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                              {isPositive ? "+" : ""}{data.change.toFixed(2)} ({isPositive ? "+" : ""}{data.changePercent.toFixed(2)}%)
                            </div>
                          </div>

                          {/* Key Stats */}
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="bg-gray-50 p-2 rounded">
                              <span className="text-gray-600">High</span>
                              <div className="font-semibold text-green-600">₹{data.high.toFixed(2)}</div>
                            </div>
                            <div className="bg-gray-50 p-2 rounded">
                              <span className="text-gray-600">Low</span>
                              <div className="font-semibold text-red-600">₹{data.low.toFixed(2)}</div>
                            </div>
                          </div>

                          {/* View Details Button */}
                          <Link
                            href={`/stock/${stock.symbol.toLowerCase()}`}
                            className="block w-full text-center py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-semibold"
                          >
                            View Details
                          </Link>
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <AlertCircle className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                          <p className="text-gray-500 text-sm">Unable to load data</p>
                          <Link
                            href={`/stock/${stock.symbol.toLowerCase()}`}
                            className="inline-block mt-2 text-red-500 hover:text-red-600 text-sm font-semibold"
                          >
                            View Details
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* No Search Results */}
            {searchTerm && filteredWatchlist.length === 0 && (
              <div className="text-center py-8">
                <div className="bg-white rounded-xl shadow-lg border border-red-200 p-6 max-w-md mx-auto">
                  <BarChart3 className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No stocks found</h3>
                  <p className="text-gray-600 text-sm">
                    No stocks in your watchlist match "{searchTerm}"
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}