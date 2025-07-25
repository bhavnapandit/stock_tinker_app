"use client";

import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Loader2 } from "lucide-react";

const StockChart = ({ symbol }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPriceData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://portal.tradebrains.in/api/assignment/stock/${symbol}/prices?days=1&type=INTRADAY&limit=100`
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();

        let chartData = [];
        if (Array.isArray(result)) chartData = result;
        else if (result.data && Array.isArray(result.data))
          chartData = result.data;
        else if (result.prices && Array.isArray(result.prices))
          chartData = result.prices;

        const processedData = chartData.map((item, index) => ({
          time:
            item.time || item.timestamp || item.date || `Point ${index + 1}`,
          price: Number.parseFloat(item.price || item.close || item.value || 0),
          volume: item.volume || 0,
        }));
        setData(processedData);
      } catch (error) {
        console.error("Error fetching price data:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (symbol) fetchPriceData();
  }, [symbol]);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-2 sm:p-3 backdrop-blur-sm bg-opacity-95 max-w-[180px] sm:max-w-[200px] md:max-w-none">
          <p className="text-xs sm:text-sm font-medium text-gray-800 mb-1 truncate">
            Time: {label}
          </p>
          <p className="text-xs sm:text-sm font-semibold text-red-600">
            Price: ₹{parseFloat(payload[0].value).toFixed(2)}
          </p>
          {data.volume > 0 && (
            <p className="text-xs text-gray-600 mt-1">
              Volume: {data.volume.toLocaleString()}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50 rounded-lg min-h-[200px] sm:min-h-[250px] md:min-h-[300px]">
        <div className="text-center px-4">
          <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 animate-spin mx-auto mb-3 sm:mb-4 text-red-500" />
          <p className="text-gray-700 font-medium text-xs sm:text-sm md:text-base">Loading chart data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50 rounded-lg min-h-[200px] sm:min-h-[250px] md:min-h-[300px]">
        <div className="text-center p-3 sm:p-4 md:p-6 max-w-xs sm:max-w-sm md:max-w-md mx-4">
          <div className="bg-red-100 border border-red-300 rounded-lg p-3 sm:p-4">
            <p className="text-red-700 mb-2 font-semibold text-xs sm:text-sm md:text-base leading-tight">
              Error loading data: {error}
            </p>
            <p className="text-red-600 text-xs sm:text-sm">
              Please check the API endpoint and your network connection.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 shadow-inner min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[400px]">
      <div className="flex-1 w-full h-full p-1 sm:p-2">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%" minHeight={180}>
            <AreaChart
              data={data}
              margin={{ 
                top: 8, 
                right: 4, 
                left: 4, 
                bottom: 8 
              }}
            >
              <defs>
                <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.6} />
                  <stop offset="30%" stopColor="#f87171" stopOpacity={0.4} />
                  <stop offset="70%" stopColor="#fca5a5" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#fecaca" stopOpacity={0.1} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                strokeOpacity={0.7}
              />

              <XAxis
                dataKey="time"
                tick={{ fontSize: 8, fill: "#6b7280", fontWeight: 400 }}
                tickLine={{ stroke: "#9ca3af" }}
                axisLine={{ stroke: "#d1d5db" }}
                interval="preserveStartEnd"
                height={25}
                tickFormatter={() => ""}
                hide={window.innerWidth < 640} // Hide on mobile
              />

              <YAxis
                tick={{ fontSize: 8, fill: "#6b7280", fontWeight: 400 }}
                tickLine={{ stroke: "#9ca3af" }}
                axisLine={{ stroke: "#d1d5db" }}
                domain={["dataMin - 5", "dataMax + 5"]}
                tickFormatter={(value) => {
                  // Shorter format on mobile
                  if (window.innerWidth < 640) {
                    return `₹${parseFloat(value).toFixed(0)}`;
                  }
                  return `₹${parseFloat(value).toFixed(0)}`;
                }}
                width={window.innerWidth < 640 ? 35 : 40}
                tickCount={window.innerWidth < 640 ? 4 : 6} // Fewer ticks on mobile
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: "#ef4444",
                  strokeWidth: 1.5,
                  strokeDasharray: "3 3",
                  strokeOpacity: 0.7,
                }}
              />

              <Area
                type="monotone"
                dataKey="price"
                stroke="#dc2626"
                strokeWidth={window.innerWidth < 640 ? 1.5 : 2} // Thinner line on mobile
                fill="url(#redGradient)"
                fillOpacity={1}
                dot={false}
                activeDot={{
                  r: window.innerWidth < 640 ? 3 : 4, // Smaller dot on mobile
                  stroke: "#dc2626",
                  strokeWidth: 2,
                  fill: "#ffffff",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50 rounded-lg min-h-[200px]">
            <div className="text-center p-3 sm:p-4 md:p-6 mx-4">
              <div className="bg-red-100 border border-red-200 rounded-lg p-3 sm:p-4">
                <p className="text-red-700 font-medium text-xs sm:text-sm md:text-base leading-tight">
                  No data available to display for this period.
                </p>
                <p className="text-red-600 text-xs sm:text-sm mt-1">
                  Please try again or select a different time period.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockChart;