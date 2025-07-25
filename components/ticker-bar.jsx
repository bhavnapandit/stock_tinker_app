"use client";

import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
function TickerBar() {
  const [tickerData, setTickerData] = useState([]);

  useEffect(() => {
    const fetchTickerData = async () => {
      try {
        // Not using the API below as its response is currently 404, so using mock data instead.
        // const response = await fetch('https://portal.tradebrains.in/api/assignment/index/NIFTY/movers/')
        // const data = await response.json()

        // Mock data for demonstration
        const mockData = [
          {
            symbol: "NIFTY 50",
            price: 19500.25,
            change: 125.3,
            changePercent: 0.65,
          },
          {
            symbol: "SENSEX",
            price: 65432.1,
            change: -89.45,
            changePercent: -0.14,
          },
          {
            symbol: "RELIANCE",
            price: 2456.75,
            change: 23.5,
            changePercent: 0.97,
          },
          { symbol: "TCS", price: 3234.2, change: -15.8, changePercent: -0.49 },
          {
            symbol: "HDFCBANK",
            price: 1567.9,
            change: 12.45,
            changePercent: 0.8,
          },
          { symbol: "INFY", price: 1432.65, change: 8.9, changePercent: 0.63 },
          {
            symbol: "ICICIBANK",
            price: 987.3,
            change: -5.2,
            changePercent: -0.52,
          },
          { symbol: "ITC", price: 456.8, change: 3.45, changePercent: 0.76 },
        ];

        setTickerData(mockData);
      } catch (error) {
        console.error("Error fetching ticker data:", error);
      }
    };

    fetchTickerData();
    const interval = setInterval(fetchTickerData, 30000);

    return () => clearInterval(interval);
  }, []);

  if (tickerData.length === 0) return null;

  return (
   <div className="w-full bg-gray-900 text-white py-2 overflow-hidden relative">
      <div className="ticker-animate flex whitespace-nowrap">
        {tickerData.concat(tickerData).map((item, index) => (
          <div key={`${item.symbol}-${index}`} className="flex items-center gap-4 px-6 whitespace-nowrap flex-shrink-0">
            <div className="font-bold text-blue-400 text-sm">
              {item.symbol}
            </div>
            <span className="font-medium text-sm">₹{item.price.toFixed(2)}</span>
            <div className={`flex items-center gap-1 ${item.change >= 0 ? "text-green-400" : "text-red-400"}`}>
              {item.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              <span className="text-xs">
                {item.change >= 0 ? "+" : ""}₹{item.change.toFixed(2)} ({item.change >= 0 ? "+" : ""}
                {item.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .ticker-animate {
          animation: scroll 30s linear infinite;
        }
        
        .ticker-animate:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

export default TickerBar;
