function RecipeCard({ meal, expandedId, setExpandedId, favorites, toggleFavorite }) {
  const isExpanded = expandedId === meal.idMeal;
  const isFavorite = favorites.some(f => f.idMeal === meal.idMeal);

  return (
    <div className="rounded-2xl overflow-hidden transition-all hover:scale-[1.02]"
      style={{background: '#1a1a1a', border: '1px solid #2a2a2a'}}>
      <div className="relative">
        <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full object-cover h-48"/>
        <div className="absolute top-2 right-2 flex gap-2">
          {meal.strCategory && (
            <span className="text-xs px-2 py-1 rounded-full font-sans font-bold" style={{background: '#e8c547', color: '#0f0f0f'}}>
              {meal.strCategory}
            </span>
          )}
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-base font-bold mb-1 font-serif" style={{color: '#f0ebe3'}}>{meal.strMeal}</h2>
        {meal.strArea && <p className="text-xs mb-3 font-sans" style={{color: '#555'}}>🌍 {meal.strArea} cuisine</p>}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setExpandedId(isExpanded ? null : meal.idMeal)}
            className="text-xs px-3 py-1.5 rounded-lg font-sans transition-all hover:opacity-80"
            style={{background: '#2a2a2a', color: '#f0ebe3', border: '1px solid #3a3a3a'}}
          >
            {isExpanded ? 'Hide ▲' : 'View Recipe ▼'}
          </button>
          <button
            onClick={() => toggleFavorite(meal)}
            className="text-xs px-3 py-1.5 rounded-lg font-sans transition-all hover:opacity-80"
            style={{background: isFavorite ? '#3a2a0a' : '#2a2a2a', color: isFavorite ? '#e8c547' : '#888', border: `1px solid ${isFavorite ? '#e8c547' : '#3a3a3a'}`}}
          >
            {isFavorite ? '★ Saved' : '☆ Save'}
          </button>
        </div>
        {isExpanded && (
          <div className="mt-4 pt-4 space-y-3 font-sans" style={{borderTop: '1px solid #2a2a2a'}}>
            {meal.strInstructions && (
              <div>
                <p className="text-xs uppercase tracking-widest mb-2" style={{color: '#e8c547'}}>Instructions</p>
                <p className="text-xs leading-relaxed" style={{color: '#888'}}>
                  {meal.strInstructions.slice(0, 300)}...
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default RecipeCard;