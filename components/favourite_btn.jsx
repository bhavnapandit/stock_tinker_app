"use client"
import { useEffect, useState } from "react"
import { ArrowRight, Heart} from "lucide-react"
import Link from "next/link"

export function FavoriteButton({ symbol, name }) {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const favorites = JSON.parse(localStorage.getItem("favoriteStocks") || "[]")
      const isFav = favorites.some((fav) => fav.symbol === symbol)
      setIsFavorite(isFav)
    }
  }, [symbol])

  /**
   * Toggle the favorite status of the stock and update the localStorage.
   */
  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favoriteStocks") || "[]")

    if (isFavorite) {
      // Remove the stock from favorites if it's already favorited
      favorites = favorites.filter((fav) => fav.symbol !== symbol)
    } else {
      // Add the stock to favorites if it's not already favorited
      favorites.push({ symbol, name, addedAt: new Date().toISOString() })
    }

    // Update the localStorage with the new list of favorites
    localStorage.setItem("favoriteStocks", JSON.stringify(favorites))
    // Update the component state with the new favorite status
    setIsFavorite(!isFavorite)
  }

  return (
    <>
    <button
      className={`favorite-button flex items-center gap-2 px-4 py-2 rounded border ${
        isFavorite ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
      } hover:shadow transition`}
      onClick={toggleFavorite}
    >
      <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
      {isFavorite ? "Favorited" : "Add to Favorites"}
    </button>
    <Link
      href="/watchlist"
      className="text-sm font-medium text-red-600 hover:underline mt-2 block"
    >
      Go to Watchlist
      <ArrowRight className="w-4 h-4 ml-2 inline-block" />
    </Link>
    </>
  )
}

