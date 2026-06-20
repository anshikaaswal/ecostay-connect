import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="bg-green-800 dark:bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <svg className="h-8 w-8 text-green-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3L4 9v12h16V9l-8-6zM10 15h4v4h-4v-4z"/>
            </svg>
            <span className="font-bold text-xl tracking-tight">EcoStay Connect</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-green-300 dark:hover:text-green-400 transition-colors duration-200 font-medium">Home</Link>
            <Link to="/about" className="hover:text-green-300 dark:hover:text-green-400 transition-colors duration-200 font-medium">About</Link>
            <Link to="/dashboard" className="hover:text-green-300 dark:hover:text-green-400 transition-colors duration-200 font-medium">Dashboard</Link>
            <Link to="/settings" className="hover:text-green-300 dark:hover:text-green-400 transition-colors duration-200 font-medium">Settings</Link>
            <Link to="/ai-planner" className="hover:text-green-300 dark:hover:text-green-400 transition-colors duration-200 font-medium">AI Planner</Link>
            <Link to="/login" className="hover:text-green-300 dark:hover:text-green-400 transition-colors duration-200 font-medium">Login</Link>

            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-green-700 dark:bg-gray-700 hover:bg-green-600 dark:hover:bg-gray-600 transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-green-700 dark:bg-gray-700 hover:bg-green-600 dark:hover:bg-gray-600 transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                </svg>
              )}
            </button>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-green-200 hover:text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-400"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-green-700 dark:bg-gray-800 px-4 pb-4 space-y-2">
          <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 dark:hover:bg-gray-700 transition-colors">Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 dark:hover:bg-gray-700 transition-colors">About</Link>
          <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 dark:hover:bg-gray-700 transition-colors">Dashboard</Link>
          <Link to="/settings" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 dark:hover:bg-gray-700 transition-colors">Settings</Link>
          <Link to="/ai-planner" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 dark:hover:bg-gray-700 transition-colors">AI Planner</Link>
          <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 dark:hover:bg-gray-700 transition-colors">Login</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar