import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Button, Loader } from '../components/ui'
import toast from 'react-hot-toast'
import { getBookings, getHomestays } from '../services/api'

const Dashboard = () => {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])
  const [homestays, setHomestays] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsRes, homestaysRes] = await Promise.all([
          getBookings(),
          getHomestays()
        ])
        setBookings(bookingsRes.data.data)
        setHomestays(homestaysRes.data.data)
      } catch (error) {
        toast.error('Failed to load dashboard data.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const getHomestayName = (homestayId) => {
    const homestay = homestays.find((h) => h.id === homestayId)
    return homestay ? homestay.name : 'Unknown Homestay'
  }

  const getHomestayImage = (homestayId) => {
    const homestay = homestays.find((h) => h.id === homestayId)
    return homestay ? homestay.image : ''
  }

  const upcomingBookings = bookings.filter((b) => new Date(b.checkIn) > new Date())
  const completedBookings = bookings.filter((b) => new Date(b.checkOut) < new Date())

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Loader size="lg" />
        </main>
        <Footer />
      </div>
    )
  }

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
                <p className="text-3xl font-bold text-gray-800 dark:text-gray-200 mt-2">{bookings.length}</p>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">Across all homestays</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-teal-500">
                <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">Upcoming Stays</p>
                <p className="text-3xl font-bold text-gray-800 dark:text-gray-200 mt-2">{upcomingBookings.length}</p>
                <p className="text-sm text-teal-600 dark:text-teal-400 mt-1">
                  {upcomingBookings.length > 0 ? `Next: ${getHomestayName(upcomingBookings[0].homestayId)}` : 'No upcoming stays'}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-amber-500">
                <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">Homestays Available</p>
                <p className="text-3xl font-bold text-gray-800 dark:text-gray-200 mt-2">{homestays.length}</p>
                <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">Eco-friendly stays</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Bookings */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                    {bookings.length > 0 ? 'All Bookings' : 'No Bookings Yet'}
                  </h2>
                  {bookings.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't made any bookings yet.</p>
                      <Button variant="primary" onClick={() => navigate('/')}>
                        Browse Homestays
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {bookings.map((booking) => (
                        <div key={booking.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                          onClick={() => navigate(`/homestay/${booking.homestayId}`)}
                        >
                          {getHomestayImage(booking.homestayId) && (
                            <img src={getHomestayImage(booking.homestayId)} alt={getHomestayName(booking.homestayId)} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-800 dark:text-gray-200 truncate">{getHomestayName(booking.homestayId)}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{booking.checkIn} to {booking.checkOut}</p>
                            <p className="text-xs text-gray-400">Booked by: {booking.user}</p>
                          </div>
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            new Date(booking.checkOut) < new Date()
                              ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                              : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                          }`}>
                            {new Date(booking.checkOut) < new Date() ? 'Completed' : 'Upcoming'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recommended Destinations */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Recommended Destinations</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {homestays.slice(0, 4).map((dest) => (
                      <div key={dest.id} className="relative rounded-xl overflow-hidden h-40 group cursor-pointer"
                        onClick={() => navigate(`/homestay/${dest.id}`)}
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

              {/* Saved Homestays & AI Planner */}
              <div className="space-y-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">All Homestays</h2>
                  <div className="space-y-4">
                    {homestays.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                        onClick={() => navigate(`/homestay/${item.id}`)}
                      >
                        <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm truncate">{item.name}</p>
                          <p className="text-xs text-green-600 dark:text-green-400 font-medium">₹{item.price}/night</p>
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