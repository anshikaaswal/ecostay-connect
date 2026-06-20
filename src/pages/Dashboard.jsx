import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Button } from '../components/ui'

const Dashboard = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="flex-grow">
        {/* Header */}
        <section className="bg-gradient-to-r from-green-700 to-green-600 dark:from-gray-800 dark:to-gray-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-2">Dashboard</h1>
            <p className="text-green-100 dark:text-gray-300 text-lg">Welcome back! Manage your bookings and explore recommendations.</p>
          </div>
        </section>

        {/* Dashboard Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-green-500">
                <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-800 dark:text-gray-200 mt-2">3</p>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">↑ 2 this month</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-teal-500">
                <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">Upcoming Stays</p>
                <p className="text-3xl font-bold text-gray-800 dark:text-gray-200 mt-2">1</p>
                <p className="text-sm text-teal-600 dark:text-teal-400 mt-1">Next: Forest Retreat</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-amber-500">
                <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">Wishlist</p>
                <p className="text-3xl font-bold text-gray-800 dark:text-gray-200 mt-2">5</p>
                <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">Saved homestays</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Bookings */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Recent Bookings</h2>
                  <div className="space-y-4">
                    {[
                      { name: 'Mountain View Cottage', date: 'Jun 15 - Jun 18, 2026', status: 'Completed', image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=100&h=100&fit=crop' },
                      { name: 'Forest Retreat', date: 'Jul 10 - Jul 14, 2026', status: 'Upcoming', image: 'https://images.unsplash.com/photo-1499793983690-e29f59e78f3f?w=100&h=100&fit=crop' },
                      { name: 'River Side Stay', date: 'May 5 - May 8, 2026', status: 'Completed', image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=100&h=100&fit=crop' },
                    ].map((booking, i) => (
                      <div key={i} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                        onClick={() => navigate(`/homestay/${booking.name.toLowerCase().replace(/\s+/g, '-')}`)}
                      >
                        <img src={booking.image} alt={booking.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 dark:text-gray-200 truncate">{booking.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{booking.date}</p>
                        </div>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          booking.status === 'Completed' 
                            ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' 
                            : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Destinations */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Recommended Destinations</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: 'Himalayan Eco Lodge', location: 'Uttarakhand', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop' },
                      { name: 'Green Valley Homestay', location: 'Coorg', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&h=200&fit=crop' },
                    ].map((dest, i) => (
                      <div key={i} className="relative rounded-xl overflow-hidden h-40 group cursor-pointer"
                        onClick={() => navigate(`/homestay/${dest.name.toLowerCase().replace(/\s+/g, '-')}`)}
                      >
                        <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <p className="text-white font-bold">{dest.name}</p>
                          <p className="text-white/80 text-sm">{dest.location}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Saved Homestays */}
              <div className="space-y-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Saved Homestays</h2>
                  <div className="space-y-4">
                    {[
                      { name: 'River Side Stay', price: '₹2,800/night', image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=200&h=150&fit=crop' },
                      { name: 'Himalayan Eco Lodge', price: '₹3,500/night', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop' },
                      { name: 'Green Valley Homestay', price: '₹2,000/night', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=200&h=150&fit=crop' },
                      { name: 'Lakeside Cabin', price: '₹3,200/night', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&h=150&fit=crop' },
                      { name: 'Forest Retreat', price: '₹2,500/night', image: 'https://images.unsplash.com/photo-1499793983690-e29f59e78f3f?w=200&h=150&fit=crop' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                        onClick={() => navigate(`/homestay/${item.name.toLowerCase().replace(/\s+/g, '-')}`)}
                      >
                        <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm truncate">{item.name}</p>
                          <p className="text-xs text-green-600 dark:text-green-400 font-medium">{item.price}</p>
                        </div>
                        <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-600 to-teal-600 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-8 text-white text-center">
                  <svg className="w-12 h-12 mx-auto mb-4 text-green-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <h3 className="text-xl font-bold mb-2">Need Help Planning?</h3>
                  <p className="text-green-100 text-sm mb-4">Try our AI-powered travel planner</p>
                  <Button variant="secondary" size="sm" onClick={() => navigate('/ai-planner')}>
                    Plan a Trip
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Dashboard