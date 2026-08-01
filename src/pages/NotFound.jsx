import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full text-center">
        <div className="mb-4 text-5xl sm:text-6xl">🌿</div>

        <h1 className="text-8xl sm:text-9xl font-extrabold text-gray-900 leading-none tracking-tight">
          404
        </h1>

        <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-gray-900">
          Oops! Page Not Found
        </h2>

        <p className="mt-3 text-base sm:text-lg text-gray-700 max-w-sm mx-auto leading-relaxed">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="mt-6 flex justify-center gap-4 text-2xl sm:text-3xl">
          <span role="img" aria-label="house">🏡</span>
          <span role="img" aria-label="compass">🧭</span>
          <span role="img" aria-label="leaf">🍃</span>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Go Home
          </button>

          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-gray-50 text-green-600 font-medium rounded-xl border-2 border-gray-200 hover:border-green-400 shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Explore Homestays
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFound