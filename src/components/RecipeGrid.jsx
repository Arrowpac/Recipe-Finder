import RecipeCard from "./RecipeCard";

function RecipeGrid({ recipes, expandedId, setExpandedId, favorites, toggleFavorite }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((meal) => (
        <RecipeCard
          key={meal.idMeal}
          meal={meal}
          expandedId={expandedId}
          setExpandedId={setExpandedId}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  )
}

export default RecipeGrid;