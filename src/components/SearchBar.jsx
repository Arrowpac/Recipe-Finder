function SearchBar({ query, setQuery, searchRecipes, handleKeydown }) {
  return (
    <div className="flex w-full max-w-xl gap-3 mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeydown}
        placeholder="Search by ingredient or meal..."
        className="flex-1 px-5 py-3 text-sm rounded-xl font-sans focus:outline-none transition-all"
        style={{background: '#1e1e1e', border: '1px solid #3a3a3a', color: '#f0ebe3'}}
      />
      <button
        onClick={searchRecipes}
        className="px-6 py-3 text-sm font-bold rounded-xl transition-all hover:scale-105 font-sans"
        style={{background: '#e8c547', color: '#0f0f0f'}}
      >
        Search
      </button>
    </div>
  )
}

export default SearchBar;