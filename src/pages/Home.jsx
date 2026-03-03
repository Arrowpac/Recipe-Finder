import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import RecipeGrid from "../components/RecipeGrid";

function Home() {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(sessionStorage.getItem("query") || "");
  const [recipes, setRecipes] = useState(
    JSON.parse(sessionStorage.getItem("recipes") || "[]"),
  );
  const [searched, setSearched] = useState(
    sessionStorage.getItem("searched") === "true",
  );
  const [vegOnly, setVegOnly] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [countries, setCountries] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites") || "[]"),
  );

  useEffect(() => {
    sessionStorage.setItem("recipes", JSON.stringify(recipes));
    sessionStorage.setItem("searched", searched);
    sessionStorage.setItem("query", query);
  }, [recipes, searched, query]);

  useEffect(() => {
    async function fetchCountries() {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/list.php?a=list",
      );
      const data = await res.json();
      setCountries(data.meals.map((m) => m.strArea));
    }
    fetchCountries();
  }, []);

  // Sync favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
    window.dispatchEvent(new Event("storage"));
  }, [favorites]);

  async function searchRecipes() {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
      );
      const data = await res.json();
      setRecipes(data.meals || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  }

  async function getRandomMeal() {
    setLoading(true);
    try {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php",
      );
      const data = await res.json();
      setRecipes(data.meals || []);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  }

  async function searchByCountry(country) {
    if (!country) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`,
      );
      const data = await res.json();
      const basicMeals = data.meals || [];
      const detailed = await Promise.all(
        basicMeals.map(async (meal) => {
          const r = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`,
          );
          const d = await r.json();
          return d.meals[0];
        }),
      );
      setRecipes(detailed);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  }

  async function searchByLetter(letter) {
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`,
      );
      const data = await res.json();
      setRecipes(data.meals || []);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  }

  function handleKeydown(e) {
    if (e.key === "Enter") searchRecipes();
  }

  function toggleFavorite(meal) {
    const isFav = favorites.some((f) => f.idMeal === meal.idMeal);
    setFavorites(
      isFav
        ? favorites.filter((f) => f.idMeal !== meal.idMeal)
        : [...favorites, meal],
    );
  }

  const displayedRecipes = vegOnly
    ? recipes.filter((r) => r.strCategory === "Vegetarian")
    : recipes;

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  return (
    <>
      {/* HERO — only before search */}
      {!searched && (
        <div
          className="flex flex-col items-center justify-center text-center px-4 py-32"
          style={{
            background: "linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%)",
          }}
        >
          <p
            className="text-sm uppercase tracking-widest mb-4 font-sans"
            style={{ color: "#e8c547" }}
          >
            Discover • Cook • Enjoy
          </p>
          <h1
            className="text-6xl md:text-8xl font-bold mb-6 leading-tight font-serif"
            style={{ color: "#f0ebe3" }}
          >
            Find Your Next
            <br />
            <span style={{ color: "#e8c547" }}>Favorite Meal</span>
          </h1>
          <p
            className="text-lg mb-10 max-w-md font-sans"
            style={{ color: "#888" }}
          >
            Search thousands of recipes by ingredient, cuisine, or just let us
            surprise you.
          </p>
          <SearchBar
            query={query}
            setQuery={setQuery}
            searchRecipes={searchRecipes}
            handleKeydown={handleKeydown}
          />
          <div className="flex items-center gap-6 mt-6 flex-wrap justify-center">
            <label
              className="flex items-center gap-2 text-sm font-sans cursor-pointer"
              style={{ color: "#888" }}
            >
              <input
                type="checkbox"
                onChange={() => setVegOnly(!vegOnly)}
                className="w-4 h-4"
                style={{ accentColor: "#e8c547" }}
              />
              🥦 Vegetarian only
            </label>
            <button
              onClick={getRandomMeal}
              className="text-sm font-sans px-4 py-2 rounded-lg cursor-pointer transition-all hover:scale-105"
              style={{
                background: "#e8c547",
                color: "#0f0f0f",
                fontWeight: "600",
              }}
            >
              🎲 Random Meal
            </button>
            <select
              onChange={(e) => searchByCountry(e.target.value)}
              className="text-sm font-sans px-3 py-2 rounded-lg cursor-pointer focus:outline-none"
              style={{
                background: "#1e1e1e",
                color: "#f0ebe3",
                border: "1px solid #3a3a3a",
              }}
            >
              <option value="">🌍 By Country</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          {/* Letter Browse */}
          <div className="mt-10 flex flex-wrap justify-center gap-2 max-w-2xl">
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => searchByLetter(letter)}
                className="w-8 h-8 text-xs font-bold rounded-lg font-sans cursor-pointer transition-all"
                style={{
                  background: "#1e1e1e",
                  color: "#888",
                  border: "1px solid #2a2a2a",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#e8c547";
                  e.target.style.color = "#0f0f0f";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "#1e1e1e";
                  e.target.style.color = "#888";
                }}
              >
                {letter.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* SEARCH BAR after search */}
      {searched && (
        <div
          className="px-8 py-5"
          style={{ background: "#141414", borderBottom: "1px solid #2a2a2a" }}
        >
          <div className="max-w-6xl mx-auto flex items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-64">
              <SearchBar
                query={query}
                setQuery={setQuery}
                searchRecipes={searchRecipes}
                handleKeydown={handleKeydown}
              />
            </div>
            <label
              className="flex items-center gap-2 text-sm font-sans cursor-pointer"
              style={{ color: "#888" }}
            >
              <input
                type="checkbox"
                onChange={() => setVegOnly(!vegOnly)}
                className="w-4 h-4"
                style={{ accentColor: "#e8c547" }}
              />
              🥦 Vegetarian only
            </label>
            <button
              onClick={getRandomMeal}
              className="text-sm font-sans px-4 py-2 rounded-lg cursor-pointer transition-all hover:scale-105"
              style={{
                background: "#e8c547",
                color: "#0f0f0f",
                fontWeight: "600",
              }}
            >
              🎲 Random
            </button>
            <select
              onChange={(e) => searchByCountry(e.target.value)}
              className="text-sm font-sans px-3 py-2 rounded-lg cursor-pointer focus:outline-none"
              style={{
                background: "#1e1e1e",
                color: "#f0ebe3",
                border: "1px solid #3a3a3a",
              }}
            >
              <option value="">🌍 By Country</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center items-center py-32">
          <p
            className="text-2xl animate-pulse font-serif"
            style={{ color: "#e8c547" }}
          >
            Finding recipes...
          </p>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && searched && recipes.length === 0 && (
        <div className="text-center py-32">
          <p className="text-6xl mb-4">🍽️</p>
          <p className="text-xl font-serif" style={{ color: "#888" }}>
            No recipes found.
          </p>
          <p className="text-sm mt-2 font-sans" style={{ color: "#555" }}>
            Try "chicken", "pasta", or browse by letter
          </p>
        </div>
      )}

      {/* RESULTS */}
      {!loading && searched && displayedRecipes.length > 0 && (
        <div className="max-w-6xl mx-auto px-8 py-10">
          <p className="text-sm mb-6 font-sans" style={{ color: "#555" }}>
            {displayedRecipes.length} recipes found
          </p>
          <RecipeGrid
            recipes={displayedRecipes}
            expandedId={expandedId}
            setExpandedId={setExpandedId}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        </div>
      )}

      {/* LETTER BAR after search */}
      {searched && !loading && (
        <div className="max-w-6xl mx-auto px-8 pb-10">
          <p
            className="text-xs uppercase tracking-widest mb-3 font-sans"
            style={{ color: "#555" }}
          >
            Browse by letter
          </p>
          <div className="flex flex-wrap gap-2">
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => searchByLetter(letter)}
                className="w-8 h-8 text-xs font-bold rounded-lg font-sans cursor-pointer transition-all"
                style={{
                  background: "#1e1e1e",
                  color: "#888",
                  border: "1px solid #2a2a2a",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#e8c547";
                  e.target.style.color = "#0f0f0f";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "#1e1e1e";
                  e.target.style.color = "#888";
                }}
              >
                {letter.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
