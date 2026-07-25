import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Button, Spinner } from '../components/ui'
import { showSuccess, showError } from '../components/ui'
import ConfirmModal from '../components/ConfirmModal'
import { getBookings, deleteBooking } from '../services/api'
import { useAuth } from '../context/AuthContext'

const MyBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteModal, setDeleteModal] = useState(null)
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true)
      const res = await getBookings()
      setBookings(res.data.data)
    } catch (error) {
      showError('Failed to load bookings.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    fetchBookings()
  }, [isAuthenticated, navigate, fetchBookings])

  const handleDelete = async (id) => {
    try {
      await deleteBooking(id)
      setBookings(bookings.filter(b => b._id !== id))
      setDeleteModal(null)
      showSuccess('Booking cancelled successfully!')
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to cancel booking.'
      showError(msg)
    }
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Spinner size="lg" />
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
            <h1 className="text-4xl sm:text-5xl font-bold mb-2">My Bookings</h1>
            <p className="text-green-100 dark:text-gray-300 text-lg">
              View and manage your homestay bookings.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {bookings.length === 0 ? (
              <div className="text-center py-20">
                <svg className="w-20 h-20 text-gray-300 dark:text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">No Bookings Yet</p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mb-6">
                  You haven't booked any homestays yet. Start exploring eco-friendly stays!
                </p>
                <Button variant="primary" onClick={() => navigate('/dashboard')}>
                  Browse Homestays
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {bookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Homestay Image */}
                      <div className="md:w-64 h-48 md:h-auto">
                        <img
                          src={booking.homestay?.image || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop'}
                          alt={booking.homestay?.name || 'Homestay'}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>

                      {/* Booking Details */}
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                              {booking.homestay?.name || 'Unknown Homestay'}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {booking.homestay?.location || ''}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                              booking.status === 'confirmed'
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                : booking.status === 'cancelled'
                                  ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                                  : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                            }`}
                          >
                            {booking.status || 'Confirmed'}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Check-in</p>
                            <p className="font-semibold text-gray-800 dark:text-gray-200">
                              {formatDate(booking.checkIn)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Check-out</p>
                            <p className="font-semibold text-gray-800 dark:text-gray-200">
                              {formatDate(booking.checkOut)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Guests</p>
                            <p className="font-semibold text-gray-800 dark:text-gray-200">
                              {booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Booked On</p>
                            <p className="font-semibold text-gray-800 dark:text-gray-200">
                              {formatDate(booking.createdAt)}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/homestay/${booking.homestay?._id}`)}
                          >
                            View Homestay
                          </Button>
                          <Button
                            variant="primary"
                            size="sm"
                            className="!bg-red-600 !hover:bg-red-700"
                            onClick={() => setDeleteModal(booking)}
                          >
                            Cancel Booking
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteModal}
        onClose={() => setDeleteModal(null)}
        onConfirm={() => handleDelete(deleteModal._id)}
        title="Cancel Booking"
        message={`Are you sure you want to cancel your booking at "${deleteModal?.homestay?.name || 'Unknown Homestay'}"?`}
        confirmText="Yes, Cancel Booking"
      />

      <Footer />
    </div>
  )
}

export default MyBookings