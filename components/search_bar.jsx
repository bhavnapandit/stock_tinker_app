"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2, TrendingUp } from "lucide-react";

/**
 * @typedef {Object} SearchResult
 * @property {string} symbol
 * @property {string} name
 * @property {string} exchange
 * @property {string} type
 */

export function Searchbar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [navigatingSymbol, setNavigatingSymbol] = useState("");
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const searchStocks = async () => {
      console.log("enter");

      if (query.length < 2) {
        setResults([]);
        setShowResults(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `https://portal.tradebrains.in/api/assignment/search?keyword=${query}&length=10`
        );
        const data = await response.json();
        console.log(data);

        // Map response to match the expected structure
        const formattedResults = data.map((stock) => ({
          symbol: stock.symbol,
          name: stock.company,
          exchange: "NSE", // Assuming NSE for all
          type: stock.type || "Equity",
        }));

        setResults(formattedResults);
        setShowResults(true);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchStocks, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleStockSelect = async (symbol) => {
    setIsNavigating(true);
    setNavigatingSymbol(symbol);
    setShowResults(false);
    setTimeout(() => {
      setQuery("");
      router.push(`/stock/${symbol}`);
    }, 500);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && results.length > 0 && !isNavigating) {
      handleStockSelect(results[0].symbol);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Navigation Loading Overlay */}
      {isNavigating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
          <div className="bg-white rounded-2xl p-8 shadow-2xl border border-red-200 text-center max-w-sm mx-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-red-500" />
              <h3 className="text-xl font-bold text-gray-900">Loading Stock Data</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Fetching details for <span className="font-semibold text-red-600">{navigatingSymbol}</span>
            </p>
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-6 h-6 text-red-500 animate-spin" />
              <span className="text-gray-700 font-medium">Please wait...</span>
            </div>
          </div>
        </div>
      )}

      <div ref={searchRef} className="relative w-full">
        <div className="relative flex items-center w-full">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search stocks by name or symbol..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isNavigating}
            className={`w-full pl-12 pr-12 py-4 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-sm transition-all duration-200 ${
              isNavigating ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:border-red-300'
            }`}
          />
          {(isLoading || isNavigating) && (
            <Loader2 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5 animate-spin" />
          )}
        </div>

        {showResults && results.length > 0 && !isNavigating && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-red-200 rounded-xl shadow-xl overflow-hidden z-50 max-h-72 overflow-y-auto">
            {results.map((stock) => (
              <button
                key={stock.symbol}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-red-50 focus:outline-none focus:bg-red-50 transition-colors border-b border-gray-100 last:border-b-0"
                onClick={() => handleStockSelect(stock.symbol)}
                disabled={isNavigating}
              >
                <div className="flex items-center">
                  <div className="font-semibold text-gray-900 mr-3">{stock.symbol}</div>
                  <div className="text-gray-600 truncate">{stock.name}</div>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <span className="px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-md">
                    {stock.exchange}
                  </span>
                  <span className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-md">
                    {stock.type}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {showResults && query.length >= 2 && results.length === 0 && !isLoading && !isNavigating && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-red-200 rounded-xl shadow-xl p-4 z-50">
            <div className="text-center">
              <Search className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">No stocks found for "{query}"</p>
              <p className="text-gray-400 text-sm mt-1">Try searching with a different keyword</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}