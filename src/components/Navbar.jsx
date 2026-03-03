import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Navbar() {
  const location = useLocation()
  const [favCount, setFavCount] = useState(
  JSON.parse(localStorage.getItem('favorites') || '[]').length
)

useEffect(() => {
  function updateCount() {
    setFavCount(JSON.parse(localStorage.getItem('favorites') || '[]').length)
  }
  window.addEventListener('storage', updateCount)
  return () => window.removeEventListener('storage', updateCount)
}, [])

  return (
    <nav className="flex items-center justify-between px-8 py-4 sticky top-0 z-50"
      style={{background: '#0f0f0f', borderBottom: '1px solid #2a2a2a'}}>
      <Link to="/" className="text-xl font-bold tracking-tight font-serif" style={{color: '#e8c547', textDecoration: 'none'}}>
        🍳 RecipeFinder
      </Link>
      <div className="flex items-center gap-6">
        <Link to="/" className="text-sm font-sans transition-all hover:opacity-70"
          style={{color: location.pathname === '/' ? '#e8c547' : '#f0ebe3', textDecoration: 'none'}}>
          Home
        </Link>
        <Link to="/favorites" className="text-sm font-sans transition-all hover:opacity-70"
          style={{color: location.pathname === '/favorites' ? '#e8c547' : '#f0ebe3', textDecoration: 'none'}}>
          Favorites
          {favCount > 0 && (
            <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-bold"
              style={{background: '#e8c547', color: '#0f0f0f'}}>{favCount}</span>
          )}
        </Link>
      </div>
    </nav>
  )
}

export default Navbar