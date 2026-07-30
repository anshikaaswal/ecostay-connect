import { useLocation, Link } from 'react-router-dom'

const routeLabels = {
  about: 'About',
  dashboard: 'Dashboard',
  'my-bookings': 'My Bookings',
  settings: 'Settings',
  'ai-planner': 'AI Travel Planner',
  homestay: 'Homestays',
}

const segmentToLabel = (segment) => {
  return routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
}

const Breadcrumb = () => {
  const { pathname } = useLocation()

  if (pathname === '/' || pathname === '/login') return null

  const segments = pathname.split('/').filter(Boolean)

  const breadcrumbs = segments.map((segment, index) => {
    const path = '/' + segments.slice(0, index + 1).join('/')
    const isLast = index === segments.length - 1
    const isIdParam = /^[a-f0-9]{24}$/i.test(segment) || /^\d+$/.test(segment)

    return {
      label: isIdParam ? 'Homestay Details' : segmentToLabel(segment),
      path,
      isLast,
    }
  })

  return (
    <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <ol className="inline-flex items-center gap-1.5 bg-green-50 dark:bg-green-900/20 rounded-lg px-3 py-1.5 text-sm">
        <li>
          <Link
            to="/"
            className="text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 hover:underline transition-colors"
          >
            Home
          </Link>
        </li>
        {breadcrumbs.map((crumb) => (
          <li key={crumb.path} className="flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5 text-green-400 dark:text-green-500 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            {crumb.isLast ? (
              <span className="font-semibold text-green-900 dark:text-green-100">
                {crumb.label}
              </span>
            ) : (
              <Link
                to={crumb.path}
                className="text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 hover:underline transition-colors"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumb