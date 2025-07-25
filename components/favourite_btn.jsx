"use client"
import { useEffect, useState } from "react"
import { Heart } from "lucide-react"

export function FavoriteButton({ symbol, name }) {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const favorites = JSON.parse(localStorage.getItem("favoriteStocks") || "[]")
      const isFav = favorites.some((fav) => fav.symbol === symbol)
      setIsFavorite(isFav)
    }
  }, [symbol])

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favoriteStocks") || "[]")

    if (isFavorite) {
      favorites = favorites.filter((fav) => fav.symbol !== symbol)
    } else {
      favorites.push({ symbol, name, addedAt: new Date().toISOString() })
    }

    localStorage.setItem("favoriteStocks", JSON.stringify(favorites))
    setIsFavorite(!isFavorite)
  }

  return (
    <button
      className={`favorite-button flex items-center gap-2 px-4 py-2 rounded border ${
        isFavorite ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
      } hover:shadow transition`}
      onClick={toggleFavorite}
    >
      <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
      {isFavorite ? "Favorited" : "Add to Favorites"}
    </button>
  )
}

