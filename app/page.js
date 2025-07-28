import { Searchbar } from '@/components/search_bar'
import { TrendingUp, Search, BarChart3, Star, Activity, Target, Zap } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 overflow-x-hidden">
      {/* Header with search bar and title */}
      <div className="bg-gradient-to-r from-red-100 via-white to-pink-100 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Title and search bar */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Activity className="w-12 h-12 text-black animate-pulse" />
              <h1 className="text-5xl lg:text-6xl font-bold text-black drop-shadow-lg">
                Stock Market Tracker
              </h1>
            </div>
            <p className="text-xl lg:text-2xl text-gray-600 font-medium max-w-3xl mx-auto">
              Search, analyze, and track your favorite stocks in real-time with beautiful charts and insights
            </p>
          </div>

          {/* Search bar */}
          <div className="relative z-20 max-w-2xl mx-auto">
            <div className="bg-white backdrop-blur-sm rounded-2xl p-6 border border-white shadow-2xl">
              <Searchbar />
            </div>
          </div>
        </div>
      </div>

      

      {/* Features section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 relative z-0">
          {/* Feature 1 - Search Stocks */}
          <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-red-100 hover:border-red-200 hover:-translate-y-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Search Stocks</h3>
              <div className="bg-gradient-to-br from-red-100 to-red-200 p-3 rounded-xl group-hover:from-red-200 group-hover:to-red-300 transition-all duration-300">
                <Search className="w-7 h-7 text-red-600" />
              </div>
            </div>
            <div className="mb-4">
              <div className="text-3xl font-bold text-red-600 mb-3">Real-Time</div>
              <p className="text-gray-600 leading-relaxed">Search from thousands of stocks with instant results and live data</p>
            </div>
            <div className="mt-6 h-1 bg-gradient-to-r from-red-400 to-pink-400 rounded-full"></div>
          </div>

          {/* Feature 2 - Price Charts */}
          <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-red-100 hover:border-red-200 hover:-translate-y-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Price Charts</h3>
              <div className="bg-gradient-to-br from-pink-100 to-pink-200 p-3 rounded-xl group-hover:from-pink-200 group-hover:to-pink-300 transition-all duration-300">
                <BarChart3 className="w-7 h-7 text-pink-600" />
              </div>
            </div>
            <div className="mb-4">
              <div className="text-3xl font-bold text-pink-600 mb-3">Interactive</div>
              <p className="text-gray-600 leading-relaxed">Beautiful transparent red charts with detailed price visualization</p>
            </div>
            <div className="mt-6 h-1 bg-gradient-to-r from-pink-400 to-red-400 rounded-full"></div>
          </div>

          {/* Feature 3 - Market Trends */}
          <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-red-100 hover:border-red-200 hover:-translate-y-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Market Trends</h3>
              <div className="bg-gradient-to-br from-red-100 to-pink-100 p-3 rounded-xl group-hover:from-red-200 group-hover:to-pink-200 transition-all duration-300">
                <TrendingUp className="w-7 h-7 text-red-500" />
              </div>
            </div>
            <div className="mb-4">
              <div className="text-3xl font-bold text-red-500 mb-3">Live</div>
              <p className="text-gray-600 leading-relaxed">Track market movements and analyze trends in real-time</p>
            </div>
            <div className="mt-6 h-1 bg-gradient-to-r from-red-400 to-red-500 rounded-full"></div>
          </div>

          {/* Feature 4 - Favorites */}
          <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-red-100 hover:border-red-200 hover:-translate-y-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Favorites</h3>
              <div className="bg-gradient-to-br from-pink-100 to-red-100 p-3 rounded-xl group-hover:from-pink-200 group-hover:to-red-200 transition-all duration-300">
                <Star className="w-7 h-7 text-pink-500" />
              </div>
            </div>
            <div className="mb-4">
              <div className="text-3xl font-bold text-pink-500 mb-3">Save</div>
              <p className="text-gray-600 leading-relaxed">Quick access to your favorite stocks with personalized tracking</p>
            </div>
            <div className="mt-6 h-1 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full"></div>
          </div>
        </div>

        {/* How to use section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-red-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-red-100 to-transparent rounded-full -translate-y-32 translate-x-32 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-pink-100 to-transparent rounded-full translate-y-24 -translate-x-24 opacity-50"></div>

          <div className="relative z-10">
            <div className="mb-12 text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Target className="w-10 h-10 text-red-500" />
                <h2 className="text-4xl font-bold text-gray-900">How to Use</h2>
              </div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Get started with our stock tracker in three simple steps and unlock powerful market insights
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {/* Step 1 - Search Stocks */}
              <div className="text-center group">
                <div className="relative mb-8">
                  <div className="bg-gradient-to-br from-red-500 to-red-600 text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    1
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-br from-red-200 to-pink-200 rounded-full opacity-20 animate-pulse"></div>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border border-red-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                    <Search className="w-6 h-6 text-red-500" />
                    Search Stocks
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Use our powerful search bar to find any stock by name or symbol with instant autocomplete suggestions
                  </p>
                </div>
              </div>

              {/* Step 2 - View Details */}
              <div className="text-center group">
                <div className="relative mb-8">
                  <div className="bg-gradient-to-br from-red-500 to-red-600 text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    2
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-br from-red-200 to-pink-200 rounded-full opacity-20 animate-pulse"></div>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border border-red-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                    <BarChart3 className="w-6 h-6 text-red-500" />
                    View Details
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Click on any stock to see detailed information, beautiful charts, and comprehensive market statistics
                  </p>
                </div>
              </div>

              <div className="text-center group">
                <div className="relative mb-8">
                  <div className="bg-gradient-to-br from-red-500 to-red-600 text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    3
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-br from-red-200 to-pink-200 rounded-full opacity-20 animate-pulse"></div>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border border-red-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                    <Zap className="w-6 h-6 text-red-500" />
                    Track & Analyze
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Save your favorites and analyze price trends with our interactive tools and real-time updates
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-8 shadow-2xl">
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Start Trading?</h3>
            <p className="text-red-100 text-lg mb-6 max-w-2xl mx-auto">
              Join thousands of investors who trust our platform for accurate, real-time market data and insights.
            </p>
            <div className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-3 rounded-full font-bold hover:bg-red-50 transition-colors cursor-pointer shadow-lg">
              <Activity className="w-5 h-5" />
              Get Started Now
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
