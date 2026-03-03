import { useState } from 'react'
import RecipeGrid from '../components/RecipeGrid'

function Favorites() {
  const [expandedId, setExpandedId] = useState(null)
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites') || '[]')
  )

  function toggleFavorite(meal) {
    const isFav = favorites.some(f => f.idMeal === meal.idMeal)
    const updated = isFav
      ? favorites.filter(f => f.idMeal !== meal.idMeal)
      : [...favorites, meal]
    setFavorites(updated)
    localStorage.setItem('favorites', JSON.stringify(updated))
  }

  return (
    <div className="max-w-6xl mx-auto px-8 py-10">
      <h2 className="text-4xl font-serif mb-2" style={{color: '#f0ebe3'}}>Your Favorites</h2>
      <p className="text-sm font-sans mb-8" style={{color: '#555'}}>{favorites.length} saved recipes</p>
      {favorites.length === 0 ? (
        <div className="text-center py-32">
          <p className="text-6xl mb-4">🤍</p>
          <p className="text-xl font-serif" style={{color: '#888'}}>No favorites yet.</p>
          <p className="text-sm mt-2 font-sans" style={{color: '#555'}}>
            Search for recipes and hit Save to add them here.
          </p>
        </div>
      ) : (
        <RecipeGrid
          recipes={favorites}
          expandedId={expandedId}
          setExpandedId={setExpandedId}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      )}
    </div>
  )
}

export default Favorites